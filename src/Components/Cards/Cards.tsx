import Card from "../Card/Card";
import { CardData, FormData } from "../../Modal/Interfaces";
import { useSelector } from "react-redux";
import { RootState } from "../../Store/Store";
import "./Cards.css";
import { useEffect, useState } from "react";

export const Cards = () => {
  const cards = useSelector((state: RootState) => state.form.usersData);
  const [highlightedUser, setHighlightedUser] = useState<FormData | null>(null);

  useEffect(() => {
    if (cards.length > 0) {
      const newUser: FormData = cards[cards.length - 1];
      setHighlightedUser(newUser);

      const timer = setTimeout(() => {
        setHighlightedUser(null);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [cards]);

  return cards.length > 0 ? (
    <div className="cards-wrapper">
      {cards.map((userCard: CardData, index: number) => {
        return (
          <div
            className="card-container"
            key={`${index}`}
            style={{
              border:
                userCard === highlightedUser
                  ? "5px solid green"
                  : "3px solid rgb(106, 14, 119)",
              backgroundColor:
                userCard === highlightedUser
                  ? "lightgreen"
                  : "rgb(233, 226, 239)",
            }}
          >
            <Card userCard={userCard} />
          </div>
        );
      })}
    </div>
  ) : (
    <h1 className="not-found-card">Not found cards</h1>
  );
};
