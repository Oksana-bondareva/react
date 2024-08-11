import React from "react";
import SearchForm from "../../components/SearchForm/SearchForm";
import Results from "../../components/Results/Results";
import styles from "../../App.module.css";
import Pagination from "../../components/Pagination/Pagination";
import ThemedWrapper from "../../components/Theme/ThemedWrapper";
import Loader from "../../components/Loader/Loader";

async function getPeople(searchValue = "", page = 1) {
  const response = await fetch(
    `https://swapi.dev/api/people/?search=${searchValue}&page=${page}`,
    {
      method: "GET",
    },
  );

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  const people = await response.json();
  return people;
}

interface SearchParams {
  search?: string;
  page?: string;
  id?: string;
}

interface HomeProps {
  searchParams: SearchParams;
}

const Home = async ({ searchParams }: HomeProps) => {
  const { search = "", page = "1" } = searchParams;
  const initialData = await getPeople(search, Number(page));

  let personData = null;
  const selectedPersonId = searchParams.id;
  if (selectedPersonId) {
    const response = await fetch(
      `https://swapi.dev/api/people/${selectedPersonId}/`,
    );
    personData = await response.json();
  }

  return (
    <ThemedWrapper>
      <section className={styles.searchSection}>
        <SearchForm initialSearchValue={search} />
      </section>
      <section>
        <div className={styles.resultsWrapper}>
          {initialData && initialData.results ? (
            <Results
              data={initialData.results}
              currentPage={Number(page)}
              personData={personData}
            />
          ) : (
            <Loader />
          )}
          <Pagination currentPage={Number(page)} searchValue={search} />
        </div>
      </section>
    </ThemedWrapper>
  );
};

export default Home;
