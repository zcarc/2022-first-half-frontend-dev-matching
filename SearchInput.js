export default function SearchInput({ $target, initialState, onChange }) {
  this.$element = document.createElement("form");
  this.$element.className = "SearchInput";
  this.state = initialState;

  $target.appendChild(this.$element);

  this.render = () => {
    this.$element.innerHTML = `
      <input class="SearchInput__input" type="text" placeholder="프로그램 언어를 입력하세요." value="${this.state}">
      `;
  };

  this.render();

  // 이벤트 핸들러
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

  // submit 이벤트 무시하기
  // SearchInput의 컴포넌트의 input은 form 태그로 감싸져있는데 form 태그 내 input에 focus가 있는 상태에서
  // 엔터키를 입력하면 form의 action에 지정된 url로 화면을 이동하게 된다.
  // form에서 submit 이벤트 발생 시, prevantDefualt() 메서드를 호출하는 것으로 문제를 해결할 수 있다.
  // 참고:
  // https://prgms.tistory.com/139
  // https://stackoverflow.com/questions/1131781/is-it-a-good-practice-to-use-an-empty-url-for-a-html-forms-action-attribute-a
  this.$element.addEventListener("submit", (e) => {
    e.preventDefault();
  });
}
