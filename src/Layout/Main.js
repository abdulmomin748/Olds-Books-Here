import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../pages/shered/Footer/Footer';
import Navbar from '../pages/shered/Navbar/Navbar';
const Main = () => {
    return (
        <div>
            <Navbar />
            <Outlet />
            <Footer />
        </div>
    );
};

export default Main;