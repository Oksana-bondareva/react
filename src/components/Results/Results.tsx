"use client";

import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter, useSearchParams } from "next/navigation";
import { addItem, removeItem } from "../../utils/selectedItemsSlice";
import { RootState } from "../../common/RootReducer/rootReducer";
import Flyout from "../Flyout/Flyout";
import Details from "../Details/Details";
import styles from "./Results.module.css";
import { ResultItem } from "../../utils/interfaces";

export type Item = {
  name: string;
  mass: string;
  height: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  url: string;
};

interface ResultsProps {
  data: ResultItem[];
  personData: Item | null;
  currentPage: number;
}

const Results: React.FC<ResultsProps> = ({ data, personData, currentPage }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedItems = useSelector(
    (state: RootState) => state.selectedItems.items,
  );
  const dispatch = useDispatch();
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);

  useEffect(() => {
    const id = searchParams.get("id");
    if (id) {
      setSelectedItemId(id);
    }
  }, [searchParams]);

  const handleSelectItem = (item: Item) => {
    dispatch(addItem(item));
  };

  const handleUnselectItem = (item: Item) => {
    dispatch(removeItem(item.name));
  };

  const handleCardClick = (item: Item) => {
    const id = item.url.slice(29, item.url.lastIndexOf("/"));
    setSelectedItemId(id);
    const searchValue = searchParams.get("search") || "";
    router.push(`/?search=${searchValue}&page=${currentPage}&id=${id}`);
  };

  const handleCloseDetails = () => {
    setSelectedItemId(null);
    router.push(
      `/?search=${searchParams.get("search")}&page=${searchParams.get("page")}`,
    );
  };

  return (
    <div className={styles.results}>
      <div
        className={styles.resultsOverlay}
        onClick={() => {
          router.push(
            `/?search=${searchParams.get("search")}&page=${searchParams.get("page")}`,
          );
        }}
      ></div>
      <div className={styles.resultsContainer}>
        {data.map((item, index) => (
          <div
            className={styles.resultsCard}
            data-testid="character-card"
            key={index}
            onClick={() => handleCardClick(item)}
          >
            <input
              type="checkbox"
              className={styles.cardCheckbox}
              data-testid="checkbox"
              onChange={() => {
                if (
                  selectedItems.some(
                    (selectedItem) => selectedItem.name === item.name,
                  )
                ) {
                  handleUnselectItem(item);
                } else {
                  handleSelectItem(item);
                }
              }}
              checked={selectedItems.some(
                (selectedItem) => selectedItem.name === item.name,
              )}
            ></input>
            <p className={styles.resultsInfo}>Name: {item.name}</p>
          </div>
        ))}
        {!data.length && (
          <div className={styles.notFoundMessage}>Oops, nothing was found!</div>
        )}
        {selectedItems.length > 0 && <Flyout />}
      </div>
      {selectedItemId && personData && (
        <Details data={personData} onClose={handleCloseDetails} />
      )}
    </div>
  );
};

export default Results;
