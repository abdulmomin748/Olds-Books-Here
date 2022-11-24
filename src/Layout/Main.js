import React from 'react';
import Navbar from '../pages/shered/Navbar/Navbar';
import { Outlet } from 'react-router-dom';
import Footer from '../pages/shered/Footer/Footer';
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