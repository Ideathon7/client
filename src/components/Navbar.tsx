import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import userStore from "../store/userStore";
const Navbar = () => {
  const user = userStore((s) => s.user);
  return (
    <nav className="flex justify-between w-100 p-5 bg-slate-50">
      <div className="text-4xl text-indigo-500">
        <Link to="/">
          <img src={logo} className="w-[60px] h-[60px]" />
        </Link>
      </div>
      <ul className="menu-list flex gap-3 items-center px-10 font-bold">
        <li className="mx-10 hover:font-normal">
          <Link to="/">Home</Link>
        </li>
        <li className="mx-10 hover:font-normal">
          <Link to="#">About</Link>
        </li>
        <li className="mx-10 hover:font-normal">
          <Link to="/all-books">Books</Link>
        </li>
        {!user?.uid ? (
          <li className="mx-10 hover:font-normal">
            <Link to="/login">Login</Link>
          </li>
        ) : null}

        {user?.uid && (
          <>
            <li className="mx-10 hover:font-normal">
              <Link to={`/user-profile/${user.uid}`}>Profile</Link>
            </li>
            <li className="mx-10 hover:font-normal">
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
