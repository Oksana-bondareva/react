import { useDispatch, useSelector } from "react-redux";
import styles from "./Flyout.module.css";
import { RootState } from "../../common/RootReducer/rootReducer";
import { clearItems, downloadItems } from "../../utils/selectedItemsSlice";

const Flyout = () => {
  const selectedItems = useSelector(
    (state: RootState) => state.selectedItems.items,
  );

  const dispatch = useDispatch();

  const handleUnselectItems = () => {
    dispatch(clearItems());
  };

  const handleDownload = () => {
    dispatch(downloadItems());
  };

  return (
    <div className={styles.flyoutWrapper}>
      <button className={styles.flyoutButton} onClick={handleUnselectItems}>
        Unselect all
      </button>
      <div className={styles.flyoutCount}>Selected: {selectedItems.length}</div>
      <button className={styles.flyoutButton} onClick={handleDownload}>
        Download
      </button>
    </div>
  );
};

export default Flyout;
