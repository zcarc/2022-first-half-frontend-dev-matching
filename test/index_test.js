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

new App({ $target: document.querySelector(".App") });

// 테스트 3
// test();
