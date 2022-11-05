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
import {collection, query, orderBy, limit, getDocs, where} from "firebase/firestore";
import {useMemo} from "react";


function App() {
    const Layout = () => (
        <AuthProvider>
            <Header/>
            <Outlet/>
        </AuthProvider>
    );

    const limitOfNewItems = 1;

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
                        const q = query(collection(fbFirestore, 'figures'), where('user', '==', params.useruid), queryOrder, queryMaxItems);
                        const docs = getDocs(q).then((querySnapshot) => {
                            return Promise.all(querySnapshot.docs.map(async (doc) => {
                                const referenceStorage = ref(fbStorage, 'figures/' + doc.id);
                                doc.url = await getDownloadURL(referenceStorage);
                                return doc;
                            }));
                        });
                        return defer({docs: docs})
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
