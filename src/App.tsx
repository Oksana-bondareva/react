import { useState, useEffect } from "react";
import "./App.css";
import SearchForm from "./components/SearchForm/SearchForm";
import Results from "./components/Results/Results";

const App = () => {
  const [searchValue, setSearchValue] = useState(
    localStorage.getItem("search") || "",
  );
  const [dataApi, setDataApi] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const getSearch = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `https://swapi.dev/api/people/?search=${searchValue}&page=${currentPage}`,
      );
      const data = await response.json();
      setDataApi(data.results);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setSearchValue(localStorage.getItem("search") || "");
    getSearch();
  }, [searchValue, currentPage]);

  const handleSearch = (query: string) => {
    event?.preventDefault();
    localStorage.setItem("search", query);
    setSearchValue(query);
  };

  const errorButtonHandler = () => {
    throw new Error("Oops, something went wrong...");
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
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
        {isLoading ? (
          <div className="loading">Loading...</div>
        ) : (
          <div className="results-wrapper">
            <Results data={dataApi} />
            {localStorage.getItem("search") === "" || "" ? (
              <div className="pagination-pages">
                <button
                  className="pagination-button"
                  onClick={handlePreviousPage}
                >
                  Prev
                </button>
                <span>Page {currentPage}</span>
                <button className="pagination-button" onClick={handleNextPage}>
                  Next
                </button>
              </div>
            ) : (
              ""
            )}
          </div>
        )}
      </section>
    </div>
  );
};

export default App;
