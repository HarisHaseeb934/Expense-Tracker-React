import { createBrowserRouter, RouterProvider } from "react-router-dom"
import ErrorPage from "./Pages/ErrorPage"
import Applayout from "./Layout/Applayout"
import Dashboard from "./Pages/Dashboard"

const router = createBrowserRouter([
    {
        path: "/",
        element: <Applayout/>,
        errorElement: <ErrorPage/>,
        children:[
          {
            path: "/",
            element: <Dashboard/>
          }
        ]
    }
])

const App = () => {
  return (
    <RouterProvider router={router}/>
  )
}

export default App