import { createBrowserRouter } from "react-router-dom";
import DashboardLayou from "../../Layout/DashboardLayou";
import Main from "../../Layout/Main";
import Blog from "../../pages/Blog/Blog";
import MyOders from "../../pages/Dashboard/MyOders/MyOders";
import ErrorPage from "../../pages/ErrorPage/ErrorPage";
import Home from "../../pages/Home/Home/Home";
import Login from "../../pages/Login/Login";
import Products from "../../pages/Products/Products";
import Register from "../../pages/Register/Register";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
const router = createBrowserRouter([
    {
        path: '/',
        element: <Main />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: '/',
                element: <Home />,
            },
            {
                path: '/blog',
                element: <Blog />,
            },
            {
                path: '/login',
                element: <Login />,
            },
            {
                path: '/register',
               element: <Register />
            },
            {
                path: '/category/:id',
                loader: ({params}) => fetch(`http://localhost:5000/products/${params.id}`),
                element: <PrivateRoute><Products /></PrivateRoute>,
            }
        ]
    },
    {
        path: '/dashboard',
        element: <DashboardLayou />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: '/dashboard/myorders',
                element: <MyOders />
            }
        ]
    }
]);
export default router;