import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layout";
import HomeSection from "./components/HomeSection";
import UserRegister from "./components/UserRegister";
import UserProfile from "./components/UserProfile";
import BookForm from "./components/BookForm";
import AllBooks from "./components/AllBooks";
import LoginForm from "./components/LoginForm";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <HomeSection /> },
      { path: "/register", element: <UserRegister /> },
      { path: "/login", element: <LoginForm /> },
      { path: "/user-profile/:id", element: <UserProfile /> },
      { path: "/add-book", element: <BookForm /> },
      { path: "/all-books", element: <AllBooks /> },
    ],
  },
]);

export default routes;
