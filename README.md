# 2022 상반기 프론트엔드 데브매칭

- [x] fetch만 사용해서 API 조회
- [x] input에 값을 입력하면 API 조회
- [x] 조회된 결과를 렌더링
- [x] 렌더링된 결과 방향키 위, 아래로 순회해서 selected 클래스 추가
- [x] 순회 시 검색 X
- [x] 첫번째 노드에서 이전 노드로 순회할 경우 마지막 노드로 순회
- [x] 마지막 노드에서 다음 노드로 순회할 경우 첫번째 노드로 순회
- [x] 언어 선택 처리
- [x] 커서가 위치한 추천 검색어에서 엔터 입력 시 alert 띄우기
- [x] 다른 문자열 첨가 없이 언어명만 alert으로 띄우기
- [ ] 클릭된 언어 렌더링
- [ ] 이미 선택된 언어를 다시 검색하여 선택하여도 중복처리 X
- [ ] 이미 선택된 언어를 다시 삽입하면 순서상 맨 뒤에 삽입
- [ ] 언어는 최대 다섯개까지 삽입
- [ ] 언어가 최대 다섯개가 넘어가는 경우, 가장 앞에 있는 언어 삭제 후 마지막에 삽입

<br/>

# Troubleshooting

## 자식 노드 삭제 문제

```js
const remove_child_elements = () => {
  // 문자열 'ul'이 아니라 [object HTMLUListEment] 객체이다.
  // if (Suggestion.childNodes.length > 0 && Suggestion.childNodes[0] == 'ul') {
  //     Suggestion.removeChild(Suggestion.firstChild)
  //     console.log('### Suggestion', Suggestion)
  // }
  if (
    Suggestion.childNodes.length > 0 &&
    Suggestion.childNodes[0].nodeName.toLowerCase() === "ul"
  ) {
    Suggestion.removeChild(Suggestion.firstChild);
  }
  if (App.contains(Suggestion)) {
    App.removeChild(Suggestion);
  }
};
```

처음에 문제를 노드를 삭제하지 않고 스타일을 추가해서 CSS 스타일에서 감추는 방법을 생각했었는데
JS로 구현하고 생각해보니 노드가 동적인 데이터라서 숨기는게 아니라 삭제를 했어야했다.

Suggestion 노드의 자식노드는 ul만 존재해서 자식노드가 존재하는 경우인
.hasChildNodes() 메서드로 확인할 수 있었으나, 이름이 'ul'인 경우는 어떻게 접근하는 지 궁금해서 해당 노드 이름일 경우에만 조건문이 실행되도록 했다.

검색된 결과 li 태그 목록에서 selected 클래스를 추가하기 위해서 반복문을 변경했다.

변겅 전

```js
res.forEach((item) => {
  const li = document.createElement("li");
  li.innerText = item;
  ul.append(li);
});
```

변경 후

```js
for (i = 0; i < res.length; i++) {
  const li = document.createElement("li");
  if (i === 0) {
    li.classList.add("Suggestion__item--selected");
  }
  li.innerText = res[i];
  ul.append(li);
}
```

최대한 풀이방법을 보지 않고 풀려고 했었다.
문제를 보고 구현방법이 떠오르지 않았던 것도 많았고,
할 수 있을 것이라고 생각한 부분도 쉬울 것이라고 생각했지만 막상 해보니 그렇게 쉽지 않았다.
문제풀이가 내가 작성한 방법보다는 더 효율적일 것이라고 생각해서
일단 생각나는대로 풀어보고 나중에 비교해보자는 생각을 했다.

## 렌더링 된 결과 방향키 위, 아래로 순회 시 아무런 반응이 없는 문제

```js
for (let i = 0; i < ul.childNodes.length; i++) {
  if (childNode.className === selected_class_name) {
    break;
  }
}
```

여기서 if문 마지막에 break를 하지 않으면 i가 0일 경우 첫번째 노드에 selected 클래스가 있는 상태에서 해당 클래스를 삭제하고
다음 노드에 selected 클래스를 추가하는데, 다음 순회 시 그 노드가 selected가 추가된 상태라서 첫번째 노드인 경우와 같은 조건이 된다.
그래서 마지막 순회 시에 그 노드의 다음 노드가 처음 순회했던 노드가 되어 아무런 반응도 없는 것 처럼 보인다.
하지만 내부적으로는 아주 빠르게 연산되고 있다.
그래서 해당 selected 클래스가 있는 노드를 찾을 경우 if문 안쪽 마지막에 break로 순회를 끝내줘야한다.

## .firstChild로 자식노드 선택 시 엘리먼트가 아니라 text 노드를 가져오는 문제

```js
document.querySelector(".SelectedLanguage").firstChild;
```

SelectedLanguage 클래스의 자식 노드 ul 태그를 가져오려고 했었는데 text 노드를 가져오는 문제가 있었다.

```js
<div class="SelectedLanguage">
  <ul></ul>
</div>
```

다음과 같이 선택하게 되면

```js
document.querySelector(".SelectedLanguage").firstChild;
```

```js
<div> <ul>
```

이 사이의 줄바꿈과 공백이 있고

```js
</ul> </div>
```

이 사이에 줄바꿈과 공백이 있다.

처음에는 태그(엘리먼트)만 선택되는 메서드인줄 알고 자식 엘리먼트를 가져오기 위해서 .firstChild를 호출 했는데 줄바꿈 문자와 공백 문자열을 가져오게 되는 문제가 있었다.
.firstChild로 #text 객체를 가져올 수 있었는데 객체의 속성들 중 일부분은 다음과 같았다.

```js
data: "\n            ";
length: 13;
nodeName: "#text";
nodeType: 3;
```

selectedLang.childNodes 의 결과는 NodeList(3) [text, ul, text] 형태라서
첫번째와 마지막 텍스트를 비교하기 위해서 .childNodes 메서드를 사용해서 SelectedLanguage 클래스의 자식 노드 리스트를 가져왔다.
첫번째 text는 firstChild로 가져온 결과와 동일하고,
마지막 text는 data의 길이만 다르고 nodeName과 nodeType은 동일했다.

```js
data: "\n        ";
length: 9;
nodeName: "#text";
nodeType: 3;
```

nodeType: 3 은 text (공백 & 줄바꿈 포함, 문자열) 이고
nodeType: 1 은 element (&lt;/div&gt;, &lt;/p&gt;) 이다.
그래서 nodeType: 3 인 경우에는 해당 타입을 무시 하거나, 부모 노드와 자식 노드 사이의 줄바꿈과 공백을 없애거나, 엘리먼트만 인식하는 메서드를 사용하는 방법을 생각했다.
엘리먼트 안에는 문자열(공백 & 띄어쓰기 포함), 주석(nodeType: 8)도 올 수 있기 때문에
엘리먼트 타입만 가져오는 이미 내장되어 있는 메서드 .children을 사용하기로 했다.
이 메서드(.children)를 사용하면 element 노드들만 가져올 수 있다.

그래서 ul 엘리먼트를 가져오는 방법을 다음과 같이 해결했다.

변경 전 text (줄바꿈 & 공백)

```js
document.querySelector(".SelectedLanguage").firstChild;
```

변경 후 element (&lt;ul&gt;&lt;/ul&gt;)

```js
document.querySelector(".SelectedLanguage").children[0];
```

## 렌더링 결과에서 순회 중 엔터로 선택 시 새로고침 문제

렌더링 결과를 순회하면서 엔터를 누르면 언어를 .SelectedLanguage 에 렌더링할 때 문제가 발생했다.
이 문제는 엔터를 input에서 keyUp, keyDown 로 언어를 순회할 때는 문제가 없었지만
Enter를 눌렀을 때, .Suggestion\_\_item--selected 로 선택된 언어가 alert에 정상적으로 호출됐지만 그 이후에 렌더링되지 않고 계속 새로고침이 되었다.

```js
<form class="SearchInput">
  <input
    class="SearchInput__input"
    type="text"
    placeholder="프로그램 언어를 입력하세요."
  />
</form>
```

form 안에 input이 한개가 있다면 input에서 엔터를 누르면 자동으로 form이 submit이 되는 것이었다. 그래서 새로고침을 막기 위해서는 input을 2개 이상으로 만들거나 해당 input에서 Enter를 누를 시 해당 이벤트를 막는 방법으로 해결 할 수 있다.

```js
<form class="SearchInput">
  <input type="text" />
  <input
    class="SearchInput__input"
    type="text"
    placeholder="프로그램 언어를 입력하세요."
  />
</form>
```

이렇게 form 안에 input이 2개 이상이면 어떤 input에서도 엔터를 누르면 submit이 동작하지 않는다.
나는 이 방법은 input을 새로 추가해야하기 때문에 사용하지 않고 해당 input에서 엔터를 눌렀을 때 이벤트를 막는 방법으로 submit이 동작하지 않도록 했다.

```js
input.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
  }
});
```

input에 keydown 이벤트를 추가해서 만약 enter를 눌렀다면 form에 input이 한개가 있을 때 submit 이벤트가 기본 동작하기 때문에 그 기본 동작을 막기 위해 event.preventDefault()를 호출해서 문제를 해결했다.

# Problem Explanation - Troubleshooting

## 버그 발생 1: 커서 초기화 문제 - 화살표 위, 아래 키 입력으로 selectedIndex 변경

### 오타 수정

```js
const { selectedIndex } = this.setState;
```

이 부분에서 setState를 구조분해할당하고 있었기 때문에 selectedIndex를 가져올 수 없었다.
그래서 다음과 같이 수정을 했다.

```js
const { selectedIndex } = this.state;
```

하지만 이렇게 수정해도 순회가 되지 않은 문제는 그대로였다.

### 순회 시, 0번째로 돌아오는 현상

```js
// SearchInput.js
this.$element.addEventListener("keyup", (e) => {
  onChange(e.target.value);
});
```

input에서 검색할 언어를 입력하는데 화살표도 현재 키보드 이벤트에서 인식하기 때문에
해당 화살표 키로 API를 호출하게 되어 Suggestion이 렌더링 되어 순회가 안되는 것이다.
그래서 화살표 키를 입력했을 때는 onChange 이벤트를 발생시키지 않는 것으로 해결했다.

```js
this.$element.addEventListener("keyup", (e) => {
  const actionIgnoreKeys = [
    "Enter",
    "ArrowUp",
    "ArrowDown",
    "ArrowLeft",
    "ArrowRight",
  ];

  if (!actionIgnoreKeys.includes(e.key)) {
    onChange(e.target.value);
  }
});
```

e.key가 actionIgnoreKeys에 포함되지 않는 경우에만 onChange 함수를 호출하도록 해서 문제를 해결했다.

## 버그 발생 2: 화면 새로고침 문제 - 현재 커서가 가리키는 언어를 selectedLanguages에 추가

### 커서가 가리키는 언어에서 엔터를 입력했을 때, 새로고침이 되는 문제 발생

SearchInput의 컴포넌트의 input은 form 태그로 감싸져있는데 form 태그 내 input에 focus가 있는 상태에서
엔터키를 입력하면 form의 action에 지정된 url로 화면을 이동하게 된다.

```js
<form>
  <input type="text" />
</form>
```

```js
<form action="">
  <input type="text" />
</form>
```

```js
<form action="http://127.0.0.1:5500/index.html">
  <input type="text" />
</form>
```

form에서 action 속성이 없거나 속성의 값이 빈 문자열이면 문서의 주소, 즉 같은 페이지로 form이 submitted 된다.
위의 3개의 코드 블럭은 모두 동일한 url로 이동하게 된다.

```js
// SearchInput.js
this.$element.addEventListener("submit", (e) => {
  e.preventDefault();
});
```

그래서 form의 submit 이벤트를 막는 방법으로 event.prevantDefualt() 메서드를 호출하는 것으로 문제를 해결할 수 있다.

## 마우스 클릭으로 선택처리 하기

### Element.closest()

```js
this.$element.addEventListener("click", (e) => {
  const $li = e.target.closest("li");
  if ($li) {
    const { index } = $li.dataset;
    try {
      onSelect(this.state.items[parseInt(index)]);
    } catch (e) {
      alert("무언가 잘못되었습니다! 선택할 수 없습니다!");
    }
  }
});
```

Element.closest() 는 자기자신을 포함하여 CSS 선택자와 일치하는 가장 가까운 조상요소를 찾는다.
탐색 범위는 자신부터 문서루트까지 이동하고 조건에 만족하지 않는다면 null 값을 반환한다.

e.target 은 Suggestion 에서 click 된 엘리먼트를 의미한다.
만약 li 엘리먼트를 클릭했다면 해당 엘리먼트가 target이 되고
.closest("li")로 가장 가까운 li 엘리먼트를 찾는데 가장 가까운 엘리먼트가 자기자신이 되므로 클릭된 li 엘리먼트가 반환된다.

## App의 state에 선택한 언어 추가하기

### Array.prototype.splice()

```js
// App.js
nextSelectedLanguages.splice(index, 1);
```

Array.prototype.splice() 메서드는 배열의 기존 요소를 삭제 또는 교체하거나 새 요소를 추가하여 배열의 내용을 변경한다.
즉, 이 메서드를 사용하면 요소 추가, 삭제, 교체가 모두 가능하다.

구문

array.splice(start[, deleteCount[, item1[, item2[, ...]]]])

매개변수

첫번째 매개변수는 조작할 요소를 가리키는 인덱스(index)가 된다.
두번째 매개변수는 deleteCount로 제거할 요소의 개수를 나타낸다.

반환 값

제거한 요소를 담은 배열
하나의 요소만 제거한 경우 길이가 1인 배열이 반환된다.
아무 값도 제거하지 않았다면 빈 배열이 반환된다.
