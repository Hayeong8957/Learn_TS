interface Array<T> {
  map<U>(
    callbackfn: (value: T, index: number, array: T[]) => U,
    thisArg?: any,
  ): U[];
}

const strings = [1, 2, 3].map((value) => value.toString()); // ['1', '2', '3']

// 타입스크립트가 어떻게 이렇게 추론을 잘할까 생각이 들면 제네릭을 떠오르면 됨.
// 아래처럼 타입이 추론된 셈이다.
// interface Array<number> {
//   map<string>(
//     callbackfn: (value: number, index: number, array: T[]) => string,
//     thisArg?: any,
//   ): string[];
// }

const strings2 = [1, 2, 3].map((value) => value + 1);

interface Arr<T> {
  map<S>(callback: (v: T) => S): S[];
}

const a2: Arr<number> = [1, 2, 3];
const d = a.map((v) => v % 2 === 0);

const e: Arr<string> = ['1', '2', '3'];
const f = e.map((v) => +v);

/************************************* 타입 직접 만들기 *************************************/
interface CustomArray<T> {
  map<S>(callback: (v: T) => S): S[]; // map을 사용하는 순간에 타이핑할 수 있게
  map<U>(
    callbackfn: (value: T, index: number, array: T[]) => U,
    thisArg?: any,
  ): U[]; // 실제 map type
}

{
  const a: CustomArray<number> = [1, 2, 3];
  const b = a.map((v) => v + 1);
  const c = a.map((v) => v.toString()); // ['1', '2', '3'];  string[]
  const d = a.map((v) => v % 2 === 0); // [false, true, false]  boolean[]
}

