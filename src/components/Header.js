import {Button, Container, Nav, Navbar} from "react-bootstrap";
import {LinkContainer} from 'react-router-bootstrap'
import {useAuthContext} from "../contexts/authContext";
import {useEffect, useState} from "react";
import {CreateFigureModal} from "./CreateFigureModal";
import {useNavigate} from "react-router-dom";

export function Header() {
    const {profile, logout} = useAuthContext();
    const [activeLink, setActiveLink] = useState("");
    const [showUploadModal, setShowUploadModal] = useState(false);
    const [expanded, setExpanded] = useState(false);
    const [className, setClassName] = useState("");

    const navigate = useNavigate();
    useEffect(() => {
        if (window.location.pathname === "/about") setClassName("about-darken");
        else setClassName("");
    }, [navigate]);

    return (
        <Navbar expand="md" collapseOnSelect={true} expanded={expanded} className={className}>
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
                <CreateFigureModal show={showUploadModal} setShow={setShowUploadModal}/>
            </Container>
        </Navbar>
    )
}