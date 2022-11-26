import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthProvider/AuthProvider';
import useBuyer from '../../hook/useBuyer';
import Loading from '../../pages/shered/Loading/Loading';

const BuyerRoute = ({children}) => {
    // console.log(children);
    const {user, loading} = useContext(AuthContext);
    const [isBuyer, isBuyerLoading] = useBuyer(user?.email);
    console.log(isBuyer,isBuyerLoading);
    const location = useLocation();
    if(loading || isBuyerLoading){
        return <Loading />
    }
    if(user && isBuyer){
        return children;
    }
    return <Navigate to='/login' state={{from: location}} replace/>
};

export default BuyerRoute;