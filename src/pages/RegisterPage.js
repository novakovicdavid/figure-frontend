import 'firebaseui/dist/firebaseui.css'
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
    }, [user])
    return(
        <Register/>
    )
}