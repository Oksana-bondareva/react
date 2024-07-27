import { useDispatch, useSelector } from "react-redux";
import "./Flyout.css";
import { RootState } from "../../common/RootReducer/rootReducer";
import { clearItems } from "../../utils/selectedItemsSlice";

const Flyout = () => {
  const selectedItems = useSelector(
    (state: RootState) => state.selectedItems.items,
  );

  const dispatch = useDispatch();

  const handleUnselectItems = () => {
    dispatch(clearItems());
  };

  return (
    <div className="flyout-wrapper">
      <button className="flyout-button" onClick={handleUnselectItems}>
        Unselect all
      </button>
      <div className="flyout-count">Selected: {selectedItems.length}</div>
    </div>
  );
};

export default Flyout;
