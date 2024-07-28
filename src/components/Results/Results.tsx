import "./Results.css";
import { ResultItems } from "../../utils/interfaces";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addItem, removeItem } from "../../utils/selectedItemsSlice";
import { RootState } from "../../common/RootReducer/rootReducer";
import Flyout from "../Flyout/Flyout";

const Results: React.FC<ResultItems> = ({ data }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const selectedItems = useSelector(
    (state: RootState) => state.selectedItems.items,
  );
  const dispatch = useDispatch();

  const handleSelectItem = (item: {
    name: string;
    mass: string;
    height: string;
    hair_color: string;
    skin_color: string;
    eye_color: string;
    birth_year: string;
    gender: string;
    url: string;
  }) => {
    dispatch(addItem(item));
  };

  const handleUnselectItem = (item: {
    name: string;
    mass: string;
    height: string;
    hair_color: string;
    skin_color: string;
    eye_color: string;
    birth_year: string;
    gender: string;
    url: string;
  }) => {
    dispatch(removeItem(item.name));
  };

  return (
    <div className="results">
      <div
        className="results-overlay"
        onClick={() => {
          navigate(`/search/${location.pathname.split("/")[2] || 1}`);
        }}
      ></div>
      <div className="results-container">
        {data.map((item, index) => (
          <div
            className="results-card"
            data-testid="character-card"
            key={index}
            onClick={() => {
              navigate(
                `/search/${location.pathname.split("/")[2] || 1}/details/${item.url.slice(29, item.url.lastIndexOf("/"))}`,
              );
            }}
          >
            <input
              type="checkbox"
              className="card-checkbox"
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
          <div className="not-found-message">Oops, nothing was found!</div>
        )}
        {selectedItems.length > 0 && <Flyout />}
      </div>
      {location.pathname.includes(`/details/`) && <Outlet />}
    </div>
  );
};

export default Results;
