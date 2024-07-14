import { useState, useEffect } from "react";
import "./App.css";
import SearchForm from "./components/SearchForm/SearchForm";
import Results from "./components/Results/Results";
import Loader from "./components/Loader/Loader";
import { useNavigate, useLocation } from "react-router-dom";

const App = () => {
  const navigate = useNavigate();
  const location = useLocation();
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
    setCurrentPage(1);
  }, []);

  useEffect(() => {
    setSearchValue(localStorage.getItem("search") || "");
    console.log(currentPage);
    const currentPageFromUrl = Number(location.pathname.split("/")[2]) || 1;
    setCurrentPage(currentPageFromUrl);
    getSearch();
  }, [searchValue, currentPage, location.pathname]);

  const handleSearch = (query: string) => {
    event?.preventDefault();
    localStorage.setItem("search", query);
    setSearchValue(query);
    navigate(`/`);
  };

  const errorButtonHandler = () => {
    throw new Error("Oops, something went wrong...");
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      navigate(`/search/${currentPage - 1}`);
    }
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
    navigate(`/search/${currentPage + 1}`);
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
          <Loader />
        ) : (
          <div className="results-wrapper">
            <Results data={dataApi} />
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
          </div>
        )}
      </section>
    </div>
  );
};

export default App;
