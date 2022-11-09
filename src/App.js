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
import {ref, getDownloadURL} from "firebase/storage";
import {fbFirestore, fbStorage} from "./services/firebase";
import {doc, getDoc, getCountFromServer} from "firebase/firestore";
import {collection, orderBy, limit} from "firebase/firestore";
import {useMemo} from "react";
import {fetchFirstFigures} from "./utilities/FigureFetching";
import {Footer} from "./components/Footer";


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

    const limitOfNewItems = 3;

    const collectionRef = useMemo(() =>
        collection(fbFirestore, 'figures'), [])
    const queryOrder = useMemo(() =>
        orderBy('creation', 'desc'), [])
    const queryMaxItems = useMemo(() =>
        limit(limitOfNewItems), [])

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
                    path: "/profile/:username",
                    element: <BrowsePage collectionRef={collectionRef} queryOrder={queryOrder}
                                         queryMaxItems={queryMaxItems} limitOfNewItems={limitOfNewItems}/>,
                    loader: ({params}) => {
                        return defer({docs: fetchFirstFigures(queryOrder, queryMaxItems, params.username)})
                    }
                },
                {
                    path: "/browse",
                    element: <BrowsePage collectionRef={collectionRef} queryOrder={queryOrder}
                                         queryMaxItems={queryMaxItems} limitOfNewItems={limitOfNewItems}/>,
                    loader: () => {
                        return defer({docs: fetchFirstFigures(queryOrder, queryMaxItems)})
                    }
                },
                {
                    path: "/figure/:figureid",
                    element: <FigurePage/>,
                    loader: ({params}) => {
                        const referenceStorage = ref(fbStorage, 'figures/' + params.figureid);
                        const referenceDb = doc(fbFirestore, 'figures', params.figureid);
                        return defer({
                            urlPromise: getDownloadURL(referenceStorage),
                            docPromise: getDoc(referenceDb)
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
