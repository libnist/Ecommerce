import { useEffect, useState } from "react"

import { useNavigate, Link, useParams } from "react-router-dom"

import { Button, Row, Col, ListGroup, Image, Card } from "react-bootstrap"

import { useDispatch, useSelector } from "react-redux"

import Message from "../Message";
import Loader from "../Loader";

import { getOrderDetails } from "../../store/orderDetails"
import { deliverOrderActions, deliverOrder} from "../../store/deliverOrder";

export default function OrderScreen() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();

    const orderId = params.id;
    const cart = useSelector(state => state.cart);
    const orderDetails = useSelector(state => state.orderDetails);

    const { order, error, loading } = orderDetails;

    const {loading: deliverLoading, success: deliverSuccess, error: delvierError} = useSelector(state => state.deliverOrder);

    const {userInfo} = useSelector(state => state.user);
    const isUserAdmin = userInfo.isAdmin;

    let itemsPrice;
    if (!loading && !error && order.orderItems) {
        itemsPrice = order.orderItems.reduce((acc, item) => acc + (item.price * item.qty), 0).toFixed(2);
    }


    if (!cart.paymentMethod) {
        navigate("/payment")
    }

    useEffect(() => {

        if (!userInfo) {
            navigate("/login")
        }

        if (!order.orderItems || order._id !== Number(orderId) || deliverSuccess) {
            dispatch(getOrderDetails(orderId))
            dispatch(deliverOrderActions.delvierOrderReset())
        }
    }, [orderId, dispatch, order, deliverSuccess, navigate, userInfo]);

    const deliverHandler = () => {
        dispatch(deliverOrder(order._id))
    }

    if (!order.orderItems || loading) {
        return (
            <Loader/>
        )
    }

    if (error) {
        return (
            <Message variant="danger">{error}</Message>
        )
    }

    return (
        <div>
            <h1>Order: {orderId}</h1>
            <Row>
                <Col md={8}>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <h2>Shipping</h2>
                            <div>
                                <strong>Shipping: </strong>
                                <p><strong>Name: </strong>{order.user.name}</p>
                                <p><strong>Email: </strong><a href={`mailto:${order.user.email}`}>{order.user.email}</a></p>

                                {order.shippingAddress.address}, {order.shippingAddress.city} {order.shippingAddress.postalCode}, {order.shippingAddress.country}
                            </div>

                            {order.isDelivered ? (<Message variant="success">Delivered on {order.deliveredAt}</Message>) : (<Message variant="warning">Not Delivered</Message>)}
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Payment Method</h2>
                            <p>
                                <strong>Method: </strong>
                                {order.paymentMethod}
                            </p>
                            {order.isPaid ? (<Message variant="success">Paid on {order.paidAt}</Message>) : (<Message variant="warning">Not Paid</Message>)}
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Order Items</h2>
                            {order.orderItems.length === 0 ? <Message variant="info">Your cart is empty</Message> : (
                                <ListGroup variant="flush">
                                    {order.orderItems.map((item) => (
                                        <ListGroup.Item key={item.product}>
                                            <Row>
                                                <Col md={1}>
                                                    <Image src={item.image} alt={item.name} fluid rounded />
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
                                    <Col>${order.shippingPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col >Tax:</Col>
                                    <Col>${order.taxPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col >Total:</Col>
                                    <Col>${order.totalPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                {error && <Message variant={"danger"}>{error}</Message>}
                            </ListGroup.Item>
                            {deliverLoading && <Loader/>}
                            {delvierError && <Message variant={"danger"}>{delvierError}</Message>}
                            {isUserAdmin && userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                                <ListGroup.Item>
                                    <Button type="button" className="btn btn-block w-100" onClick={deliverHandler}>Mark as delivered</Button>
                                </ListGroup.Item>
                            )}
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}