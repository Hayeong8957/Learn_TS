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
