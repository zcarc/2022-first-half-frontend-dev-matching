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
      items: [],
    },
  });
}
