import {Login} from "../components/Login";
import {useAuthContext} from "../contexts/authContext";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";

export function LoginPage() {
    const {username} = useAuthContext();
    const navigate = useNavigate();
    useEffect(() => {
        if (username) {
            navigate('/profile/' + username)
        }
    }, [username])
    return(
        <Login/>
    )
}