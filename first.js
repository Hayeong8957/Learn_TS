"use strict";
const a = '5';
const a2 = '5';
const b = 5;
const c = true;
const d = undefined;
const e = null;
/* 타입 자리에 아예 고정된 원시값을 넣을 수 있다. */
const f = 5;
const g = true;
// const h: false = ture; /* 에러남 */
// const는 바뀔 일이 없는데, 굳이 타입을 정할 필요가 없음. 타입을 최대한 정확하게 잡는 것이 좋음
let aa = 123;
// 문자열 형식을 as라는 키워드로 강제로 다른 녀석으로 바꿔줄 수 있다.
aa = 'hello';
// 하지만 얘는 js컴파일하면 사라짐
// let aa = 123;
// aa = 'hello';
function add1(x, y) {
    return x + y;
} // fuction 일 때는 : 뒤에 타입이 나옴
const add2 = (x, y) => x + y; // 화살표 함수 일 떄는 => 뒤에 타입이 나옴
const add3 = (x, y) => x + y;
const add4 = (x, y) => x + y;
// function add5(x: number, y: number): number;  // 타입
// function add5(x, y) { // 실제 코드
//   return x + y;
// }
/* 객체 타입 */
const obj = { lat: 37.5, lon: 127.5 };
/* 배열 타입 */
const arr = ['a', 'b', 'c'];
const arr2 = ['a', 'b', 'c']; // 제네릭
/* 튜플 -> 길이가 고정된 배열 */
const arr3 = [123, 456, 'abc'];
/************************************************************************************************************/
// vscode가 알아서 tsc --noEmit을 돌려주기 때문에 에러같은 것이 저절로 뜨고 있다.
// 그래서 저절로 추론이 잘 되는 녀석은 굳이 타이핑을 하지 않아도 됨
const five = '5'; // 오히려 이것이 문제 있는 코드임
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
}
catch (error) {
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
const aaa = 'hello';
const bbb = 'hell';
const aaaa = 'world'; // 이부분에서 타입을 World로 지정했기에 World타입의 값인 world가 자동완성 된다.
// 타입스크립트 자동완성 키 : ctrl + space
const bbbb = `hello ${aaaa}`;
// 현실적인 응용법은
const ccc = 'hello world';
/* rest */
// rest도 타이핑해줄 수 있다.
function rest(...args) {
    console.log(args); // ["1", "2", "3"]
}
rest('1', '2', '3');
function rest2(a, ...args) {
    console.log(a, args); // 1, ["1", "2", "3"]
}
rest2(1, '1', '2', '3');
/* 튜플 */
const tuple = ['1', 1]; // 타입 요소 갯수가 정해져 있으면
// tuple[2] = 'hello'; // 이렇게 넣었을 때 에러가 남 -> 현재 튜플 요소는 2개밖에 없는데 3번째 요소에 넣으려고 하다보니 에러가 남
tuple.push('hello'); // 튜플인데 push가 가능함 -> 위에 코드로 요소를 넣는 건 안되는데, 현재 코드로 push해서 3번째 요소에 넣는 건 에러메세지가 안남
const up = 0 /* EDirection.Up */; // up -> 0
const left = 2 /* EDirection.Left */; // left -> 2
const ODirection = {
    Up: 0,
    Down: 1,
    Left: 2,
    Right: 3,
};
function run(dir) { }
const objj = { a: '123', b: 'hello', c: 'world' };
// obj는 자바스크립트 값임 -> 자바스크립트 값은 타입으로 쓸 수 없음 -> 타입으로 쓰고 싶으면 typeof를 붙여줌 -> 거기에 keyof를 하면 "a", "b", "c"를 뽑아낸다. -> 그리고 그걸 Key라는 타입으로 만듦
function walk(dir) { }
walk(2 /* EDirection.Left */); // function walk(dir: EDirection) {}
run(ODirection.Right); // function run(dir: Direction): void
const people = {
    name: 'hayeong',
    age: 23,
};
const student = {
    name: 'hayeong',
    age: 23,
    school: 'hanyangUniv.',
};
const obj1 = { a: 'hello', b: 'world' };
const hayeong = { breath: true, breed: true, think: true };
const hayeon2 = { breath: true, breed: true, think: true };
const abab1 = { a: 'hello', b: 'world' }; // A 또는 B -> A도 만족하고 B도 만족하기에 됨 -> A와 B 둘 중에 하나만 있으면 만족
const abab2 = { a: 'hello' }; // 하나를 지워도 된다.
const baba1 = { a: 'hello', b: 'world' }; // A 와 B 둘 다 만족시켜야 함 -> 모든 속성이 다 있어야 함
const ab = { name: 'hayeong', age: 23 };
const ab2 = { name: 'hayeong' };
const ab3 = ab; // 좁은 타입을 넓은 타입에 넣는 건 잘 됨
const c2 = { name: 'hayeong', age: 23 };
// const c3: Cobj = ab2; // 넓은 타입을 좁은 타입에 넣으려다 보니 에러: 'age' 속성이 'Aobj' 형식에 없지만 'Cobj' 형식에서 필수입니다.ts(2741)
// const c4: Cobj = { name: 'hayeong', age: 23, married: false };
// type A = { hello: string };
// const a: A = { hello: 'world', why: 'error' };
/************************************************************************************************************/
// void 타입이라는 것은 리턴값이 없는 함수
// 대신 return undefined는 가능, return null은 안됨
// 리턴값이 아예 없거나 단순히 return;만 있는 함수
function afunc() {
    // function afunc(): void
    return;
}
const afunc2 = afunc(); // const afunc2: void
const human = {
    talk() {
        return 'abc'; // 근데 여기서는 에러가 안남!?
    },
};
// 📌 void를 세 가지로 기억하자.
// 1. void func 선언 시 리턴값이 void인 것
function bfunc() {
    return;
}
// 리턴값이 있어도 됨
const human2 = {
    talk() {
        return 'abc';
    },
};
// 3. 매개변수가 void가 들어간 것
// 함수 또는 메서드의 리턴값을 사용하지 않겠다. -> 리턴값이 없다. -> 리턴값이 뭐든 간에 사용하지 않겠다는 의미
function cfunc(callback) { }
// 리턴값이 있어도 됨
cfunc(() => {
    return 3;
});
// 함수 구현부
function forEach() { }
// let target: number[] = [];
// forEach([1, 2, 3], (el) => target.push(el));
// interface A {
//   talk: () => void;
// }
// const a: A = {
//   talk() {
//     return 3;
//   },
// };
