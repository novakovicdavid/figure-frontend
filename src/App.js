import 'normalize.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {Header} from "./components/Header";
import {createBrowserRouter, Outlet, RouterProvider} from "react-router-dom";
import {HomePage} from "./pages/HomePage";
import {ProfilePage} from "./pages/ProfilePage";
import {RegisterPage} from "./pages/RegisterPage";
import {ErrorPage} from "./pages/ErrorPage";
import {LoginPage} from "./pages/LoginPage";
import {UploadPage} from "./pages/UploadPage";
import {FigurePage} from "./pages/FigurePage";
import {AuthProvider} from "./contexts/authContext";
import {ref, getDownloadURL} from "firebase/storage";
import {fbStorage} from "./services/firebase";


function App() {
    const Layout = () => (
        <AuthProvider>
            <Header/>
            <Outlet/>
        </AuthProvider>
    );

    const router = createBrowserRouter(
        [{
            element: <Layout/>,
            children: [
                {
                    path: "/",
                    element: <HomePage/>
                },
                {
                    path: "/home",
                    element: <HomePage/>
                },
                {
                    path: "/register",
                    element: <RegisterPage/>
                },
                {
                    path: "/login",
                    element: <LoginPage/>
                },
                // {
                //     path: "/logout"
                //     element: <Logout/>
                // },
                {
                    path: "/upload",
                    element: <UploadPage/>
                },
                {
                    path: "/profile/:useruid",
                    element: <ProfilePage/>
                },
                {
                    path: "/figure/:figureid",
                    element: <FigurePage/>,
                    loader: async ({params}) => {
                        return getDownloadURL(ref(fbStorage, 'figures/' + params.figureid));
                    }
                },
                {
                    path: "*",
                    element: <ErrorPage/>
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
