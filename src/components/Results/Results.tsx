import "./Results.css";
import { ResultItems } from "../../utils/interfaces";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";

const Results: React.FC<ResultItems> = ({ data }) => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="results">
      <div
        className="results-overlay"
        onClick={() => {
          navigate(`/search/${location.pathname.split("/")[2] || 1}`);
        }}
      ></div>
      <div className="results-container">
        {data.map((item, index) => (
          <Link
            className="results-card"
            data-testid="character-card"
            key={index}
            to={`/search/${location.pathname.split("/")[2] || 1}/details/${item.url.slice(29, item.url.lastIndexOf("/"))}`}
          >
            <p className="results-info">Name: {item.name}</p>
          </Link>
        ))}
        {!data.length && !location.pathname.includes(`/details/`) && (
          <div className="not-found-message">Oops, nothing was found!</div>
        )}
      </div>
      <Outlet />
    </div>
  );
};

export default Results;
