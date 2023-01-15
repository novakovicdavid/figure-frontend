import 'normalize.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {Header} from "./components/Header";
import {createBrowserRouter, defer, Outlet, RouterProvider} from "react-router-dom";
import {HomePage} from "./pages/HomePage";
import {BrowsePage} from "./pages/BrowsePage";
import {RegisterPage} from "./pages/RegisterPage";
import {ErrorPage} from "./pages/ErrorPage";
import {LoginPage} from "./pages/LoginPage";
import {FigurePage} from "./pages/FigurePage";
import {AuthProvider} from "./contexts/authContext";
import {fbFirestore} from "./services/firebase";
import {getCountFromServer} from "firebase/firestore";
import {collection, orderBy, limit} from "firebase/firestore";
import {useMemo} from "react";
import {fetchFirstFigures} from "./utilities/FigureFetching";
import {Footer} from "./components/Footer";
import {backend} from "./services/backend";


function App() {
    const Layout = () => (
        <div style={{display: "grid", height: "100vh", gridTemplateRows: "auto 1fr 56px"}}>
            <AuthProvider>
                <Header/>
                <Outlet/>
                <Footer/>
            </AuthProvider>
        </div>
    );

    const queryOrder = useMemo(() =>
        orderBy('creation', 'desc'), [])

    const homepageLoader = () => {
        const totalFiguresPromise = getCountFromServer(collection(fbFirestore, "figures")).then((snapshot) => {
            return snapshot.data().count;
        });
        const totalUsersPromise = getCountFromServer(collection(fbFirestore, "users")).then((snapshot) => {
            return snapshot.data().count;
        });
        const latestFiguresPromise = fetchFirstFigures(queryOrder, limit(9)).then((docs) => {
            return(docs);
        });

        return defer({
            totalFiguresPromise,
            totalUsersPromise,
            latestFiguresPromise
        });
    }

    const router = createBrowserRouter(
        [{
            element: <Layout/>,
            children: [
                {
                    path: "/",
                    element: <HomePage/>,
                    loader: homepageLoader
                },
                {
                    path: "/home",
                    element: <HomePage/>,
                    loader: homepageLoader
                },
                {
                    path: "/register",
                    element: <RegisterPage/>
                },
                {
                    path: "/login",
                    element: <LoginPage/>
                },
                {
                    path: "/profile/:id",
                    element: <BrowsePage/>,
                    loader: ({params}) => {
                        return defer({
                            data: backend.get_first_browse_figures(params.id),
                            profileData: backend.get_profile(params.id)
                        });
                    }
                },
                {
                    path: "/browse",
                    element: <BrowsePage/>,
                    loader: () => {
                        return defer({
                            data: backend.get_first_browse_figures()
                        });
                    }
                },
                {
                    path: "/figure/:figureid",
                    element: <FigurePage/>,
                    loader: ({params}) => {
                        return defer({
                            data: backend.get_figure(params.figureid)
                        });
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
