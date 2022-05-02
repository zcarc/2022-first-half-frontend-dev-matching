export default function Suggestion({ $target, initialState, onSelect }) {
  this.$element = document.createElement("div");
  this.$element.className = "Suggestion";
  $target.appendChild(this.$element);

  // Suggestion으로 전달되는 인수는 다음과 같다
  // new Suggestion({ $target, initialState: { items: [] } })
  this.state = {
    selectedIndex: 0,
    items: initialState.items,
  };

  this.setState = (nextState) => {
    this.state = {
      ...this.state,
      ...nextState,
    };
    this.render();
  };

  this.render = () => {
    const { items = [], selectedIndex } = this.state;

    if (items.length > 0) {
      // console.log("items.length > 0...");
      // console.log(items.map((item) => item));
      // console.log(items.map((item) => item).join(""));

      // 문제설명에서 "각 태그의 class 이름을 바꾸거나 스타일을 임의로 추가하면 안 됩니다." 라고 했는데
      // 스타일을 바꾸면 안되는 건줄 알았는데 추가가 안된다는 것이었지 기존의 스타일은 바꿔도 된다는 말이었다.
      // 어떤 태그든 display 속성은 존재하니까 문제해설에서는 이 속성을 활용했다.
      this.$element.style.display = "block";
      this.$element.innerHTML = `
      <ul>
        ${
          items
            .map(
              (item, index) =>
                `<li class="${
                  index === selectedIndex ? "Suggestion__item--selected" : ""
                }" data-index="${index}">${item}</li>`
            )
            .join("") // map() 함수는 Array ["<li>Javascript</li>", "<li>Java</li>"] 배열을 반환되기 때문에 배열의 요소를 빈 문자열로 구분해서 문자열로 합친다.
        }
      </ul>
      `;
      // 참고 Array.prototype.join():
      // https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/join
    } else {
      this.$element.style.display = "none";
      this.$element.innerHTML = "";
    }
  };

  this.render();

  // 키보드 이벤트
  window.addEventListener("keyup", (e) => {
    if (this.state.items.length > 0) {
      const { selectedIndex } = this.state;
      const lastIndex = this.state.items.length - 1;
      const navigationKeys = ["ArrowUp", "ArrowDown"];
      let nextIndex = selectedIndex;

      // Array.prototype.includes(): 배열이 특정 요소를 포함하고 있는지 판별한다.
      // e.key(입력된 키 값) 가 "ArrowUp" 또는 "ArrowDown" 일 때 참이된다.
      // 참고:
      // https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/includes
      if (navigationKeys.includes(e.key)) {
        // 키보드 화살표 위
        if (e.key === "ArrowUp") {
          // 선택된 인덱스가 0이면 마지막 인덱스 선택 아니라면 이전 인덱스 선택
          nextIndex = selectedIndex === 0 ? lastIndex : nextIndex - 1;
          // 키보드 화살표 아래
        } else if (e.key === "ArrowDown") {
          // 선택된 인덱스가 마지막 인덱스면 첫번째 인덱스인 0을 선택 아니라면 다음 인덱스 선택
          nextIndex = selectedIndex === lastIndex ? 0 : nextIndex + 1;
          // 엔터키 입력 시
        } else if (e.key === "Enter") {
          // 현재 커서에 위치한 언어의 인덱스를 인수로 전달
          onSelect(this.state.items[this.state.selectedIndex]);
        }

        this.setState({
          ...this.state,
          selectedIndex: nextIndex,
        });
      }
    }
  });
}
