import SearchInput from "./SearchInput.js";

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
  });
}
