import { Nav } from "react-bootstrap"
import { Link } from "react-router-dom"

export default function CheckoutSteps({ step1 , step2, step3, step4}) {
    return (
        <Nav className="justify-content-center mb-4">
            <Nav.Item>
                <Nav.Link as={Link} disabled={!step1} to="/login">Login</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link as={Link} disabled={!step2} to="/shipping">Shipping</Nav.Link>
            </Nav.Item>

            <Nav.Item>
                <Nav.Link as={Link} disabled={!step3} to="/payment">Payment</Nav.Link>
            </Nav.Item>

            <Nav.Item>
                <Nav.Link as={Link} disabled={!step4} to="/placeorder">PlaceOrder</Nav.Link>
            </Nav.Item>
        </Nav>
    )
}