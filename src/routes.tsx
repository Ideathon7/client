import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layout";
import HomeSection from "./components/HomeSection";
import UserRegister from "./components/UserRegister";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <HomeSection /> },
      { path: "/register", element: <UserRegister /> },
    ],
  },
]);

export default routes;
