import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./Pages/ErrorPage";
import Applayout from "./Layout/Applayout";
import Dashboard from "./Pages/Dashboard";
import Analytics from "./Pages/Analytics";
import InitialBalance from "./Custom Hooks/InitialBalance";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Applayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Dashboard />,
      },
      {
        path: "/analytics",
        element: <Analytics />,
      },
    ],
  },
]);

const App = () => {
  return (
    <InitialBalance>
      <RouterProvider router={router} />
    </InitialBalance>
  );
};

export default App;
