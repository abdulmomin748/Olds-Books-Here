import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthProvider/AuthProvider';
import Loading from '../../pages/shered/Loading/Loading';

const PrivateRoute = ({children}) => {
    // console.log(children);
    const {user, loading} = useContext(AuthContext);
    console.log(user);
    const location = useLocation();
    if(loading){
        return <Loading />
    }
    if(user){
        return children;
    }
    return <Navigate to='/login' state={{from: location}} replace/>
};

export default PrivateRoute;