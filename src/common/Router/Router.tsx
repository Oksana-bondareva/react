import { createBrowserRouter } from "react-router-dom";
import App from "../../App";
import NotFound from "../NotFound/NotFound";
import Results from "../../components/Results/Results";

const router = createBrowserRouter([
  {
    path: "/search",
    element: <App />,
    children: [
      {
        path: ":page",
        element: <Results data={[]} />,
        errorElement: <NotFound />,
      },
    ],
  },
  {
    path: "/",
    element: <App />,
  },
]);

export default router;
