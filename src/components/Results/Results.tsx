import React, { useState } from "react";
import "./Results.css";
import { ResultItems } from "../../utils/interfaces";
import Details from "../Details/Details";

const Results: React.FC<ResultItems> = ({ data }) => {
  const [selectedId, setSelectedId] = useState("");
  const [showDetails, setShowDetails] = useState(false);

  const handleItemClick = (id: string) => {
    setSelectedId(id);
    setShowDetails(true);
  };

  return data.length ? (
    <div className="results">
      <div className="results-overlay" onClick={() => {
        setShowDetails(false);
      }}></div>
      <div className="results-container">
        {data.map((item, index) => (
          <div
            className="results-card"
            onClick={() =>
              handleItemClick(item.url.slice(29, item.url.lastIndexOf("/")))
            }
            key={index}
          >
            <p className="results-info">Name: {item.name}</p>
          </div>
        ))}
      </div>
      <div>{showDetails && <Details idDetails={selectedId} />}</div>
    </div>
  ) : (
    <div className="not-found-message">Oops, nothing was found!</div>
  );
};

export default Results;
