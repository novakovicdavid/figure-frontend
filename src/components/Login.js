import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {Alert, Button, Form, Row, Spinner} from "react-bootstrap";
import {signInWithEmailAndPassword} from "firebase/auth";
import {fbAuth} from "../services/firebase";
import {useAuthContext} from "../contexts/authContext";

function handleLogin(email, password, setSigningIn, setUseruid, setError) {
    if (!email || !password) return;
    setSigningIn(true);
    signInWithEmailAndPassword(fbAuth, email, password)
        .then((userCreds) => {
            setUseruid(userCreds.user.uid);
        })
        .catch((error) => {
            if (error.message.includes("invalid-email")) setError("Invalid email.");
            else if (error.message.includes("user-not-found")) setError("No user found with matching email.");
            else if (error.message.includes("wrong-password")) setError("Wrong password.");
            else setError(error.message);
        });
}

export function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [validated, setValidated] = useState(false);
    const [signingIn, setSigningIn] = useState(false);
    const [useruid, setUseruid] = useState(undefined);
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const {username} = useAuthContext();

    useEffect(() => {
        if (useruid && username) navigate("/profile/" + username);
    }, [useruid, username]);

    useEffect(() => {
        if (error.length > 0) setSigningIn(false);
    }, [error])

    return (
        <Row className={"ms-sm-auto me-sm-auto mb-auto ms-3 me-3 mt-4 border rounded p-3"}>
            <Form noValidate validated={validated} onSubmit={(e) => {
                e.preventDefault();
                setError("");
                setValidated(true);
                handleLogin(email, password, setSigningIn, setUseruid, setError);
            }}>
                <Form.Group controlId={"title"} className={"mb-3"}>
                    <Form.Label>Email:</Form.Label>
                    <Form.Control type={"text"} value={email} onChange={(e) => setEmail(e.target.value)} required/>
                    <Form.Control.Feedback type={"invalid"}>Please provide your email.</Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId={"description"} className={"mb-3"}>
                    <Form.Label>Password:</Form.Label>
                    <Form.Control type={"password"} value={password} onChange={(e) => setPassword(e.target.value)}
                                  required/>
                    <Form.Control.Feedback type={"invalid"}>Please provide your password.</Form.Control.Feedback>
                </Form.Group>
                <Button variant="primary" type="submit" disabled={signingIn}>
                    {
                        signingIn &&
                        <Spinner as={"span"} animation={"border"} size={"sm"} className={"me-1"}/>
                    }
                    {signingIn ? "Signing in..." : "Sign in"}
                </Button>
                {
                    error.length > 0 &&
                    <Alert className={"mt-3"} variant={"danger"}>{error}</Alert>
                }
            </Form>
        </Row>
    )
}