// [1, 2, 3].forEach((value) => value * 2);

// lib.es5.d.ts
// <S extends T>
// S는 T라는 타입에 속할 수 있어야 한다.
// S는 T라는 타입의 부분집합이어야 한다.

interface Array<T> {
  forEach(
    callbackfn: (value: T, index: number, array: T[]) => void,
    thisArg?: any,
  ): void;
}

const a: Array<number> = [1, 2, 3];

a.forEach((value) => console.log(value)); // 콘솔에 1, 2, 3
['1', '2', '3'].forEach((value) => console.log(value)); // 콘솔에 "1", "2", "3" => value 의 타입추론이 string으로 제대로 되고 있음
[true, false, true].forEach((value) => console.log(value)); // 타입추론 boolean
['123', 123, true].forEach((value) => console.log(value)); //  value: string | number | boolean > 아무거나 넣어도 타입추론이 정확하게 되고 있음
// 타입스크립트가 어떤 원리로 타입을 정확하게 알려주고 있는 건가? -> 제네릭 덕분
// 제네릭 -> 선언할 때는 타입이 정해지지 않지만, 실제로 사용될 때 타입이 정해짐

function add<T>(x: T, y: T): T {
  return x;
}
// 여러개의 T중에서 하나라도 타입이 정해졌다 -> 나머지 전부다 그걸로 추론

add<number>(1, 2); // 제네릭이 뒤에 있으면 제네릭타입 파라미터
<number>add(1, 2); // 앞에 있으면 강제 타입 변환
