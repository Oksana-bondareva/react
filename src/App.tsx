import { useState, useEffect } from "react";
import "./App.css";
import SearchForm from "./components/SearchForm/SearchForm";
import Results from "./components/Results/Results";
import Loader from "./components/Loader/Loader";
import { useNavigate, useLocation } from "react-router-dom";
import { useGetPeopleQuery } from "./utils/apiSlice";

const App = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchValue, setSearchValue] = useState(
    localStorage.getItem("search") || "",
  );
  const [currentPage, setCurrentPage] = useState(1);
  const {
    data: dataApi,
    error,
    isLoading,
  } = useGetPeopleQuery({ search: searchValue, page: currentPage });

  useEffect(() => {
    setCurrentPage(1);
    if (error) {
      console.log(error);
    }
  }, [error]);

  useEffect(() => {
    setSearchValue(localStorage.getItem("search") || "");
    const currentPageFromUrl = Number(location.pathname.split("/")[2]) || 1;
    setCurrentPage(currentPageFromUrl);
  }, [location.pathname]);

  const handleSearch = (query: string) => {
    event?.preventDefault();
    localStorage.setItem("search", query);
    setSearchValue(query);
    setCurrentPage(1);
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
            <Results data={dataApi?.results || []} />
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
