import React, { ChangeEvent } from "react";
import "./SearchForm.module.css";
import useSearchQuery from "../../utils/useLocalStorage";

interface SearchFormProps {
  onSearch: (value: string) => void;
}

const SearchForm: React.FC<SearchFormProps> = ({ onSearch }) => {
  const { searchQuery, setSearchQuery } = useSearchQuery();

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleSearch = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    onSearch(searchQuery);
  };

  return (
    <div className="search-form">
      <input
        className="search-form__input"
        type="text"
        placeholder="Search..."
        value={searchQuery}
        onChange={handleInputChange}
      />
      <button className="search-form__button" onClick={handleSearch}>
        Search
      </button>
    </div>
  );
};

export default SearchForm;
