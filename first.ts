const a: string = '5';
const a2 = '5';
const b: number = 5;
const c: boolean = true;
const d: undefined = undefined;
const e: null = null;
/* 타입 자리에 아예 고정된 원시값을 넣을 수 있다. */
const f: 5 = 5;
const g: true = true;
// const h: false = ture; /* 에러남 */
// const는 바뀔 일이 없는데, 굳이 타입을 정할 필요가 없음. 타입을 최대한 정확하게 잡는 것이 좋음

let aa = 123;
// 문자열 형식을 as라는 키워드로 강제로 다른 녀석으로 바꿔줄 수 있다.
aa = 'hello' as unknown as number;
// 하지만 얘는 js컴파일하면 사라짐
// let aa = 123;
// aa = 'hello';

function add1(x: number, y: number): number {
  return x + y;
} // fuction 일 때는 : 뒤에 타입이 나옴
const add2: (x: number, y: number) => number = (x, y) => x + y; // 화살표 함수 일 떄는 => 뒤에 타입이 나옴

/* 함수 type alias */
type Add3 = (x: number, y: number) => number;
const add3: Add3 = (x, y) => x + y;

/* 함수 type interface */
interface Add4 {
  (x: number, y: number): number;
}
const add4: Add4 = (x, y) => x + y;

// function add5(x: number, y: number): number;  // 타입
// function add5(x, y) { // 실제 코드
//   return x + y;
// }

/* 객체 타입 */
const obj: { lat: number; lon: number } = { lat: 37.5, lon: 127.5 };

/* 배열 타입 */
const arr: string[] = ['a', 'b', 'c'];
const arr2: Array<string> = ['a', 'b', 'c']; // 제네릭
/* 튜플 -> 길이가 고정된 배열 */
const arr3: [number, number, string] = [123, 456, 'abc'];

/************************************************************************************************************/

// vscode가 알아서 tsc --noEmit을 돌려주기 때문에 에러같은 것이 저절로 뜨고 있다.
// 그래서 저절로 추론이 잘 되는 녀석은 굳이 타이핑을 하지 않아도 됨
const five: string = '5'; // 오히려 이것이 문제 있는 코드임
// five는 평생 5라는 문자열, 5가 아니라 문자열 5로 만들었음
// 최대한 정확한게 중요한 타입을 더 부정확한 타입으로 만들어놓음
// 타입 5가 아닌 string이라는 type으로 추론이 되고 있음.
// 타입스크립트가 추론을 잘못하고 있으면 그때 고치면 됨
// 최대한 타입스크립트가 추론하는 것을 믿어라

/************************************************************************************************************/

// 빈배열을 조심 -> never[]라는 타입이 들어옴
// never라는 타입이 뜨면 일반적인 타입을 넣을 수 없음
// 따라서 타이핑 지정을 무조건 해줘야함

try {
  const array = [];
  array.push('hello');
} catch (error) {
  error;
}

/************************************************************************************************************/

// ! -> 또는 이라는 뜻
// 타입스크립트에서 미리 만들어 둔 특별한 타입들이 있다.
// F12를 누르면 해당 타입이 어떻게 구현되어 있는 지 확인할 수 있다. (ctrl + 왼클릭도 가능)
// const head: Element = document.querySelector('#head')!;
// console.log(head);
// head가 element거나 null -> 모든 가능성을 고려해준다.
// 만약 head가 있는 것이 무조건 확실하다싶으면 뒤에 느낌표를 넣어주면 된다.
// null이나 undefined가 아님을 보증하는 방식이다.

const head = document.querySelector('#head');
if (head) {
  // head.innHtlml = 'hello';  // error: 'innHtlml' 속성이 'Element' 형식에 없습니다. 'innerHTML'을(를) 사용하시겠습니까?ts(2551)
  // 타입스크립트를 쓰면 오타까지 고쳐줌
  head.innerHTML = 'hello';
  console.log(head);
}

/************************************************************************************************************/

/* 원시 래퍼 타입 */
const aaa: string = 'hello';
const bbb: String = 'hell';
// string과 String은 서로 다른 타입이다. String은 래퍼 개체이다.

// function c(aaa1: string, bbb1: string) {};
// c(aaa, bbb);

/* 템플릿 리터럴 타입 */
type World = 'world' | 'hell';
const aaaa: World = 'world'; // 이부분에서 타입을 World로 지정했기에 World타입의 값인 world가 자동완성 된다.
// 타입스크립트 자동완성 키 : ctrl + space

const bbbb = `hello ${aaaa}`;

// 템플릿 리터럴 변수에 타입을 넣어도 된다. 타입의 값이 그대로 들어가게 됨
// type Greeting = "hello world"
type Greeting = `hello ${World}`; // -> World 타입이 하나일 때

// 현실적인 응용법은
const ccc: Greeting = 'hello world';

/* rest */
// rest도 타이핑해줄 수 있다.
function rest(...args: string[]) {
  console.log(args); // ["1", "2", "3"]
}

rest('1', '2', '3');

function rest2(a: number, ...args: string[]) {
  console.log(a, args); // 1, ["1", "2", "3"]
}

rest2(1, '1', '2', '3');

/* 튜플 */
const tuple: [string, number] = ['1', 1]; // 타입 요소 갯수가 정해져 있으면
// tuple[2] = 'hello'; // 이렇게 넣었을 때 에러가 남 -> 현재 튜플 요소는 2개밖에 없는데 3번째 요소에 넣으려고 하다보니 에러가 남
tuple.push('hello'); // 튜플인데 push가 가능함 -> 위에 코드로 요소를 넣는 건 안되는데, 현재 코드로 push해서 3번째 요소에 넣는 건 에러메세지가 안남
// 사소한 오류임

/************************************************************************************************************/

// enum -> 변수들을 하나의 그룹으로 묶고 싶을 때
const enum EDirection {
  Up, // 0
  Down, // 1
  Left, // 2
  Right, // 3
}

const up = EDirection.Up; // up -> 0
const left = EDirection.Left; // left -> 2

// 문자열도 다 됨
const enum EDirection2 {
  Up = '123', // '123'
  Down = 'hello', // 'hello'
  Left = 'wow', // 'wow'
  Right = '456', // '456'
}

const ODirection = {
  Up: 0,
  Down: 1,
  Left: 2,
  Right: 3,
} as const;

type Direction = (typeof ODirection)[keyof typeof ODirection];
function run(dir: Direction) {}

const objj = { a: '123', b: 'hello', c: 'world' } as const;
// type Key = keyof typeof objj;
type Key2 = (typeof objj)[keyof typeof objj];
// obj는 자바스크립트 값임 -> 자바스크립트 값은 타입으로 쓸 수 없음 -> 타입으로 쓰고 싶으면 typeof를 붙여줌 -> 거기에 keyof를 하면 "a", "b", "c"를 뽑아낸다. -> 그리고 그걸 Key라는 타입으로 만듦

function walk(dir: EDirection) {}
walk(EDirection.Left); // function walk(dir: EDirection) {}
run(ODirection.Right); // function run(dir: Direction): void

/************************************************************************************************************/

/* interface vs type */
// 둘 다 상속의 개념으로 사용할 수 있다.
interface PeopleInterface {
  name: string;
  age: number;
}

interface StudentInterface extends PeopleInterface {
  school: string;
}

type PeopleType = {
  name: string;
  age: number;
};

type StudentType = PeopleType & {
  school: string;
};

const people: PeopleInterface = {
  name: 'hayeong',
  age: 23,
};

const student: StudentInterface = {
  name: 'hayeong',
  age: 23,
  school: 'hanyangUniv.',
};

// 선언적 확장
// type은 새로운 속성을 추가하기 위해 다시 같은 이름으로 선언할 수 없지만,
// interface는 항상 선언적 확장이 가능

interface AA {
  a: string;
}
interface AA {
  b: string;
}
const obj1: AA = { a: 'hello', b: 'world' };

// error: 'BB' 식별자가 중복되었습니다.ts(2300)
// type BB = { a: string };
// type BB = { b: string };
// const obj2: BB = { a: 'hello', b: 'world' };

type Animal = { breath: true };
type Poyouryu = Animal & { breed: true };
type Human = Poyouryu & { think: true };

const hayeong: Human = { breath: true, breed: true, think: true };

interface Animal2 {
  breath: true;
}
interface Poyouryu2 extends Animal2 {
  breed: true;
}
interface Human2 extends Poyouryu2 {
  think: true;
}
const hayeon2: Human2 = { breath: true, breed: true, think: true };

// type의 좋은 점은 간단하게 쓸 수 있고
// interface는 타입처럼 욱여넣을 수 없기 때문에 extends확장이라는 개념이 명확함

/************************************************************************************************************/

// error: '+' 연산자를 'string | number' 및 'string | number' 형식에 적용할 수 없습니다.ts(2365)
// function add(x: string | number, y: string | number): string | number {
//   return x + y;
// }
// add(1, 2);
// add('1', '2');
// add(1, '2');
type A = {
  a: string;
};
type B = {
  b: string;
};

const abab1: A | B = { a: 'hello', b: 'world' }; // A 또는 B -> A도 만족하고 B도 만족하기에 됨 -> A와 B 둘 중에 하나만 있으면 만족
const abab2: A | B = { a: 'hello' }; // 하나를 지워도 된다.

const baba1: A & B = { a: 'hello', b: 'world' }; // A 와 B 둘 다 만족시켜야 함 -> 모든 속성이 다 있어야 함
// const baba2: A & B = { a: 'hello' }; // A 와 B 둘 다 만족시켜야 함 -> error

/************************************************************************************************************/

// 큰 타입에 작은 타입을 넣으려 시도
// 작은 타입에 큰 타입을 넣으려 시도
type AAA = string | number; // 이게 더 넓은 타입 -> 합집합
type BBB = string;
// 여기서 룰은 좁 -> 넓으로 대입이 가능, 넓 -> 좁 대입 불가능
// never -> 공집합, any -> 전체집합 느낌

type BBB2 = string;
type CCC = string & number; // 이게 더 좁은 타입

// 객체는 상세할수록 타입이 좁다고 생각 -> 구체적일수록 타입이 좁음
type Aobj = { name: string };
type Bobj = { age: number };
type Cobj = { name: string; age: number };
// type Cobj = Aobj & Bobj이거랑 위의 코드랑 같음

type ABObj = Aobj | Bobj; // 합집합으로 만듦 -> 타입이 넓음

type Cobj2 = Aobj & Bobj;
const ab: ABObj = { name: 'hayeong', age: 23 };
const ab2: ABObj = { name: 'hayeong' };
const ab3: ABObj = ab; // 좁은 타입을 넓은 타입에 넣는 건 잘 됨

const c2: Cobj2 = { name: 'hayeong', age: 23 };
// const c3: Cobj = ab2; // 넓은 타입을 좁은 타입에 넣으려다 보니 에러: 'age' 속성이 'Aobj' 형식에 없지만 'Cobj' 형식에서 필수입니다.ts(2741)

// const c4: Cobj = { name: 'hayeong', age: 23, married: false };
// type A = { hello: string };
// const a: A = { hello: 'world', why: 'error' };

/************************************************************************************************************/

/* void */
// void 타입이라는 것은 리턴값이 없는 함수
// 대신 return undefined는 가능, return null은 안됨
// 리턴값이 아예 없거나 단순히 return;만 있는 함수
function afunc(): void {
  // function afunc(): void
  return;
}

const afunc2 = afunc(); // const afunc2: void

interface Human3 {
  talk: () => void;
}

const human: Human3 = {
  talk() {
    return 'abc'; // 근데 여기서는 에러가 안남!?
  },
};

// 📌 void를 세 가지로 기억하자.
// 1. void func 선언 시 리턴값이 void인 것
function bfunc(): void {
  return;
}
// 함수의 직접적인 리턴값이 void인 경우에만 return 값이 들어가면 안됨.

// 2. 메서드로 선언할 때 void
interface Human4 {
  talk: () => void;
}
// 리턴값이 있어도 됨
const human2: Human4 = {
  talk() {
    return 'abc';
  },
};

const human3 = human2.talk();
// 우리는 이것이 'abc'값을 뱉어낼 것이라 생각하지만
// 애석하게도 메서드의 void는 리턴이 무엇이든 무시를 하기에
// human3의 타입도 void이다.
// 애초에 리턴이 void면 리턴값을 넣지 않는 게 좋음.

// 3. 매개변수가 void가 들어간 것
// 함수 또는 메서드의 리턴값을 사용하지 않겠다. -> 리턴값이 없다. -> 리턴값이 뭐든 간에 사용하지 않겠다는 의미
function cfunc(callback: () => void): void {}
// 리턴값이 있어도 됨
cfunc(() => {
  return 3;
});

// 예시
// 함수 선언부
// function forEach(arr: number[], callback: (el: number) => undefined): void;
function forEach(arr: number[], callback: (el: number) => void): void;
// 함수 구현부
function forEach() {}
// 함수 구현부를 만들기 싫을 때 declare를 선언하면 됨 -> 에러가 사라지지만, 자바스크립트로 면환하면 사라짐
declare function forEach2(
  arr: number[],
  callback: (el: number) => undefined,
): void;

let target: number[] = [];
forEach([1, 2, 3], (el) => target.push(el)); // error: 'number' 형식은 'undefined' 형식에 할당할 수 없습니다.ts(2322)
// 에러나는 이유 : push는 리턴값이 number, 해당 함수는 콜백 함수
// function forEach 콜백의 리턴값을 number로 해주면 됨
// + void로 해도 에러가 안남 => 매개변수에서 쓰이는 void는 실제 리턴값이 뭐든 상관하지 않겠다.
// return 값을 없애도 쓸 수 있게 함

// void냐 아니냐에 따라 함수 표현이 제한이 됨
// 아래 둘 다 정상적인 코드이다. 만약 위의 forEach 콜백 리턴이 void가 아니고 undefined라면 아래와 같은 에러가 나온다.
forEach([1, 2, 3], (el) => {
  target.push(el); // number형식은 undefined형식에 할당 X
});
forEach([1, 2, 3], (el) => target.push(el)); // void형식은 undefined형식에 할당 X

// void는 undefined랑 다르다.

/************************************************************************************************************/

/* unknown, any */
// any를 쓸 바에는 unknown을 쓴다고 원칙적으로 기억
// any문제점 : 타입 검사를 포기해버림
// unknown: 알 수 없는 형식이라 에러가 뜸 -> 우리가 직접 타입을 정해줘야함 -> 정해진 타입을 쓸 수 있게
// => 지금 당장은 내가 타입을 모르겠을 때 쓰는 것
interface ATalk {
  talk: () => void;
}
const atalk: ATalk = {
  talk() {
    return 3;
  },
};

const btalk: unknown = atalk.talk();
(btalk as ATalk).talk();

// unknown이 나오는 가장 흔한 경우
// Error은 타입스크립트에서 제공하는 기본 에러 타입.
// 에러는 우리가 대비하지 못한 뜬금없는 에러가 나오기에
// 나중에 우리가 에러의 타입이 뭔지 직접 지정해야함
// axios -> AxiosError
try {
} catch (error) {
  // var error: unknown
  (error as Error).message; // 이런식으로 만들어줘야함
}

/************************************************************************************************************/

/* 타입가드 */
// 아래 코드는 정상적으로 작동
function numOrStr(a: number | string) {
  if (typeof a === 'string') {
    // 이런식으로 타입가드 기법을 사용
    a.split(',');
  } else {
    a.toFixed(1);
  }
}
numOrStr('123');
numOrStr(1);

// 아래 코드는 에러남
// a가 string일 가능성도 있기 때문에 경고를 띄워줌
// 'string | number' 형식에 'toFixed' 속성이 없습니다. 'string' 형식에 'toFixed' 속성이 없습니다.ts(2339)
// 에러메세지가 10줄 넘어가는 경우가 있는데, 결국에 마지막줄만 보면 됨
function numOrStr2(a: number | string) {
  (a as number).toFixed(1); // unknown일 때 빼고 as 사용하지 말자.
}

// class 명 자체가 타입 자리에 올 수 있다.
// 대신 그 class를 의미하는 게 아니고 인스턴스를 의미하는 것
class AClass {
  aaa() {}
}

class BClass {
  bbb() {}
}

function AOrB(param: AClass | BClass) {
  if (param instanceof AClass) {
    param.aaa();
  }
}

// AOrB(AClass); // 클래스 자체가 아니라 인스턴스를 의미하기에 바로 그 클래스를 넣으면 안됨
AOrB(new AClass()); // 이렇게 인스턴스를 넣어줘야함

/* 커스텀 타입 가드 */

interface Cat {
  meow: number;
}
interface Dog {
  bow: number;
}

// 리턴값에 is가 들어가면 커스텀 타입 가드이다.
// 커스텀 타입 가드 함수는 어떨 때 쓰냐?
// if문 안에 써서 타입스크립트에게 정확한 타입이 뭔지 알려주는 것
// 대신 타입 판별은 직접 코딩해야함.

function catOrDog(a: Cat | Dog): a is Dog {
  // 타입 판별을 여러분이 직접 만드세요.
  // 강아지려면
  if ((a as Cat).meow) {
    return false; // meow 속성이 없어야한다.
  }
  return true;
}

// 타입을 구분해주는 커스텀 함수를 여러분이 직접 만들 수 있어요.
function pet(a: Cat | Dog) {
  if (catOrDog(a)) {
    console.log(a.bow); // a가 Dog라는 것을 밝혀냄
  }
  if ('meow' in a) {
    console.log(a.meow);
  }
}

const cat: Cat | Dog = { meow: 3 };

if (catOrDog(cat)) {
  console.log(cat.meow);
}
if ('meow' in cat) {
  console.log(cat.meow);
}

// Promise 예제

const isRejected = (
  input: PromiseSettledResult<unknown>,
): input is PromiseRejectedResult => {
  // PromiseSettledResult를 PromiseRejectedResult로 타입 가드
  return input.status === 'rejected';
};

const isFulfilled = <T>(
  input: PromiseSettledResult<T>,
): input is PromiseFulfilledResult<T> => {
  // PromiseSettledResult를 PromiseFulfilledResult로 타입 가드
  return input.status === 'fulfilled';
};

// Promise 를 실행하면 pending상태에서 settled가 된다.
// settled에는 resolved(then)와 rejected(catch)가 있다.
// 성공했든 실패했든 일단 settled는 맞음
// PromiseSettledResult안에는 PromiseRejectedResult와 PromiseFulfilledResult가 있다.
const promises = await Promise.allSettled([
  Promise.resolve('a'),
  Promise.resolve('b'),
]);

// 우리는 정확하게 성공한 것만 구별하고 싶다.
const success = promises.filter(isFulfilled);
// 우리는 정확하게 여기서 에러들만 구별하고 싶다.
const errors = promises.filter(isRejected);

export { success, errors };

/************************************************************************************************************/

// 4.8 ver update
// {} , Object : 모든 타입, 모양이 객체라 착각하면 안된다.(null과 undefined 제외)
// object: 실제 객체 타입, 객체만 받을 수 있다.
const x: {} = 'hello'; // 문자열도 대입이 된다.
const y: Object = 'hi';
// const x2: object = 'hi'; // error
const x2: object = { hi: 'world' };
const y2: object = { hello: 'world' };
const z: unknown = 'hi';

// unknown타입도 모든 값을 다 받을 수 있는데 any보다 좀 더 낫다고 말했었다.
// 이번에 나온게 unknown = {} | null | undefined
if (z) {
  z; // unknown인 변수를 if문에 넣으면 그대로 unknown이 나왔었다.
  // 근데 지금은 const z: {}로 타입이 나오게 된다.
  // if에 들어가면 null과 undefined가 걸러져서 {}가 나오게 되는 것.
} else {
  // 여기에 null, undefined가 들어가짐
}

/************************************************************************************************************/

interface AAAA {
  readonly a: string;
  b: string;
}

const aAaAa: AAAA = {a: 'hello', b: 'world'};
// aAaAa.a = '123'; // error: 읽기 전용 속성이므로 'a'에 할당할 수 없습니다.ts(2540)
// readonly 를 사용해서 우리가 실수로 바꾸는 것을 강제로 금지

/* 인덱스드 시그니처 */
// ex) 어떤 키든 상관없이, 모든 value의 type이 다 문자였으면 좋겠다
// type BBBB ={
//   a:string, b:string, c:string, d:string, e:string //...
// }
type BBBB ={
 [key: string]: string
}

/* mapped type */
// key type을 좁힐 수 있음
// interface로는 또는이 안됨 |를 쓰려면 type을 써야함
type BBBBBKey = 'Human' | 'Mammal' | 'Animal'; 
type BBBBB = {[key in BBBBBKey]: number};
const bbbbbb: BBBBB = {
  Human: 123, Mammal: 5, Animal: 7 // 이런식으로 제한을 걸어줄 수 있다.
}

// 최대한 정확한 타입을 주는 것이 좋음
 