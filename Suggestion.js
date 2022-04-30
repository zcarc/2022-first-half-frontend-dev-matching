export default function Suggestion({ $target, initialState }) {
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
    const { items = [] } = this.state;

    if (items.length > 0) {
      console.log("items.length > 0...");
      console.log(items.map((item) => item));
      console.log(items.map((item) => item).join(""));

      // 문제설명에서 "각 태그의 class 이름을 바꾸거나 스타일을 임의로 추가하면 안 됩니다." 라고 했는데
      // 스타일을 바꾸면 안되는 건줄 알았는데 추가가 안된다는 것이었지 기존의 스타일은 바꿔도 된다는 말이었다.
      // 어떤 태그든 display 속성은 존재하니까 문제해설에서는 이 속성을 활용했다.
      this.$element.style.display = "block";
      this.$element.innerHTML = `
      <ul>
        ${
          items
            .map((item, index) => `<li data-index="${index}">${item}</li>`)
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
}
