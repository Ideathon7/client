import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import { useEffect } from "react";
import userStore from "./store/userStore";

const Layout = () => {
  const setUser = userStore((s) => s.setUser);
  const getStoredData = localStorage.getItem("user");
  useEffect(() => {
    if (localStorage) {
      const user = JSON.parse(getStoredData!);
      setUser(user);
    }
  });
  return (
    <>
      <Navbar />
      <div className="px-5">
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
