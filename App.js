import SearchInput from "./SearchInput.js";
import { fetchLanguages } from "./api.js";

export default function App({ $target }) {
  this.state = {
    fetchedLanguages: [],
    selectedLanguages: [],
  };

  this.setState = (nextState) => {
    // TODO: 구현해야함
  };

  const searchInput = new SearchInput({
    $target,
    initialState: "",
    onChange: async (keyword) => {
      const languages = await fetchLanguages(keyword);
      console.log(languages);
    },
  });
}
