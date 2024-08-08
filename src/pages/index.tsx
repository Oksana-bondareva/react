import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { apiSlice } from "../utils/apiSlice";
import { useTheme } from "../components/Theme/ThemeContext";
import SearchForm from "../components/SearchForm/SearchForm";
import Results, { Item } from "../components/Results/Results";
import ThemeToggle from "../components/Theme/ThemeToggle";
import styles from "../App.module.css";
import { ResultItem } from "../utils/interfaces";
import { wrapper } from "../common/store/Store";
import { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    try {
      const currentPage = Number(context.query.page) || 1;
      const searchValue = context.query.search?.toString() || "";
      const idValue = context.query.id?.toString();

      const searchResponse = await store.dispatch(
        apiSlice.endpoints.getPeople.initiate({
          search: searchValue,
          page: currentPage,
        })
      );

      let personResponse;
      if (idValue) {
        personResponse = await store.dispatch(
          apiSlice.endpoints.getPersonById.initiate(idValue)
        );
      }

      await Promise.all(store.dispatch(apiSlice.util.getRunningQueriesThunk()));
      const initialData = searchResponse.data || { results: [] };

      return {
        props: { initialData, currentPage, personData: personResponse?.data || null },
      };
    } catch (error) {
      console.error("Error in getServerSideProps:", error);
      return {
        props: { initialData: { results: [] }, currentPage: 1, personData: null },
      };
    }
  }
);

interface HomeProps {
  initialData: { results: ResultItem[] };
  currentPage: number;
  personData: Item | null;
}

const Home = ({ initialData, currentPage, personData }: HomeProps) => {
  const router = useRouter();
  const [searchValue, setSearchValue] = useState(
    typeof window !== "undefined" ? localStorage.getItem("search") || "" : ""
  );
  const [page, setPage] = useState(currentPage);
  const { theme } = useTheme();

  useEffect(() => {
    setSearchValue(
      typeof window !== "undefined" ? localStorage.getItem("search") || "" : ""
    );
    const currentPageFromUrl = Number(router.query.page) || 1;
    setPage(currentPageFromUrl);
  }, [router.query.page]);

  const handleSearch = (query: string) => {
    event?.preventDefault();
    if (typeof window !== "undefined") {
      localStorage.setItem("search", query);
    }
    setSearchValue(query);
    setPage(1);
    router.push(`/?search=${query}&page=1`);
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      router.push(`/?search=${searchValue}&page=${page - 1}`);
    }
  };

  const handleNextPage = () => {
    router.push(`/?search=${searchValue}&page=${page + 1}`);
  };

  return (
    <div className={theme}>
      <section className={styles.searchSection}>
        <button
          className={styles.errorButton}
          onClick={() => {
            throw new Error("Oops, something went wrong...");
          }}
        >
          ERROR
        </button>
        <SearchForm onSearch={handleSearch} />
        <ThemeToggle />
      </section>
      <section>
        <div className={styles.resultWrapper}>
          <Results
            data={initialData.results}
            personData={personData}
            currentPage={currentPage}
          />
          <div className={styles.paginationPages}>
            <button
              className={styles.paginationButton}
              onClick={handlePreviousPage}
              disabled={page === 1}
            >
              Prev
            </button>
            <span>Page {page}</span>
            <button
              className={styles.paginationButton}
              onClick={handleNextPage}
            >
              Next
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
