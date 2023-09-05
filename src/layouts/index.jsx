import React from "react";
import HeaderComponents from "../components/HeaderComponents";
import Sidebar from "../components/SideBar";
import "./style.scss";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className="mainlayout-container">
      <HeaderComponents />
      <div className="mainlayout-container__groups">
        <Sidebar />
        <div className="right-side">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
