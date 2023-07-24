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
