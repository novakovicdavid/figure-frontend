import firebase from 'firebase/compat/app';
import 'firebaseui/dist/firebaseui.css'
import {fbAuth} from "../services/firebase";
import StyledFirebaseAuth from "../components/StyledFirebaseAuth.tsx";
import {useNavigate} from "react-router-dom";

export function Register() {
    const navigate = useNavigate();
    return(
        <StyledFirebaseAuth firebaseAuth={fbAuth} uiConfig={{
            signInOptions: [
                {
                    provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
                    requireDisplayName: true
                }
            ],
            callbacks: {
                signInSuccessWithAuthResult() {
                    navigate("/home");
                }
            }
        }}/>
    )
}