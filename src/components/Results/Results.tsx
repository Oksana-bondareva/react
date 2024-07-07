import { Component } from "react";
import "./Results.css";

type ResultItem = {
  name: string;
  mass: string;
  height: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
};

type ResultItems = {
  data: ResultItem[];
};

export class Results extends Component<ResultItems> {
  render() {
    return this.props.data.length ? (
      <div className="results-container">
        {this.props.data.map(
          (
            item: {
              name: string;
              mass: string;
              height: string;
              hair_color: string;
              skin_color: string;
              eye_color: string;
              birth_year: string;
              gender: string;
            },
            index,
          ) => {
            return (
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
            );
          },
        )}
      </div>
    ) : (
      <div className="not-found-message">Oops, nothing was found!</div>
    );
  }
}
