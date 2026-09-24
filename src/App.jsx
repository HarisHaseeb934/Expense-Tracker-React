import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./Pages/ErrorPage";
import Applayout from "./Layout/Applayout";
import Dashboard from "./Pages/Dashboard";
import { BalanceProvider } from "./Context/BalanceProvider";
import Analytics from "./Pages/Analytics";

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
    <BalanceProvider>
      <RouterProvider router={router} />
    </BalanceProvider>
  );
};

export default App;
