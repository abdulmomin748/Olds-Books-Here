import { createBrowserRouter } from "react-router-dom";
import Main from "../../Layout/Main";
import ErrorPage from "../../pages/ErrorPage/ErrorPage";
import Home from "../../pages/Home/Home/Home";
import Products from "../../pages/Products/Products";
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
                path: '/category/:id',
                loader: ({params}) => fetch(`http://localhost:5000/products/${params.id}`),
                element: <Products />,
                
            }
        ]
    }
]);
export default router;