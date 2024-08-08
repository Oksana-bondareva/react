import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { addItem, removeItem } from "../../utils/selectedItemsSlice";
import { RootState } from "../../common/RootReducer/rootReducer";
import Flyout from "../Flyout/Flyout";
import Details from "../Details/Details";
import styles from "./Results.module.css";
import { ResultItems } from "../../utils/interfaces";

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

const Results: React.FC<ResultItems & { personData: Item | null, currentPage: number }> = ({ data, personData }) => {
  const router = useRouter();
  const selectedItems = useSelector(
    (state: RootState) => state.selectedItems.items,
  );
  const dispatch = useDispatch();
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);

  useEffect(() => {
    if (router.query.id) {
      setSelectedItemId(router.query.id as string);
    }
  }, [router.query.id]);

  const handleSelectItem = (item: Item) => {
    dispatch(addItem(item));
  };

  const handleUnselectItem = (item: Item) => {
    dispatch(removeItem(item.name));
  };

  const handleCardClick = (item: Item) => {
    const id = item.url.slice(29, item.url.lastIndexOf("/"));
    setSelectedItemId(id);
    const searchValue = router.query.search || "";
    const currentPage = router.query.page || 1;
    router.push(`/?search=${searchValue}&page=${currentPage}&id=${id}`);
  };

  const handleCloseDetails = () => {
    setSelectedItemId(null);
    router.push(`/?search=${router.query.search}&page=${router.query.page}`);
  };

  return (
    <div className={styles.results}>
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
            <p className="results-info">Name: {item.name}</p>
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
