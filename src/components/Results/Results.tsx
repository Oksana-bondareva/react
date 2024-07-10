import React from "react";
import "./Results.css";

interface ResultItem {
  name: string;
  mass: string;
  height: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
}

interface ResultItems {
  data: ResultItem[];
}

const Results: React.FC<ResultItems> = ({ data }) => {
  return data.length ? (
    <div className="results-container">
      {data.map((item, index) => (
        <div className="results-card" key={index}>
          <p className="results-info">Name: {item.name}</p>
          <p className="results-info">Mass: {item.mass}</p>
          <p className="results-info">Height: {item.height}</p>
          <p className="results-info">Hair color: {item.hair_color}</p>
          <p className="results-info">Skin color: {item.skin_color}</p>
          <p className="results-info">Eye color: {item.eye_color}</p>
          <p className="results-info">Birth year: {item.birth_year}</p>
          <p className="results-info">Gender: {item.gender}</p>
        </div>
      ))}
    </div>
  ) : (
    <div className="not-found-message">Oops, nothing was found!</div>
  );
};

export default Results;
