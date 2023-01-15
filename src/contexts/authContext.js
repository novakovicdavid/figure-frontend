import {createContext, useContext, useMemo, useState} from "react";
import {backend} from "../services/backend";


const AuthContext = createContext(undefined);

export function AuthProvider(props) {
    const [profile, setProfile] = useState(undefined);

    useMemo(() => {
        // Get profile from storage if user is possibly logged in
        const profileFromStorage = JSON.parse(localStorage.getItem("profile"));
        if (profileFromStorage) setProfile(profileFromStorage);
        // Get profile from session cookie
        backend.loadSession().then((result) => {
            if (result.profile) {
                setProfile(result.profile);
                localStorage.setItem("profile", JSON.stringify(result.profile));
            } else {
                if (result.error === "no-session-found" || result.error === "no-session-received") {
                    // Session cookie is invalid, invalidate cached profile
                    setProfile(undefined);
                    localStorage.removeItem("profile");
                }
            }
        });
    }, []);

    const setNewProfile = (newProfile) => {
        localStorage.setItem("profile", JSON.stringify(newProfile));
        setProfile(newProfile);
    }

    const logout = () => {
        backend.invalidateSession().then((result) => {
            setProfile(undefined);
            localStorage.removeItem("profile");
            if (result.error === "unknown-error") {
                // TODO show dialog that something went wrong during sign out
            }
        });
    }

    const api = useMemo(() => ({
        profile, setNewProfile, logout
    }), [profile]);

    return <AuthContext.Provider value={api}>
        {props.children}
    </AuthContext.Provider>
}

export const useAuthContext = () => useContext(AuthContext);