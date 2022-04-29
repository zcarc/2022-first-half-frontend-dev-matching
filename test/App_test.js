// App.js
export default function App({ $target }) {
  this.state = {
    fetchedLanguages: [],
    selectedLanguages: [],
  };

  this.setState = (nextState) => {
    // TODO: 구현해야함
  };
}

// 개인적으로 테스트해보고 싶어서 추가한 함수
// 테스트 1
const test1 = () => {
  console.log("test1");
};
export { test1 };

// 테스트 2
// 선언과 동시에 할당한 변수를 export 하면 중괄호로 { } 로 해당 변수를 import 해야한다.
export const test2 = () => {
  console.log("test2");
};
