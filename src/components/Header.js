import {Container, Nav, Navbar} from "react-bootstrap";
import {LinkContainer} from 'react-router-bootstrap'
import {fbAuth} from "../services/firebase";
import {useAuthContext} from "../contexts/authContext";
import {useState} from "react";
import {Upload} from "./Upload";

export function Header() {
    const {user, loading} = useAuthContext()
    const [activeLink, setActiveLink] = useState("");
    const [showUploadModal, setShowUploadModal] = useState(false);
    return (
        <Navbar bg="light" expand="md">
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
                            !loading && !user &&
                            <LinkContainer to={"/register"} onClick={() => setActiveLink("register")}
                                           active={activeLink === "register"}>
                                <Nav.Link>Sign up</Nav.Link>
                            </LinkContainer>

                        }
                        {
                            user &&
                            <Nav.Link onClick={() => {
                                setShowUploadModal(true);
                            }}>Upload</Nav.Link>
                        }
                        {
                            user &&
                            <LinkContainer to={"/profile/" + user.uid} onClick={() => setActiveLink("profile")}
                                           active={activeLink === "profile"}>
                                <Nav.Link>My Profile</Nav.Link>
                            </LinkContainer>
                        }
                        {
                            user &&
                            <Nav.Link onClick={() => fbAuth.signOut()}>Logout</Nav.Link>
                        }
                    </Nav>
                </Navbar.Collapse>
                <Upload show={showUploadModal} setShow={setShowUploadModal} key={Date.now()}/>
            </Container>
        </Navbar>
    )
}