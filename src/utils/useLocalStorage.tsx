import { useState, useEffect } from "react";

const useSearchQuery = () => {
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const savedQuery = localStorage.getItem("searchQuery");
    if (savedQuery) {
      setSearchQuery(savedQuery);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("searchQuery", searchQuery);
  }, [searchQuery]);

  return {
    searchQuery,
    setSearchQuery,
  };
};

export default useSearchQuery;
