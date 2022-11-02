import {Container, Nav, Navbar} from "react-bootstrap";
import {LinkContainer} from 'react-router-bootstrap'
import {fbAuth} from "../services/firebase";
import {useAuthContext} from "../contexts/authContext";

export function Header() {
    const {user, loading} = useAuthContext()
    return (
        <Navbar bg="light" expand="md">
            <Container>
                <LinkContainer to={"/"}><Navbar.Brand>Figure</Navbar.Brand></LinkContainer>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <LinkContainer to={"/browse"}>
                            <Nav.Link>Browse</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to={"/about"}>
                            <Nav.Link>About</Nav.Link>
                        </LinkContainer>
                    </Nav>
                    <Nav>
                        {
                            !loading && !user &&
                            <LinkContainer to={"/register"}>
                                <Nav.Link>Sign up</Nav.Link>
                            </LinkContainer>

                        }
                        {
                            user &&
                            <LinkContainer to={"/upload"}>
                                <Nav.Link>Upload</Nav.Link>
                            </LinkContainer>
                        }
                        {
                            user &&
                            <LinkContainer to={"/profile/" + user.uid}>
                                <Nav.Link>My Profile</Nav.Link>
                            </LinkContainer>
                        }
                        {
                            user &&
                            <Nav.Link onClick={() => fbAuth.signOut()}>Logout</Nav.Link>
                        }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}