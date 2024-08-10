"use client";

import React from "react";
import { useRouter } from "next/navigation";
import styles from "./Pagination.module.css";

interface PaginationProps {
  currentPage: number;
  searchValue: string;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  searchValue,
}) => {
  const router = useRouter();

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      router.push(`/?search=${searchValue}&page=${currentPage - 1}`);
    }
  };

  const handleNextPage = () => {
    router.push(`/?search=${searchValue}&page=${currentPage + 1}`);
  };

  return (
    <div className={styles.paginationPages}>
      <button
        className={styles.paginationButton}
        onClick={handlePreviousPage}
        disabled={currentPage === 1}
      >
        Prev
      </button>
      <span>Page {currentPage}</span>
      <button className={styles.paginationButton} onClick={handleNextPage}>
        Next
      </button>
    </div>
  );
};

export default Pagination;
