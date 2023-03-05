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
import {Footer} from "./components/Footer";
import {backend} from "./services/backend";
import {AboutPage} from "./pages/AboutPage";
import {useEffect} from "react";
import runOneSignal from "./index";


function App() {
    useEffect(() => {
        runOneSignal();
    })
    const Layout = () => (
        <div style={{display: "grid", height: "100vh", gridTemplateRows: "auto 1fr 56px"}}>
            <AuthProvider>
                <Header/>
                <Outlet/>
                <Footer/>
            </AuthProvider>
        </div>
    );

    const homepageLoader = () => {
        const totalFiguresCountPromise = backend.get_total_figures_count();
        const totalProfilesCountPromise = backend.get_total_profiles_count();
        const latestFiguresPromise = backend.get_landing_page_figures();

        return defer({
            totalFiguresCountPromise,
            totalProfilesCountPromise,
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
                    element: <BrowsePage key={Math.random()}/>,
                    loader: ({params}) => {
                        const total = backend.get_total_figures_by_profile(params.id);
                        return defer({
                            data: backend.get_first_browse_figures(params.id),
                            profileData: backend.get_profile(params.id)
                                // Add total figures submitted by user to profile object
                                .then((profile) => {
                                    return total.then((total) => {
                                        if (profile.profile) profile.profile.total_figures = total;
                                        return profile;
                                    })
                                })
                        });
                    }
                },
                {
                    path: "/browse",
                    element: <BrowsePage key={Math.random()}/>,
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
                    path: "/about",
                    element: <AboutPage/>
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
