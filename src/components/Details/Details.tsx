import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useGetPersonByIdQuery } from '../../utils/apiSlice';
import './Details.css';
import Loader from '../Loader/Loader';

const Details = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const id = location.pathname.split('/').pop() || '';
  const { data, error, isLoading } = useGetPersonByIdQuery(id);

  useEffect(() => {
    if (error) {
      console.log(error);
    }
  }, [error]);

  const handleClose = () => {
    navigate(-1);
  };

  return (
    <div className="details-wrapper">
      {isLoading ? (
        <Loader />
      ) : data ? (
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
        <p>No data available</p>
      )}
    </div>
  );
};

export default Details;
