import "./App.css";
import React from "react";
import SearchForm from "./components/SearchForm/SearchForm";
import Results from "./components/Results/Results";

class App extends React.Component {
  state = {
    searchValue: "",
    dataApi: [],
    isLoading: false,
  };

  getSearch = async () => {
    try {
      this.setState({
        isLoading: true,
      });
      const response = await fetch(
        `https://swapi.dev/api/people/?search=${this.state.searchValue}&page=1
        `,
      );
      const data = await response.json();
      this.setState({ dataApi: data.results, isLoading: false });
    } catch (error) {
      console.log(error);
    }
  };

  componentDidMount = () => {
    if (localStorage.getItem("search")) {
      this.setState({ searchValue: localStorage.getItem("search") }, () => {
        this.getSearch();
      });
    } else {
      this.getSearch();
    }
  };

  handleSearch = (query: string) => {
    event?.preventDefault();
    localStorage.setItem("search", query);
    this.setState({ searchValue: query }, () => {
      this.getSearch();
    });
  };

  errorButtonHandler = () => {
    this.setState(() => {
      throw new Error("Oops, something went wrong...");
    });
  };

  render() {
    return (
      <div>
        <section className="search-section">
          <button className="error-button" onClick={this.errorButtonHandler}>
            ERROR
          </button>
          <SearchForm onSearch={this.handleSearch} />
        </section>
        <section>
          {this.state.isLoading ? (
            <div className="loading">Loading...</div>
          ) : (
            <Results data={this.state.dataApi} />
          )}
        </section>
      </div>
    );
  }
}

export default App;
