import { useEffect, useState } from "react";
import { ResultItem } from "../../utils/interfaces";
import "./Details.css";
import Loader from "../Loader/Loader";
import { useLocation, useNavigate } from "react-router-dom";

const Details = () => {
  const [data, setData] = useState<ResultItem | null>(null);
  const [isLoader, setIsLoader] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const getDetails = async () => {
      try {
        setIsLoader(true);
        const response = await fetch(
          `https://swapi.dev/api/people/${location.pathname.split("/").pop()}`,
        );
        const data = await response.json();
        setData(data);
        setIsLoader(false);
        return data;
      } catch (error) {
        console.log(error);
      }
    };
    getDetails();
  }, [location.pathname]);

  const handleClose = () => {
    setData(null);
    navigate(-1);
  };

  return data ? (
    <div className="details-wrapper">
      {!isLoader ? (
        <div>
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
          <button className="details-button" onClick={handleClose}>
            Close
          </button>
        </div>
      ) : (
        <Loader />
      )}
    </div>
  ) : (
    ""
  );
};

export default Details;
