import {Register} from "../components/Register";
import {useAuthContext} from "../contexts/authContext";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";

export function RegisterPage() {
    const {user} = useAuthContext();
    const navigate = useNavigate();
    useEffect(() => {
        if (user) {
            navigate('/')
        }
    }, [navigate, user])
    return(
        <Register/>
    )
}