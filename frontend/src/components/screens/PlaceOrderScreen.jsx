import { useEffect, useState } from "react"

import { useNavigate, Link } from "react-router-dom"

import { Button, Row, Col, ListGroup, Image, Card} from "react-bootstrap"

import { useDispatch, useSelector } from "react-redux"

import { createOrder } from "../../store/order"

import CheckoutSteps from "../CheckoutSteps";
import Message from "../Message";

import { cartActions } from "../../store/cart"
import { orderActions } from "../../store/order"

export default function PlaceOrderScreen() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const cart = useSelector(state => state.cart);
    const orderCreate = useSelector(state => state.order);

    const { order, error, success} = orderCreate;

    const itemsPrice = cart.cartItems.reduce((acc, item) => acc + (item.price * item.qty), 0).toFixed(2);
    const shippingPrice = (itemsPrice >= 100 ? +0 : +10).toFixed(2);
    const taxPrice = ((0.082) * itemsPrice).toFixed(2);
    const totalPrice = (+itemsPrice + +shippingPrice + +taxPrice).toFixed(2);

    if (!cart.paymentMethod) {
        navigate("/payment")
    }

    useEffect(() => {
        if (success) {
            navigate(`/order/${order._id}`)
            dispatch(cartActions.cartClearItems());
            dispatch(orderActions.orderReset());
        }
    }, [success, navigate, order, dispatch])

    const placeOrder = () => {
        dispatch(createOrder({
            orderItems: cart.cartItems,
            shippingAddress: cart.shippingAddress,
            paymentMethod: cart.paymentMethod,
            itemsPrice,
            shippingPrice,
            taxPrice,
            totalPrice
        }))
    }

    return (
        <div>
            <CheckoutSteps step1 step2 step3 step4/>

            <Row>
                <Col md={8}>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <h2>Shipping</h2>
                            <p>
                                <strong>Shipping: </strong>
                                {cart.shippingAddress.address}, {cart.shippingAddress.city} {cart.shippingAddress.postalCode}, {cart.shippingAddress.country}
                            </p>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Payment Method</h2>
                            <p>
                                <strong>Method: </strong>
                                {cart.paymentMethod}
                            </p>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Order Items</h2>
                            {cart.cartItems.length === 0 ? <Message variant="info">Your cart is empty</Message>: (
                                <ListGroup variant="flush">
                                    {cart.cartItems.map((item, index) => (
                                        <ListGroup.Item key={item.product}>
                                            <Row>
                                                <Col md={1}>
                                                    <Image src={item.image} alt={item.name} fluid rounded/>
                                                </Col>

                                                <Col>
                                                    <Link to={`/products/${item.product}`}>{item.name}</Link>
                                                </Col>

                                                <Col md={4}>
                                                    {item.qty} X ${item.price} = ${(item.qty * item.price).toFixed(2)}
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            )}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>

                <Col md={4}>
                <Card>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <h2>Order Summary</h2>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Row>
                                <Col >Item:</Col>
                                <Col>${itemsPrice}</Col>
                            </Row>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Row>
                                <Col >Shipping:</Col>
                                <Col>${shippingPrice}</Col>
                            </Row>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Row>
                                <Col >Tax:</Col>
                                <Col>${taxPrice}</Col>
                            </Row>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Row>
                                <Col >Total:</Col>
                                <Col>${totalPrice}</Col>
                            </Row>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            {error && <Message variant={"danger"}>{error}</Message>}
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Button type="button" className="btn-block w-100" disabled={cart.cartItems === 0} onClick={placeOrder}>
                                PlaceOrder
                            </Button>
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
                </Col>
            </Row>
        </div>
    )
}