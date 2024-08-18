import "./Main.css";
import { Link } from "react-router-dom";
import { Cards } from "../../Components/Cards/Cards";

const Main = () => {
  return (
    <div className="main-wrapper">
      <div className="main-links-wrapper">
        <Link to="react-hook-form" className="main-link">
          React Hook Form
        </Link>
        <Link to="uncontrolled-form" className="main-link">
          Uncontrolled Form
        </Link>
      </div>
      <Cards />
    </div>
  );
};

export default Main;
