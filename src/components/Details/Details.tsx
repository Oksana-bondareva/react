import { useEffect } from "react";
import { useGetPersonByIdQuery } from "../../utils/apiSlice";
import styles from "./Details.module.css";
import Loader from "../Loader/Loader";

interface DetailsProps {
  id: string;
  onClose: () => void;
}

const Details: React.FC<DetailsProps> = ({ id, onClose }) => {
  const { data, error, isLoading } = useGetPersonByIdQuery(id);

  useEffect(() => {
    if (error) {
      console.log(error);
    }
  }, [error]);

  return (
    <div className={styles.detailsWrapper}>
      {isLoading ? (
        <Loader />
      ) : data ? (
        <div data-testid="details">
          <div className="details-container">
            <p className="results-info">Name: {data.name}</p>
            <p className="results-info">Mass: {data.mass}</p>
            <p className="results-info">Height: {data.height}</p>
            <p className="results-info">Hair color: {data.hair_color}</p>
            <p className="results-info">Skin color: {data.skin_color}</p>
            <p className="results-info">Eye color: {data.eye_color}</p>
            <p className="results-info">Birth year: {data.birth_year}</p>
            <p className="results-info">Gender: {data.gender}</p>
          </div>
          <button
            className={styles.detailsButton}
            onClick={onClose}
            data-testid="closeButton"
          >
            Close
          </button>
        </div>
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
};

export default Details;
