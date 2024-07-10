import { useState, useEffect } from "react";
import "./App.css";
import SearchForm from "./components/SearchForm/SearchForm";
import Results from "./components/Results/Results";

const App = () => {
  const [searchValue, setSearchValue] = useState("");
  const [dataApi, setDataApi] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getSearch = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `https://swapi.dev/api/people/?search=${searchValue}&page=1`
      );
      const data = await response.json();
      setDataApi(data.results);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("search")) {
      setSearchValue(localStorage.getItem("search") || "");
      getSearch();
    } else {
      getSearch();
    }
  }, [searchValue]);

  const handleSearch = (query: string) => {
    event?.preventDefault();
    localStorage.setItem("search", query);
    setSearchValue(query);
  };

  const errorButtonHandler = () => {
    throw new Error("Oops, something went wrong...");
  };

  return (
    <div>
      <section className="search-section">
        <button className="error-button" onClick={errorButtonHandler}>
          ERROR
        </button>
        <SearchForm onSearch={handleSearch} />
      </section>
      <section>
        {isLoading ? <div className="loading">Loading...</div> : <Results data={dataApi} />}
      </section>
    </div>
  );
};

export default App;