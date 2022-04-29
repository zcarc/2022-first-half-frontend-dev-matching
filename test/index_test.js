// index.js

// 테스트 1
// export default 로 export 한 변수는 { } 중괄호로 import 하면 안된다.
// export default 한 변수는 반드시 import 해야하는데 { } 중괄호로 default 모듈을 요청했으니 해당 모듈을 받지 못했다는 에러가 발생한다.
// Uncaught SyntaxError: The requested module './App_test.js' does not provide an export named 'App'
// import { App } from "./App_test.js";

// 테스트 2
// 여기서 import App 의 App의 이름은 다른 값으로 import 해도 된다. (ex: import Main 도 가능하다.)
// import Main from "./App_test.js";

import App from "./App_test.js";

// new App({ $target: document.querySelector(".App") });

// 테스트 3
// test();

// 테스트 4
// 구조 분해 할당을 사용하지 않고 인수를 전달하는 경우,
// App 함수에서 파라미터를 받을 때 중괄호를 생략해야한다.
// new App(document.querySelector(".App"));

// 테스트 5
// 구조 분해 할당으로 변수명을 지정해서 인수로 전달할 경우
// 함수의 파라미터에서는 인수로 전달된 그 변수명과 동일해야하는가?
// YES, 일치해야한다.
new App({ $target: document.querySelector(".App") });
