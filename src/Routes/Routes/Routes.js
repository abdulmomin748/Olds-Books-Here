import { createBrowserRouter } from "react-router-dom";
import Main from "../../../../../doctors-portal-client/src/Layout/Main";
import ErrorPage from "../../pages/ErrorPage/ErrorPage";
const router = createBrowserRouter([
    {
        path: '/',
        element: <Main />,
        errorElement: <ErrorPage />,
        children: [
            {

            }
        ]
    }
]);
export default router;