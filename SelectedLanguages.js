const MAX_DISPLAY_COUNT = 5;

export default function SelectedLanguages({ $target, initialState }) {
  this.$element = document.createElement("div");
  this.$element.className = "SelectedLanguage";
  this.state = initialState;

  $target.appendChild(this.$element);

  this.setState = (nextState) => {
    this.state = nextState;

    if (this.state.length > MAX_DISPLAY_COUNT) {
      // 총 길이에서 5를 뺀다. 그럼 배열의 길이가 6, 10 또는 더 길이가 길어도 startPosition에서 배열의 마지막 인덱스까지의 총 길이는 5가 된다.
      const startPosition = this.state.length - MAX_DISPLAY_COUNT;

      // Array.prototype.slice() 메서드는 start 인덱스부터 end 인덱스까지의 요소를 얕은 복사한 새로운 배열을 반환한다. 원본 배열은 바뀌지 않는다.
      // 문법
      // slice()
      // slice(start)
      // slice(start, end)

      // 매개변수
      // 첫번째 매개변수 start는 0을 시작으로 배열에서 요소를 추출할 시작 인덱스를 의미한다.
      // 음수 인덱스가 전달되면 배열의 끝에서부터의 길이는 의미한다. -2가 전달되면 배열의 끝에서 두번째 인덱스부터 시작한다는 것을 의미한다.
      // start가 undifiend(매개변수를 전달하지 않은 경우)인 경우 0부터 끝까지 추출한다.
      // start가 배열의 인덱스 범위(ex: 0 ~ 4)보다 크다면 빈 배열을 반환한다.

      // 두번째 매개변수 end는 첫번째 매개변수부터 시작해서 추출을 종료할 인덱스이다. 하지만 종료할 인덱스는 추출에 포함하지 않고 그 앞까지만 추출한다.
      // 음수 인덱스가 전달되면 배열의 끝에서부터의 길이는 의미한다. 음수가 아닌 양수일 때도 추출을 해당 종료 인덱스까지 포함하지 않은 것 처럼 음수일 경우에도 해당 종료 인덱스를 포함하지 않고 바로 앞 인덱스까지만 추출한다.
      // end가 생략되면 배열의 끝까지 추출한다.
      // end가 배열의 길이(5)보다 크다면 요소를 배열의 끝까지 추출한다.

      // 참고:
      // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice
      // https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/slice (매개변수 start에서, 배열의 인덱스 범위보다 큰 경우 빈 배열을 반환한다.)
      // https://ko.javascript.info/array-methods

      // startPosition 인덱스에 MAX_DISPLAY_COUNT(5)를 더한 인덱스 범위를 지정하면 총 5개의 요소가 포함된 배열을 반환해서 this.state에 할당된다.
      // 여기서 end 부분을 생략해도 앞에서 배열의 길이에서 -5의 값을 startPosition 에 할당했으므로 startPosition 만 매개변수로 전달해도 배열의 끝까지 요소가 추출된다.
      this.state = this.state.slice(
        startPosition,
        MAX_DISPLAY_COUNT + startPosition
      );
    }

    this.render();
  };

  this.render = () => {
    this.$element.innerHTML = `
      <ul>
        ${this.state.map((item) => `<li>${item}</li>`).join("")}
      </ul>
      `;
  };

  this.render();
}
