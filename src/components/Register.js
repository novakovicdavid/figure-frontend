import {Alert, Button, Form, Row, Spinner} from "react-bootstrap";
import {useEffect, useState} from "react";
import {fbAuth, fbFirestore} from "../services/firebase";
import {useNavigate} from "react-router-dom";
import {addDoc, collection, getDocs, query, where} from "firebase/firestore";
import {createUserWithEmailAndPassword} from "firebase/auth";


function CheckIsUsernameTaken(username) {
    const q = query(collection(fbFirestore, "users"), where('username', '==', username));
    return getDocs(q).then((snapshot) => {
        return snapshot.docs.length > 0;
    })
}

function handleRegister(username, email, password, setCreatingAccount, setUseruid, setError) {
    if (!username || !email || !password) return;
    if (!username.match(/^[a-zA-Z\-]+$/)) {
        setError("Username is not valid. Only the characters A-Z, a-z and '-' are accepted.");
        return;
    }
    setCreatingAccount(true);
    CheckIsUsernameTaken(username).then((isUsernameTaken) => {
        if (!isUsernameTaken) {
            createUserWithEmailAndPassword(fbAuth, email, password)
                .then((userCreds) => {
                    const useruid = userCreds.user.uid;
                    addDoc(collection(fbFirestore, "users"), {
                        username: username,
                        uuid: useruid
                    }).then(() => {
                        setUseruid(useruid);
                    })
                })
                .catch((error) => {
                    if (error.message.includes("already-in-use")) setError("Email already taken.");
                    else setError(error.message);
                });
        } else {
            setError("Username already taken.");
        }
    });
}

export function Register() {
    const [username, setUsername] = useState(undefined)
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [validated, setValidated] = useState(false);
    const [creatingAccount, setCreatingAccount] = useState(false);
    const [useruid, setUseruid] = useState(undefined);
    const [error, setError] = useState("");
    const navigate = useNavigate();
    useEffect(() => {
        if (useruid) navigate("/profile/" + useruid);
    }, [useruid]);

    useEffect(() => {
        if (error.length > 0) setCreatingAccount(false);
    }, [error])

    return (
        <Row className={"ms-sm-auto me-sm-auto mb-auto ms-3 me-3 mt-4 border rounded p-3"}>
            <Form noValidate validated={validated} onSubmit={(e) => {
                e.preventDefault();
                setError("");
                setValidated(true);
                handleRegister(username, email, password, setCreatingAccount, setUseruid, setError);
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