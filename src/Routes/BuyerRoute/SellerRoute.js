import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthProvider/AuthProvider';
import useSeller from '../../hook/useSeller';
import Loading from '../../pages/shered/Loading/Loading';

const SellerRoute = ({children}) => {
    // console.log(children);
    const {user, loading} = useContext(AuthContext);
    const [isSeller, isSellerLoading] = useSeller(user?.email);
    console.log(isSeller,isSellerLoading);
    const location = useLocation();
    if(loading || isSellerLoading){
        return <Loading />
    }
    if(user && isSeller){
        return children;
    }
    return <Navigate to='/login' state={{from: location}} replace/>
};

export default SellerRoute;