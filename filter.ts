// 같은 함수가 여러가지 방법으로 사용될 경우 두 개 이상 선언된 경우가 있다.
interface Array<T> {
  filter<S extends T>(
    predicate: (value: T, index: number, array: T[]) => value is S,
    thisArg?: any,
  ): S[]; // 가능성이 남아있는 녀석
  filter(
    predicate: (value: T, index: number, array: T[]) => unknown,
    thisArg?: any,
  ): T[];
}

const filtered = [1, 2, 3, 4, 5].filter((value) => value % 2); // 홀수인 것만 가져오기
// T하나가 number로 정해지면 나머지들 다 number로 정해짐

const filtered2 = ['1', 2, '3', 4, '5'].filter(
  (value) => typeof value === 'string',
);
// const filtered2: (string | number)[]
// 이건 추론을 제대로 못함 왜?? 추론 잘하려면 어떻게 해야 하는지
// string | number가 T가 됨, 위에꺼를 할 지, 아래꺼를 할 지 골라야하는데 S가 string | number가 됨
// 위든 아래든 결과는 동일하게 string | number
// 위에는 S가 있어서 아직 바뀔 일말의 가능성이 남아있음, 밑에꺼는 T가 string|number로 고정되어 있기에 바꿔줄 여지가 없음

// string extends string | number // string | number 안에 string이 속해있음

/************************************* 타입 직접 만들기 *************************************/
interface CustomArray<T> {
  filter(callback: (value: T) => boolean): T[];
  filter<S extends T>(callback: (value: T) => value is S): S[];
}

{
  const a: CustomArray<number> = [1, 2, 3];
  const b = a.filter((value) => value % 2 === 0); // number[]

  const c: CustomArray<number | string> = [1, '2', 3, '4', 5];
  const d = c.filter((value) => typeof value === 'string'); // (string | number)[]
  // 타입을 수정해서 d가 string[]로 추론되게
  const d2 = c.filter((value: string | number): value is string => typeof value === 'string'); // (string | number)[]
  // 타입을 수정해서 d가 string[]로 추론되게
}

/******* 연습 *******/

const predicate = (value: string | number): value is string =>
  typeof value === 'string';
const filtered3 = ['1', 2, '3', 4, '5'].filter(predicate); // string으로 제대로 나옴
//

/**************/

interface Arr<T> {
  filter<S extends T>(callback: (v: T) => v is S): S[];
}

const c: Arr<number | string> = [1, '2', 3, '4', 5];
const d2 = c.filter((v): v is string => typeof v === 'string');


//변경 전
const predicate2 = (value: string | number): value is string => typeof value === 'string';
const filterString = ['1', 2, '3', 4, ' 5'].filter(predicate2);
/**
 * 
 * 'string | number' 형식은 'string' 형식에 할당할 수 없습니다.
          'number' 형식은 'string' 형식에 할당할 수 없습니다.ts(2769) -> value => string | number
 */

// 변경전
interface Arr2<T> {
  filter<S extends T>(callback: (value: T) => value is S): S[];
}

const ccc: Arr2<number | string> = [1, '2', 3, '4', 5]
const ddd = ccc.filter((v: string | number): v is string => typeof v === 'string') // ['2', '4'] string[]
