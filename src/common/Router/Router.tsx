import { createBrowserRouter } from "react-router-dom";
import App from "../../App";
import NotFound from "../NotFound/NotFound";
import Results from "../../components/Results/Results";
import Details from "../../components/Details/Details";

const router = createBrowserRouter([
  {
    path: "/search",
    element: <App />,
    children: [
      {
        path: ":page",
        element: <Results data={[]} />,
        errorElement: <NotFound />,
        children: [
          {
            path: "details/:idDetails",
            element: <Details />,
          },
        ],
      },
    ],
  },
  {
    path: "/",
    element: <App />,
  },
]);

export default router;
