import {Alert, Button, Form, Row, Spinner} from "react-bootstrap";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useAuthContext} from "../contexts/authContext";
import {backend} from "../services/backend";

function handleRegister(username, email, password, setCreatingAccount, setProfile, setError) {
    if (!username || !email || !password) return;
    if (!username.match(/^[a-zA-Z-]+$/)) {
        setError("Username is not valid. Only the characters A-Z, a-z and '-' are accepted.");
        return;
    }
    // setCreatingAccount(true);
    backend.signup(email, password, username)
        .then((result) => {
            console.log(result);
            if (result.profile) setProfile(result.profile);
            else setError(result.error);
        });
}

export function Register() {
    const [username, setUsername] = useState(undefined)
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [validated, setValidated] = useState(false);
    const [creatingAccount, setCreatingAccount] = useState(false);
    const {profile, setProfile} = useAuthContext();
    const [error, setError] = useState("");
    const navigate = useNavigate();
    console.log("error:", error)
    useEffect(() => {
        if (profile) navigate("/profile/" + profile.id);
    }, [navigate, profile]);

    useEffect(() => {
        if (error.length > 0) setCreatingAccount(false);
    }, [error])

    return (
        <Row className={"ms-sm-auto me-sm-auto mb-auto ms-3 me-3 mt-4 border rounded p-3"}>
            <Form noValidate validated={validated} onSubmit={(e) => {
                e.preventDefault();
                setError("");
                setValidated(true);
                handleRegister(username, email, password, setCreatingAccount, setProfile, setError);
            }}>
                <Form.Group controlId={"title"} className={"mb-3"}>
                    <Form.Label>Username:</Form.Label>
                    <Form.Control type={"text"} placeholder={"john-doe"} onChange={(e) => setUsername(e.target.value)} required/>
                    <Form.Control.Feedback type={"invalid"}>Please provide a username.</Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId={"title"} className={"mb-3"}>
                    <Form.Label>Email:</Form.Label>
                    <Form.Control type={"text"} placeholder={"john@doe.com"} value={email} onChange={(e) => setEmail(e.target.value)} required/>
                    <Form.Control.Feedback type={"invalid"}>Please provide an email.</Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId={"description"} className={"mb-3"}>
                    <Form.Label>Password:</Form.Label>
                    <Form.Control type={"password"} placeholder={"******"} value={password} onChange={(e) => setPassword(e.target.value)}
                                  required/>
                    <Form.Control.Feedback type={"invalid"}>Please provide a password.</Form.Control.Feedback>
                </Form.Group>
                <Button variant="primary" type="submit" disabled={creatingAccount}>
                    {
                        creatingAccount &&
                        <Spinner as={"span"} animation={"border"} size={"sm"} className={"me-1"}/>
                    }
                    {creatingAccount ? "Creating Account..." : "Create Account"}
                </Button>
                {
                    error.length > 0 &&
                    <Alert className={"mt-3"} variant={"danger"}>{error}</Alert>
                }
            </Form>
        </Row>
    )
}