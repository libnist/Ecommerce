import { Container, Navbar, Nav, NavDropdown } from "react-bootstrap"
import { Link } from "react-router-dom"

import { useDispatch, useSelector } from "react-redux"

import { userActions } from "../store/user";


export default function Header() {

    const { userInfo } = useSelector(state => state.user);

    const dispatch = useDispatch();

    const logoutHandler = () => {
        dispatch(userActions.logout())
    }

    return (
        <header>
            <Navbar expand="lg" bg="dark" variant="dark" collapseOnSelect>
                <Container>
                    <Navbar.Brand as={Link} to="/">Your Shop</Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav
                            className="me-auto my-2 my-lg-0"
                            style={{ maxHeight: '100px' }}
                            navbarScroll
                        >
                            <Nav.Link as={Link} to="/cart"><i className="fas fa-shopping-cart"></i>Cart</Nav.Link>

                            {userInfo ? (
                                <NavDropdown title={userInfo.name} id="username">
                                    <NavDropdown.Item as={Link} to="/profile"><i className="fas fa-user"></i>Profile</NavDropdown.Item>
                                    <NavDropdown.Item onClick={logoutHandler}><i className="fas fa-user"></i>Logout</NavDropdown.Item>

                                </NavDropdown>
                            ) :
                                <Nav.Link as={Link} to="/login"><i className="fas fa-user"></i>Login</Nav.Link>
                            }

                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}