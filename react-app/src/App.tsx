import "./App.css";
import React from "react";
import SearchForm from "./components/SearchForm/SearchForm";

class App extends React.Component {
  render() {
    return (
      <div>
        <section>
          <SearchForm />
        </section>
        <section></section>
      </div>
    );
  }
}

export default App;
