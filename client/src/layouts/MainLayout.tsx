import React from "react";
import { Outlet } from 'react-router-dom';
import Header from "../components/Header";
import Squares from "../components/Squares";

const MainLayout: React.FC = () => {
    return (
        <div className="wrapper">
            <Header />
            <Squares />
            <div className="content">
                <Outlet />
            </div>
        </div>
    );
};

export default MainLayout;