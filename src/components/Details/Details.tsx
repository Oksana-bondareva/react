import styles from "./Details.module.css";
import Loader from "../Loader/Loader";

interface PersonData {
  name: string;
  mass: string;
  height: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
}

interface DetailsProps {
  data: PersonData | null;
  onClose: () => void;
}

const Details: React.FC<DetailsProps> = ({ data, onClose }) => {

  return (
    <div className={styles.detailsWrapper}>
      {!data ? (
        <Loader />
      ) : data ? (
        <div data-testid="details">
          <div className={styles.detailsContainer}>
            <p className={styles.resultsInfo}>Name: {data.name}</p>
            <p className={styles.resultsInfo}>Mass: {data.mass}</p>
            <p className={styles.resultsInfo}>Height: {data.height}</p>
            <p className={styles.resultsInfo}>Hair color: {data.hair_color}</p>
            <p className={styles.resultsInfo}>Skin color: {data.skin_color}</p>
            <p className={styles.resultsInfo}>Eye color: {data.eye_color}</p>
            <p className={styles.resultsInfo}>Birth year: {data.birth_year}</p>
            <p className={styles.resultsInfo}>Gender: {data.gender}</p>
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
