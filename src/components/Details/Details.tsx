import { useEffect, useState } from "react";
import { ResultItem } from "../../utils/interfaces";
import "./Details.css";

type detailsType = {
  idDetails: string;
};

const Details: React.FC<detailsType> = ({ idDetails }) => {
  const [data, setData] = useState<ResultItem | null>(null);

  useEffect(() => {
    const getDetails = async () => {
      try {
        const response = await fetch(
          `https://swapi.dev/api/people/${idDetails}`,
        );
        const data = await response.json();
        setData(data);
        return data;
      } catch (error) {
        console.log(error);
      }
    };
    getDetails();
  }, [idDetails]);

  return data ? (
    <div className="details-container">
      <div>
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
        className="details-button"
        onClick={() => {
          setData(null);
        }}
      >
        Close
      </button>
    </div>
  ) : (
    ""
  );
};

export default Details;
