import React from "react";
import Header from "../../Components/Header/Header";
import { Outlet } from "react-router-dom";
function DefaultLayout({ isLoggedIn, setIsLoggedIn }) {
  return (
    <div>
      <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <Outlet />
    </div>
  );
}

export default DefaultLayout;
