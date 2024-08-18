import Card from "../Card/Card";
import { CardData } from "../../Modal/Interfaces";
import { useSelector } from "react-redux";
import { RootState } from "../../Store/Store";

export const Cards = () => {
  const cards = useSelector((state: RootState) => state.form.usersData);

  return cards.length > 0 ? (
    <div className="cards-wrapper">
      {cards.map((userCard: CardData, index: number) => {
        return (
          <div className="card-container" key={`${index}`}>
            <Card userCard={userCard} />
          </div>
        );
      })}
    </div>
  ) : (
    <p>Not found cards</p>
  );
};
