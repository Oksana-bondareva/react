import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useGetPeopleQuery , apiSlice } from '../utils/apiSlice';
import { useTheme } from '../components/Theme/ThemeContext';
import SearchForm from '../components/SearchForm/SearchForm';
import Results from '../components/Results/Results';
import Loader from '../components/Loader/Loader';
import ThemeToggle from '../components/Theme/ThemeToggle';
import styles from "../App.module.css"

import { ResultItem } from '../utils/interfaces';
import { wrapper } from '../common/store/Store';

interface HomeProps {
    initialData: { results: ResultItem[] };
  }
  
  const Home = ({ initialData }: HomeProps) => {
    const router = useRouter();
    const [searchValue, setSearchValue] = useState(
      typeof window !== 'undefined' ? localStorage.getItem('search') || '' : ''
    );
    const [currentPage, setCurrentPage] = useState(1);
    const { data: dataApi, error, isLoading } = useGetPeopleQuery({ search: searchValue, page: currentPage });
    const { theme } = useTheme();
  
    useEffect(() => {
      setCurrentPage(1);
      if (error) {
        console.log(error);
      }
    }, [error]);
  
    useEffect(() => {
      setSearchValue(typeof window !== 'undefined' ? localStorage.getItem('search') || '' : '');
      const currentPageFromUrl = Number(router.query.page) || 1;
      setCurrentPage(currentPageFromUrl);
    }, [router.query.page]);
  
    const handleSearch = (query: string) => {
      event?.preventDefault();
      if (typeof window !== 'undefined') {
        localStorage.setItem('search', query);
      }
      setSearchValue(query);
      setCurrentPage(1);
      router.push(`/`);
    };
  
    const errorButtonHandler = () => {
      throw new Error('Oops, something went wrong...');
    };
  
    const handlePreviousPage = () => {
      if (currentPage > 1) {
        setCurrentPage(currentPage - 1);
        router.push(`/search/${currentPage - 1}`);
      }
    };
  
    const handleNextPage = () => {
      setCurrentPage(currentPage + 1);
      router.push(`/search/${currentPage + 1}`);
    };
  
    return (
      <div className={theme}>
        <section className={styles.searchSection}>
          <button className={styles.errorButton} onClick={errorButtonHandler}>
            ERROR
          </button>
          <SearchForm onSearch={handleSearch} />
          <ThemeToggle />
        </section>
        <section>
          {isLoading ? (
            <Loader />
          ) : (
            <div className={styles.resultWrapper}>
              <Results data={dataApi?.results || initialData.results || []} />
              <div className={styles.paginationPages}>
                <button className={styles.paginationButton} onClick={handlePreviousPage}>
                  Prev
                </button>
                <span>Page {currentPage}</span>
                <button className={styles.paginationButton} onClick={handleNextPage}>
                  Next
                </button>
              </div>
            </div>
          )}
        </section>
      </div>
    );
  };
  
  export const getServerSideProps = wrapper.getServerSideProps(store => async context => {
  
    const { page } = context.query;
    const search = Array.isArray(context.query.search) ? context.query.search[0] : context.query.search || '';
  
    await store.dispatch(apiSlice.endpoints.getPeople.initiate({ search, page: Number(page) || 1 }));
  
    const data = store.getState().api.queries['getPeople({"search":"' + search + '","page":' + page + '})']?.data;
  
    return {
      props: {
        initialData: data || { results: [] },
      },
    };
  });

  export default Home;