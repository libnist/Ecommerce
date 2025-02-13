import { useState, useEffect } from "react"

import { Link, useNavigate } from "react-router-dom"

import { Form, Button, Row, Col, Table } from "react-bootstrap"

import { useDispatch, useSelector } from "react-redux"

import { update } from "../../store/user"
import { listMyOrders } from "../../store/myOrders";
import Loader from "../Loader"
import Message from "../Message"

export default function ProfileScreen() {
    const navigate = useNavigate();

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [message, setMessage] = useState("")


    const { error, loading, userInfo } = useSelector(state => state.user);
    const { error: myOrdersError, loading: myOrdersLoading, orders} = useSelector(state => state.myOrders)

    const dispatch = useDispatch();

    useEffect(() => {
        if (userInfo) {
            setName(userInfo.name)
            setEmail(userInfo.email)
            setPassword("")
            setConfirmPassword("")
            dispatch(listMyOrders())
        } else {
            navigate("/login")
        }
    }, [userInfo, navigate, dispatch])

    const submitHandler = (e) => {
        e.preventDefault();

        if (password != confirmPassword) {
            setMessage("Passwords do not match")

        } else {

            dispatch(update({name, email, password}))
        }


    }
    return (
        <Row>
            <Col md={3}>
                <h2>User Profile</h2>
                {message && <Message variant="danger">{message}</Message>}

                {error && <Message variant="danger">{error}</Message>}
                {loading && <Loader />}

                <Form onSubmit={submitHandler}>
                    <Form.Group controlId="name">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="name" required placeholder="Enter name" value={name} onChange={(e) => setName(e.target.value)}></Form.Control>
                    </Form.Group>

                    <Form.Group controlId="email">
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control type="email" required placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)}></Form.Control>
                    </Form.Group>

                    <Form.Group controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)}></Form.Control>
                    </Form.Group>

                    <Form.Group controlId="confirm-password">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control type="password" placeholder="Confirm password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}></Form.Control>
                    </Form.Group>

                    <Button variant="primary" type="submit" className="mt-3">Update</Button>
                </Form>
            </Col>

            <Col md={9}>
                <h2>My Orders</h2>
                {myOrdersLoading ? (
                    <Loader/>
                ) : myOrdersError ? (
                    <Message variant="danger">{myOrdersError}</Message>
                ) : (
                    <Table striped responsive className="table-sm">

                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Date</th>
                                <th>Total</th>
                                <th>Paid</th>
                                <th>Delivered</th>
                                <th></th>
                            </tr>
                        </thead>

                        <tbody>
                            {orders.map(order => (
                                <tr key={order._id}>
                                    <td>{order._id}</td>
                                    <td>{order.createdAt.substring(0, 10)}</td>
                                    <td>${order.totalPrice}</td>
                                    <td>{order.isPaid ? order.paidAt.substring(0, 10) : <i className="fas fa-times" style={{color: "red"}}></i>}</td>
                                    <td>{order.deliveredAt ? order.deliveredAt.substring(0, 10) : <i className="fas fa-times" style={{color: "red"}}></i>}</td>
                                    <td>
                                        <Link to={`/order/${order._id}`}>
                                            <Button className="btn-sm">Details</Button>
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>

                    </Table>
                )}
            </Col>
        </Row>
    )
}