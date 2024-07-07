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

export class Results extends Component<{ item: ResultItem }> {
  render() {
    return (
      <div className="results-wrapper">
        <p className="results-info">Name: {this.props.item.name}</p>
        <p className="results-info">Mass: {this.props.item.mass}</p>
        <p className="results-info">Height: {this.props.item.height}</p>
        <p className="results-info">Hair color: {this.props.item.hair_color}</p>
        <p className="results-info">Skin color: {this.props.item.skin_color}</p>
        <p className="results-info">Eye color: {this.props.item.eye_color}</p>
        <p className="results-info">Birth year: {this.props.item.birth_year}</p>
        <p className="results-info">Gender: {this.props.item.gender}</p>
      </div>
    );
  }
}