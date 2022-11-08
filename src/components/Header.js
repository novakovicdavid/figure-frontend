import {Container, Nav, Navbar} from "react-bootstrap";
import {LinkContainer} from 'react-router-bootstrap'
import {fbAuth} from "../services/firebase";
import {useAuthContext} from "../contexts/authContext";
import {useState} from "react";
import {Upload} from "./Upload";

export function Header() {
    const {username, loading} = useAuthContext()
    const [activeLink, setActiveLink] = useState("");
    const [showUploadModal, setShowUploadModal] = useState(false);
    return (
        <Navbar bg="light" expand="md" collapseOnSelect={true}>
            <Container>
                <LinkContainer to={"/"} onClick={() => setActiveLink("none")}>
                    <Navbar.Brand>Figure</Navbar.Brand>
                </LinkContainer>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <LinkContainer to={"/browse"} onClick={() => setActiveLink("browse")}
                                       active={activeLink === "browse"}>
                            <Nav.Link>Browse</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to={"/about"} onClick={() => setActiveLink("about")}
                                       active={activeLink === "about"}>
                            <Nav.Link>About</Nav.Link>
                        </LinkContainer>
                    </Nav>
                    <Nav>
                        {
                            !loading && !username &&
                            <>
                                <LinkContainer to={"/login"} onClick={() => setActiveLink("login")}
                                               active={activeLink === "login"}>
                                    <Nav.Link>Login</Nav.Link>
                                </LinkContainer>
                                <LinkContainer to={"/register"} onClick={() => setActiveLink("register")}
                                               active={activeLink === "register"}>
                                    <Nav.Link>Sign up</Nav.Link>
                                </LinkContainer>
                            </>
                        }
                        {
                            username &&
                            <Nav.Link onClick={() => {
                                setShowUploadModal(true);
                            }}>Upload</Nav.Link>
                        }
                        {
                            username &&
                            <LinkContainer to={"/profile/" + username} onClick={() => setActiveLink("profile")}
                                           active={activeLink === "profile"}>
                                <Nav.Link>My Profile</Nav.Link>
                            </LinkContainer>
                        }
                        {
                            username &&
                            <Nav.Link onClick={() => fbAuth.signOut()}>Logout</Nav.Link>
                        }
                    </Nav>
                </Navbar.Collapse>
                <Upload show={showUploadModal} setShow={setShowUploadModal}/>
            </Container>
        </Navbar>
    )
}