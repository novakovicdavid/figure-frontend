import 'normalize.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {Header} from "./components/Header";
import {createBrowserRouter, defer, Outlet, RouterProvider} from "react-router-dom";
import {HomePage} from "./pages/HomePage";
import {ProfilePage} from "./pages/ProfilePage";
import {RegisterPage} from "./pages/RegisterPage";
import {ErrorPage} from "./pages/ErrorPage";
import {LoginPage} from "./pages/LoginPage";
import {UploadPage} from "./pages/UploadPage";
import {FigurePage} from "./pages/FigurePage";
import {AuthProvider} from "./contexts/authContext";
import {ref, getDownloadURL} from "firebase/storage";
import {fbFirestore, fbStorage} from "./services/firebase";
import {doc, getDoc} from "firebase/firestore";
import {collection, orderBy, limit} from "firebase/firestore";
import {useMemo} from "react";
import {fetchFirstFigures} from "./utilities/FigureFetching";
import {Footer} from "./components/Footer";


function App() {
    const Layout = () => (
        <AuthProvider>
            <div style={{display: "grid", height: "100vh", gridTemplateRows: "auto 1fr 56px"}}>
                <Header/>
                <Outlet/>
                <Footer/>
            </div>
        </AuthProvider>
    );

    const limitOfNewItems = 3;

    const collectionRef = useMemo(() =>
        collection(fbFirestore, 'figures'), [])
    const queryOrder = useMemo(() =>
        orderBy('creation', 'desc'), [])
    const queryMaxItems = useMemo(() =>
        limit(limitOfNewItems), [])

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
                    element: <ProfilePage collectionRef={collectionRef} queryOrder={queryOrder} queryMaxItems={queryMaxItems} limitOfNewItems={limitOfNewItems}/>,
                    loader: ({params}) => {
                        return defer({docs: fetchFirstFigures(queryOrder, queryMaxItems, params.useruid)})
                    }
                },
                {
                    path: "/figure/:figureid",
                    element: <FigurePage/>,
                    loader: ({params}) => {
                        const referenceStorage = ref(fbStorage, 'figures/' + params.figureid);
                        const referenceDb = doc(fbFirestore, 'figures', params.figureid);
                        return [getDownloadURL(referenceStorage), getDoc(referenceDb)];
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
