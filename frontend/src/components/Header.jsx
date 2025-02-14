import { Container, Navbar, Nav, NavDropdown } from "react-bootstrap"
import { Link } from "react-router-dom"

import { useDispatch, useSelector } from "react-redux"

import { userActions } from "../store/user";
import { myOrdersActions } from "../store/myOrders";
import { usersActions } from "../store/users";


export default function Header() {

    const { userInfo } = useSelector(state => state.user);

    const dispatch = useDispatch();

    const logoutHandler = () => {
        dispatch(userActions.logout());
        dispatch(myOrdersActions.myOrdersReset());
        dispatch(usersActions.usersReset());
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

                            {userInfo && userInfo.isAdmin && (
                                <NavDropdown title="Admin" id="adminmenu">
                                    <NavDropdown.Item as={Link} to="/admin/userlist">Users</NavDropdown.Item>
                                    <NavDropdown.Item as={Link} to="/admin/productlist">Products</NavDropdown.Item>
                                    <NavDropdown.Item as={Link} to="/admin/orderlist">Orders</NavDropdown.Item>




                                </NavDropdown>)}

                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}