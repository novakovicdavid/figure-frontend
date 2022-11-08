import {Button, Container, Nav, Navbar} from "react-bootstrap";
import {LinkContainer} from 'react-router-bootstrap'
import {fbAuth} from "../services/firebase";
import {useAuthContext} from "../contexts/authContext";
import {useState} from "react";
import {Upload} from "./Upload";

export function Header() {
    const {username, loading} = useAuthContext()
    const [activeLink, setActiveLink] = useState("");
    const [showUploadModal, setShowUploadModal] = useState(false);
    const [expanded, setExpanded] = useState(false);
    return (
        <Navbar bg="light" expand="md" collapseOnSelect={true} expanded={expanded}>
            <Container>
                <LinkContainer to={"/"} onClick={() => {
                    setActiveLink("none");
                    setExpanded(false);
                }}>
                    <Navbar.Brand>Figure</Navbar.Brand>
                </LinkContainer>
                <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={() => setExpanded(!expanded)}/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <LinkContainer to={"/browse"} onClick={() => {
                            setActiveLink("browse");
                            setExpanded(false);
                        }}
                                       active={activeLink === "browse"}>
                            <Nav.Link>Browse</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to={"/about"} onClick={() => {
                            setActiveLink("about");
                            setExpanded(false);
                        }}
                                       active={activeLink === "about"}>
                            <Nav.Link>About</Nav.Link>
                        </LinkContainer>
                    </Nav>
                    <Nav>
                        {
                            !loading && !username &&
                            <>
                                <LinkContainer to={"/login"} onClick={() => {
                                    setActiveLink("login");
                                    setExpanded(false);
                                }}
                                               active={activeLink === "login"} className={"me-3"}>
                                    <Nav.Link>Login</Nav.Link>
                                </LinkContainer>
                                <LinkContainer to={"/register"} onClick={() => {
                                    setActiveLink("register");
                                    setExpanded(false);
                                }}
                                               active={activeLink === "register"} className={"p-0"}>
                                    <Nav.Link>
                                        <Button>Sign up</Button>
                                    </Nav.Link>
                                </LinkContainer>
                            </>
                        }
                        {
                            username &&
                            <Nav.Link onClick={() => {
                                setActiveLink("upload");
                                setExpanded(false);
                                setShowUploadModal(true);
                            }}>
                                Upload
                            </Nav.Link>
                        }
                        {
                            username &&
                            <LinkContainer to={"/profile/" + username} onClick={() => {
                                setActiveLink("profile");
                                setExpanded(false);
                            }}
                                           active={activeLink === "profile"}>
                                <Nav.Link>Profile ({username})</Nav.Link>
                            </LinkContainer>
                        }
                        {
                            username &&
                            <Nav.Link onClick={() => {
                                fbAuth.signOut();
                                setExpanded(false);
                            }}>Logout</Nav.Link>
                        }
                    </Nav>
                </Navbar.Collapse>
                <Upload show={showUploadModal} setShow={setShowUploadModal}/>
            </Container>
        </Navbar>
    )
}