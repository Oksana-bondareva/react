import { useSelector } from "react-redux";
import "./Flyout.css";
import { RootState } from "../../common/RootReducer/rootReducer";

const Flyout = () => {
    const selectedItems = useSelector(
        (state: RootState) => state.selectedItems.items,
      );

  return (
    <div className="flyout-wrapper">
        <div className="flyout-count">Selected: {selectedItems.length}</div>
    </div>
  );
};

export default Flyout;