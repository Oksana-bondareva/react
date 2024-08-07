import styles from "./Results.module.css";
import { ResultItems } from "../../utils/interfaces";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { addItem, removeItem } from "../../utils/selectedItemsSlice";
import { RootState } from "../../common/RootReducer/rootReducer";
import Flyout from "../Flyout/Flyout";
import Details from "../Details/Details";

type Item = {
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

const Results: React.FC<ResultItems> = ({ data }) => {
  const selectedItems = useSelector(
    (state: RootState) => state.selectedItems.items,
  );
  const dispatch = useDispatch();
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);

  const handleSelectItem = (item: Item) => {
    dispatch(addItem(item));
  };

  const handleUnselectItem = (item: Item) => {
    dispatch(removeItem(item.name));
  };

  const handleCardClick = (item: Item) => {
    setSelectedItemId(item.url.slice(29, item.url.lastIndexOf("/")));
  };

  const handleCloseDetails = () => {
    setSelectedItemId(null);
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
      {selectedItemId && (
        <Details id={selectedItemId} onClose={handleCloseDetails} />
      )}
    </div>
  );
};

export default Results;