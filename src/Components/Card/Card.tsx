import { CardData } from "../../Modal/Interfaces";
import "./Card.css";

const Card = (props: { userCard: CardData }) => {
  const { userCard } = props;

  return (
    <div className="card-wrapper">
      <div className="card-data-wrapper">
        <div className="card-data-title">Name:</div>
        <div className="card-data">{userCard.name}</div>
      </div>
      <div className="card-data-wrapper">
        <div className="card-data-title">Age:</div>
        <div className="card-data">{userCard.age}</div>
      </div>
      <div className="card-data-wrapper">
        <div className="card-data-title">Email:</div>
        <div className="card-data">{userCard.email}</div>
      </div>
      <div className="card-data-wrapper">
        <div className="card-data-title">Password:</div>
        <div className="card-data">{userCard.password}</div>
      </div>
      <div className="card-data-wrapper">
        <div className="card-data-title">Gender:</div>
        <div className="card-data">{userCard.gender}</div>
      </div>
      <div className="card-data-wrapper">
        <div className="card-data-title">Country:</div>
        <div className="card-data">{userCard.country}</div>
      </div>
      <div className="card-data-wrapper">
        <div className="card-data-title">Image:</div>
        <img className="card-data" src={userCard.picture}></img>
      </div>
    </div>
  );
};

export default Card;
