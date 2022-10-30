import {Container, Nav, Navbar} from "react-bootstrap";
import {LinkContainer} from 'react-router-bootstrap'
import {useAuthState} from "react-firebase-hooks/auth";
import {fbAuth} from "../services/firebase";

export function Header(props) {
    const [user, loading, error] = useAuthState(fbAuth);
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
                        {
                            !loading && !user &&
                            <LinkContainer to={"/register"}>
                                <Nav.Link>Sign up</Nav.Link>
                            </LinkContainer>

                        }
                        {
                            user &&
                            <LinkContainer to={"/profile"}>
                                <Nav.Link>My Profile ({user.displayName || user.email})</Nav.Link>
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