import React, { ChangeEvent } from "react";
import styles from "./SearchForm.module.css";
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
    <div className={styles.searchForm}>
      <input
        className={styles.searchFormInput}
        type="text"
        placeholder="Search..."
        value={searchQuery}
        onChange={handleInputChange}
      />
      <button className={styles.searchFormButton} onClick={handleSearch}>
        Search
      </button>
    </div>
  );
};

export default SearchForm;
