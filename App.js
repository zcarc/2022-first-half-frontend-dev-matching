import SearchInput from "./SearchInput.js";
import { fetchLanguages } from "./api.js";
import Suggestion from "./Suggestion.js";

export default function App({ $target }) {
  this.state = {
    fetchedLanguages: [],
    selectedLanguages: [],
  };

  this.setState = (nextState) => {
    console.log("App... setState... before this.state: ", this.state);
    console.log("App... setState... nextState: ", nextState);

    this.state = {
      ...this.state,
      ...nextState,
    };
    suggestion.setState({
      selectedIndex: 0,
      items: this.state.fetchedLanguages,
    });

    console.log("App... setState... after this.state: ", this.state);
  };

  const searchInput = new SearchInput({
    $target,
    initialState: "",
    onChange: async (keyword) => {
      console.log("keyword: ", keyword);
      if (keyword.length === 0) {
        this.setState({
          fetchedLanguages: [],
        });
      } else {
        const languages = await fetchLanguages(keyword);
        this.setState({
          fetchedLanguages: languages,
        });
      }
    },
  });

  const suggestion = new Suggestion({
    $target,
    initialState: {
      selectedIndex: 0,
      items: [],
    },
    onSelect: (language) => {
      alert(language);

      // 이미 선택되어 렌더링된 언어가 있다면, 해당 언어를 맨 뒤로 이동시킨다.
      const nextSelectedLanguages = [...this.state.selectedLanguages];

      // 이미 선택되어 렌더링된 언어가 있다면 index는 0 이상이다.
      const index = nextSelectedLanguages.findIndex(
        (selectedLanguage) => selectedLanguage === language
      );

      // 이미 해당 언어가 있다면 그 언어를 잘라낸다. (제거)
      if (index > -1) {
        // Array.prototype.splice() 메서드는 배열의 기존 요소를 삭제 또는 교체하거나 새 요소를 추가하여 배열의 내용을 변경한다.
        // 즉, 이 메서드를 사용하면 요소 추가, 삭제, 교체가 모두 가능하다.

        // 구문
        // array.splice(start[, deleteCount[, item1[, item2[, ...]]]])

        // 매개변수
        // 첫번째 매개변수는 조작할 요소를 가리키는 인덱스(index)가 된다.
        // 두번째 매개변수는 deleteCount로 제거할 요소의 개수를 나타낸다.

        // 반환 값
        // 제거한 요소를 담은 배열
        // 하나의 요소만 제거한 경우 길이가 1인 배열이 반환된다.
        // 아무 값도 제거하지 않았다면 빈 배열이 반환된다.

        // 참고
        // https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/splice
        // https://ko.javascript.info/array-methods
        const removed = nextSelectedLanguages.splice(index, 1);
        console.log("removed selectedLangauge: ", removed);
      }
      nextSelectedLanguages.push(language);

      this.setState({
        ...this.state,
        selectedLanguages: nextSelectedLanguages,
      });
    },
  });
}
