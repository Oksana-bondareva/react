import { Component, ChangeEvent } from "react";
import "./SearchForm.css";

interface SearchFormState {
  onSearch: (value: string) => void;
}

class SearchForm extends Component<SearchFormState> {
  state = {
    searchQuery: "",
  };

  handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchQuery: event.target.value });
  };

  handleSearch = () => {
    event?.preventDefault();
    //this.props.onSearch(this.state.searchQuery);
  };

  render() {
    return (
      <div className="search-form">
        <input
          className="search-form__input"
          type="text"
          placeholder="Search..."
          value={this.state.searchQuery}
          onChange={this.handleInputChange}
        />
        <button className="search-form__button" onClick={this.handleSearch}>
          Search
        </button>
      </div>
    );
  }
}

export default SearchForm;
