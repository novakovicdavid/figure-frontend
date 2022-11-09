import {Login} from "../components/Login";
import {useAuthContext} from "../contexts/authContext";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";

export function LoginPage() {
    const {user} = useAuthContext();
    const navigate = useNavigate();
    useEffect(() => {
        if (user) {
            navigate('/')
        }
    }, [user])
    return(
        <Login/>
    )
}