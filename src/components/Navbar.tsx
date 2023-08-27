import { Link } from "react-router-dom";
import userStore from "../store/userStore";

const Navbar = () => {
  const user = userStore((s) => s.user);
  return (
    <nav className="flex justify-between w-100 bg-black p-5 ">
      <div className="text-4xl text-indigo-500">
        <Link to="/">BOOKS</Link>
      </div>
      <ul className="flex gap-3 text-white items-center">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="#">about</Link>
        </li>
        <li>
          <Link to="/all-books">books</Link>
        </li>
        {!user?.uid ? (
          <li>
            <Link to="/login">login</Link>
          </li>
        ) : null}

        {user?.uid && (
          <>
            <li>
              <Link to={`/user-profile/${user.uid}`}>Profile</Link>
            </li>
            <li>
              <Link
                to=""
                onClick={() => {
                  localStorage.removeItem("user");
                  window.location.href = "/";
                }}
              >
                Logout
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
