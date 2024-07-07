import "./App.css";
import React from "react";
import SearchForm from "./components/SearchForm/SearchForm";
import { Results } from "./components/Results/Results";

class App extends React.Component {
  state = {
    searchValue: "",
    dataApi: [],
  };

  componentDidMount = async () => {
    try {
      const response = await fetch(
        `https://swapi.dev/api/people/?search=${this.state.searchValue}&page=1
        `,
      );
      const data = await response.json();
      this.setState({ dataApi: data.results });
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    return (
      <div>
        <section>
          <SearchForm />
        </section>
        <section>
          <Results data={this.state.dataApi} />
        </section>
      </div>
    );
  }
}

export default App;
