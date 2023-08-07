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
