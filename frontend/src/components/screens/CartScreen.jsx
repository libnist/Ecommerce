import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useParams, useSearchParams, useNavigate } from "react-router-dom"
import { Row, Col, ListGroup, Image, Form, Button, Card } from "react-bootstrap";

import Message from "../Message";

import { addToCartAction, removeFromCart } from "../../store/cart";

export default function CartScreen() {

    const params = useParams();
    const [searchParams] = useSearchParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const productId = params.id;
    const qty = +searchParams.get("qty");

    const cart = useSelector(state => state.cart.cartItems);


    useEffect(() => {
        if (productId) {
            dispatch(addToCartAction(productId, qty))
        }
    }, [productId, dispatch, qty])

    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id))
    }

    const checkoutHandler = () => {
        navigate("/shipping")
    }

    return (
        <Row>
            <Col md={8}>
                <h1>Shopping Cart</h1>
                {cart.length === 0 ? (
                    <Message variant="info">Your cart is empty <Link to="/">Go back</Link></Message>
                ) : (
                    <ListGroup variant="flush">
                        {cart.map(item => (
                            <ListGroup.Item key={item.product}>
                                <Row>
                                    <Col md={2}>
                                        <Image src={item.image} alt={item.name} fluid rounded />
                                    </Col>

                                    <Col md={3}>
                                        <Link to={`/products/${item.product}`}>{item.name}</Link>
                                    </Col>

                                    <Col md={2}>
                                        ${item.price}
                                    </Col>

                                    <Col md={3}>
                                        <Form.Control as="select" value={item.qty} onChange={(e) => dispatch(addToCartAction(item.product, +e.target.value))}>
                                            {
                                                [...Array(item.countInStock).keys()].map((x) => (
                                                    <option value={x + 1} key={x + 1}>
                                                        {x + 1}
                                                    </option>
                                                ))
                                            }
                                        </Form.Control>
                                    </Col>

                                    <Col md={1}>
                                            <Button type="button" variant="light" onClick={() => removeFromCartHandler(+item.product)}>
                                                <i className="fas fa-trash"></i>
                                            </Button>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                )}
            </Col>

            <Col md={4}>

                <Card>
                    <ListGroup vairant="flush">
                        <ListGroup.Item>
                            <h2>Subtotal ({cart.reduce((acc, item) => item.qty + acc, 0)}) items</h2>
                            ${cart.reduce((acc, item) => item.price * item.qty + acc, 0).toFixed(2)}
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Button type="button" className="w-100" disabled={cart.length === 0} onClick={checkoutHandler}>Proceed To CHECKOUT</Button>
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
            
            </Col>
        </Row>
    )
}