import { Container, Navbar, Nav } from "react-bootstrap"
import { Link } from "react-router-dom"

export default function Header() {
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
                            <Nav.Link as={Link} to="/login"><i className="fas fa-user"></i>Login</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}