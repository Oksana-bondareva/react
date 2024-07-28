import { useDispatch, useSelector } from "react-redux";
import "./Flyout.css";
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
    <div className="flyout-wrapper">
      <button className="flyout-button" onClick={handleUnselectItems}>
        Unselect all
      </button>
      <div className="flyout-count">Selected: {selectedItems.length}</div>
      <button className="flyout-button" onClick={handleDownload}>
        Download
      </button>
    </div>
  );
};

export default Flyout;
