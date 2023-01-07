import {createContext, useContext, useMemo, useState} from "react";
import {getCookie} from "../utilities/cookies";
import {backend} from "../services/backend";

const AuthContext = createContext(undefined);



export function AuthProvider(props) {
    useMemo(() => {
        const session_id_cookie = getCookie("session_id");
        if (!session_id_cookie) return;

        backend.load_session().then((result) => {
            if (result.profile) {
                setProfile(result.profile);
                setSessionId(session_id_cookie);
            }
            else {
                if (result.error === "invalid-session-id") setSessionId(undefined);
            }
        });
    }, [])

    const [profile, setProfile] = useState(undefined);
    const [, setSessionId] = useState(undefined);

    const signout = () => {
        backend.invalidate_session().then((result) => {
            setSessionId(undefined);
            setProfile(undefined);
            if (result.error === "unknown-error") {
                // TODO show dialog that something went wrong during sign out
            }
        });
    }

    const api = useMemo(() => ({
        profile, setProfile, setSessionId, signout
    }), [profile]);

    return <AuthContext.Provider value={api}>
        {props.children}
    </AuthContext.Provider>
}

export const useAuthContext = () => useContext(AuthContext);