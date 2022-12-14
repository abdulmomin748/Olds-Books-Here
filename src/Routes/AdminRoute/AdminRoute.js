import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../../Context/AuthProvider/AuthProvider";
import useAdmin from "../../hook/useAdmin";
import Loading from "../../pages/shered/Loading/Loading";

const AdminRoute = ({children}) => {
    const {user, loading} = useContext(AuthContext);
    const [isAdmin, isAdminLoading] = useAdmin(user?.email);
    const location = useLocation();
    if(loading || isAdminLoading){
        return <Loading />
    }
    if(user && isAdmin){
        return children
    }

    return <Navigate to='/login' state={{from: location}} replace/>
}       
export default AdminRoute;