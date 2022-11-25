import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import Footer from '../pages/shered/Footer/Footer';
import Navbar from '../pages/shered/Navbar/Navbar';

const DashboardLayou = () => {
    return (
        <div>
            <Navbar />
            <div className="drawer drawer-mobile">
                <input id="dashboardMainLayou" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content"> {/*right part      ---- layout changeble*/}
                    <Outlet />
                </div> 
                <div className="drawer-side bg-slate-100"> {/*left part*/}
                    <label className="drawer-overlay"></label> 
                    <ul className=" p-4 w-80 text-base-content">
                        <li className=''><Link to='/dashboard/myorders' className='block border-b-2 transition-all p-5 font-semibold text-lg hover:text-[#cea906]'>My orders</Link></li>
                    </ul>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default DashboardLayou;