import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ReactHookForm from "./Pages/ReactHookForm/ReactHookForm";
import UncontrolledForm from "./Pages/UncontrolledForm/UncontrolledForm";
import NotFound from "./Pages/NotFound/NotFound";
import Main from "./Pages/Main/Main";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <NotFound />,
  },
  {
    path: "react-hook-form",
    element: <ReactHookForm />,
  },
  {
    path: "uncontrolled-form",
    element: <UncontrolledForm />,
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
