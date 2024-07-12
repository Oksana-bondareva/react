import { createBrowserRouter } from "react-router-dom";
import App from "../../App";
import NotFound from "../NotFound/NotFound";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFound />,
  },
]);

export default router;