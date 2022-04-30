// 테스트 0
function test0({ initialState }) {
  console.log("initialState: ", initialState);
  const { items } = initialState;
  // 이 경우는 initialState는 객체이고 내부 프로퍼티 items는 [] 빈 배열로 할당되었으니 items는 [] 가 할당된다.
  console.log("items: ", items);
}

const initialState = {
  items: [],
};

// 여기서 전달할 때 다음과 같이 중괄호 없이 변수만 test0(initialState) 보내면
// 구조분해할당으로 객체를 분해하는 것이 아닌 그냥 변수를 인수로 전달하기 때문에
// 함수 내부에서 구조분해할당으로 객체를 분해한 initialState를 찾을 수 없다.
// 즉, 초기의 initialState는 객체 리터럴이고 이 객체 리터럴을 구조분해할당으로 객체를 분해하였고
// initialState가 다음과 같은 구조분해할당 문법으로 객체가 분해되면 -> { initialState }
// 다음과 같이 객체가 분해된다. initialState = { items: [] }
// 그래서 test0({ initialState }) 는 다음과 같이 해석된다.
// test0(initialState = { items: [] })
// 참고:
// https://ko.javascript.info/destructuring-assignment
// https://ko.javascript.info/object
test0({ initialState });
// test0(initialState);

// 테스트 1
function test1({ initialState }) {
  console.log("initialState: ", initialState);
  const { items } = initialState;
  // 이 경우는 initialState는 객체이고 내부 프로퍼티 items는 [] 빈 배열로 할당되었으니 items는 [] 가 할당된다.
  console.log("items: ", items);
}

// 객체 리터럴 안에 initialState 프로퍼티가 있고
// 그 프로퍼티는 { items: [] } 객체 리터럴를 할당받았다.
// { items: [] } 객체 리터럴은 items 프로퍼티를 갖고 있고
// 그 프로퍼티는 빈 배열을 할당받았다.
// 이 함수의 매개변수는 구조분해할당으로 정의되었다. function test1({ initialState }) { ... }
// { initialState } 는 다음과 같다.
// initialState = { items: [] }
// 그리고 함수 내부에서 initialState를 구조분해할당해서 items 프로퍼티를 가져온다.
// const { items } = initialState
// items는 다음과 같다
// itesm = []
test1({ initialState: { items: [] } });

// 테스트 2
function test2({ initialState }) {
  console.log("initialState: ", initialState);
  const { items = [1, 2, 3] } = initialState;
  // 이 경우는 initialState는 객체이고 내부 프로퍼티 items는 [] 빈 배열로 할당되었으니 items는 [] 가 할당된다.
  // 즉, items가 이미 할당된 상태에서 initialState를 받았기 때문에
  // const { items = [1, 2, 3] } = initialState;
  // 여기서 items = [1, 2, 3] 원소가 1, 2, 3인 배열을 할당하는 것은 무시된다.
  console.log("items: ", items);
}

test2({ initialState: { items: [] } });

// 테스트 3
function test3({ initialState }) {
  console.log("initialState: ", initialState);
  const { items } = initialState;
  // 이 경우는 initialState가 빈 객체이고 items의 기본값이 없으니 undifiend가 할당된다.
  console.log("items: ", items);
}

test3({ initialState: {} });

// 테스트 4
function test4({ initialState }) {
  console.log("initialState: ", initialState);
  const { items = [] } = initialState;
  // 이 경우는 initialState가 빈 객체라서 items는 기본값으로 []를 할당받는다.
  console.log("items: ", items);
}

test4({ initialState: {} });

// 테스트 5
const fetchedLanguages = ["Javascript", "Java"];
// 구조분해할당으로 객체 리터럴을 분해하지 않고 객체 리터럴 자체를 받았다.
const suggestion_setState = (nextState) => {
  // 결과는 함수 호출에서 전달된 인수 객체 리터럴 그 자체이다.
  console.log("nextState: ", nextState);
};

suggestion_setState({ items: fetchedLanguages });
