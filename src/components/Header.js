import {Button, Container, Nav, Navbar} from "react-bootstrap";
import {LinkContainer} from 'react-router-bootstrap'
import {useAuthContext} from "../contexts/authContext";
import {useState} from "react";
import {Upload} from "./Upload";

export function Header() {
    const {profile, logout} = useAuthContext();
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
                    </Nav>
                    <Nav>
                        {
                            !profile &&
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
                            profile &&
                            <Nav.Link onClick={() => {
                                setActiveLink("upload");
                                setExpanded(false);
                                setShowUploadModal(true);
                            }}>
                                Upload
                            </Nav.Link>
                        }
                        {
                            profile &&
                            <LinkContainer to={"/profile/" + profile.id} onClick={() => {
                                setActiveLink("profile");
                                setExpanded(false);
                            }}
                                           active={activeLink === "profile"}>
                                <Nav.Link>Profile ({profile.username})</Nav.Link>
                            </LinkContainer>
                        }
                        {
                            profile &&
                            <Nav.Link onClick={() => {
                                logout();
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