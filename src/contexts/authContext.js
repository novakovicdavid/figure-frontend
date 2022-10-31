import {createContext, useContext, useMemo} from "react";
import {useAuthState} from "react-firebase-hooks/auth";
import {fbAuth} from "../services/firebase";

const AuthContext = createContext(undefined);

export function AuthProvider(props) {
    const [user, loading] = useAuthState(fbAuth);

    const api = useMemo(() => ({
        user, loading
    }), [user, loading]);

    return <AuthContext.Provider value={api}>
        {props.children}
    </AuthContext.Provider>
}

export const useAuthContext = () => useContext(AuthContext);