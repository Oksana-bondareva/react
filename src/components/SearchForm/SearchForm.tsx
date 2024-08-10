"use client";

import React, { ChangeEvent, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import styles from "./SearchForm.module.css";

interface SearchFormProps {
  initialSearchValue: string;
}

const SearchForm: React.FC<SearchFormProps> = ({ initialSearchValue }) => {
  const router = useRouter();
  const urlSearchParams = useSearchParams();
  const [searchValue, setSearchValue] = useState(initialSearchValue);

  useEffect(() => {
    const search = urlSearchParams.get("search") || "";
    setSearchValue(search);
  }, [urlSearchParams]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const handleSearch = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (typeof window !== "undefined") {
      localStorage.setItem("search", searchValue);
    }
    router.push(`/?search=${searchValue}&page=1`);
  };

  return (
    <div className={styles.searchForm}>
      <input
        className={styles.searchFormInput}
        type="text"
        placeholder="Search..."
        value={searchValue}
        onChange={handleInputChange}
      />
      <button className={styles.searchFormButton} onClick={handleSearch}>
        Search
      </button>
    </div>
  );
};

export default SearchForm;
