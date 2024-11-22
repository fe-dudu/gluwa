import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SwapPage from "./SwapPage";

const router = createBrowserRouter([
    {
        path: "/",
        element: <SwapPage />,
    },
]);

export const Routes = () => {
    return <RouterProvider router={router} />;
};
