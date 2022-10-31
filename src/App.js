import 'normalize.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {Header} from "./components/Header";
import {createBrowserRouter, Outlet, RouterProvider} from "react-router-dom";
import {Home} from "./pages/Home";
import {Profile} from "./pages/Profile";
import {Register} from "./pages/Register";
import {Error} from "./pages/Error";
import {Login} from "./pages/Login";
import {Upload} from "./pages/Upload";

function App() {
    const Layout = () => (
        <>
            <Header/>
            <Outlet/>
        </>
    );

    const router = createBrowserRouter(
        [{
            element: <Layout/>,
            children: [
                {
                    path: "/",
                    element: <Home/>
                },
                {
                    path: "/home",
                    element: <Home/>
                },
                {
                    path: "/register",
                    element: <Register/>
                },
                {
                    path: "/login",
                    element: <Login/>
                },
                // {
                //     path: "/logout"
                //     element: <Logout/>
                // },
                {
                    path: "/upload",
                    element: <Upload/>
                },
                {
                    path: "/profile",
                    element: <Profile/>
                },
                {
                    path: "*",
                    element: <Error/>
                }
            ]
        }]
    );

    return (
        <div>
            <RouterProvider router={router}/>
        </div>
    );
}

export default App;
