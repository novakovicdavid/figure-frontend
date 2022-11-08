import {createContext, useContext, useEffect, useMemo, useState} from "react";
import {useAuthState} from "react-firebase-hooks/auth";
import {fbAuth, fbFirestore} from "../services/firebase";
import {collection, getDocs, query, where} from "firebase/firestore";

const AuthContext = createContext(undefined);

export function AuthProvider(props) {
    const [user, loading] = useAuthState(fbAuth);
    const [username, setUsername] = useState();
    useEffect(() => {
        if (user) {
            const q = query(collection(fbFirestore, 'users'), where("uuid", "==", user.uid));
            getDocs(q)
                .then((snapshot) => {
                    setUsername(snapshot.docs[0].data().username);
                });
        }
        else setUsername(undefined);
    }, [user])

    const api = useMemo(() => ({
        user, username, loading
    }), [user, username, loading]);

    return <AuthContext.Provider value={api}>
        {props.children}
    </AuthContext.Provider>
}

export const useAuthContext = () => useContext(AuthContext);