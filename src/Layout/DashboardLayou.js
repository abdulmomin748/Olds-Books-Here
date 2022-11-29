import React, { useContext } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { AuthContext } from '../Context/AuthProvider/AuthProvider';
import useAdmin from '../hook/useAdmin';
import useBuyer from '../hook/useBuyer';
import useSeller from '../hook/useSeller';
import Footer from '../pages/shered/Footer/Footer';
import Navbar from '../pages/shered/Navbar/Navbar';
const DashboardLayou = () => {
    const {user} = useContext(AuthContext);
    const [isBuyer] = useBuyer(user?.email);
    const [isSeller] = useSeller(user?.email);
    const [isAdmin] = useAdmin(user?.email);
    console.log('isByer', isBuyer, 'isSeller', isSeller);
    
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
                        {  
                            isAdmin &&
                            <>
                                <li className=''><Link to='/dashboard/allSellers' className='block border-b-2 transition-all p-5 font-semibold text-lg hover:text-[#cea906]'>All Sellers</Link></li>
                                <li className=''><Link to='/dashboard/allBuyers' className='block border-b-2 transition-all p-5 font-semibold text-lg hover:text-[#cea906]'>All Buyers</Link></li>

                            </>
                        }
                        {  
                            isBuyer &&
                            <li className=''><Link to='/dashboard/myorders' className='block border-b-2 transition-all p-5 font-semibold text-lg hover:text-[#cea906]'>My orders</Link></li>
                        }
                        {    isSeller &&
                             <>
                                <li className=''><Link to='/dashboard/addproduct' className='block border-b-2 transition-all p-5 font-semibold text-lg hover:text-[#cea906]'>Add product</Link></li>
                                <li className=''><Link to='/dashboard/myproducts' className='block border-b-2 transition-all p-5 font-semibold text-lg hover:text-[#cea906]'>My products</Link></li>
                             </>
                        }
                    </ul>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default DashboardLayou;