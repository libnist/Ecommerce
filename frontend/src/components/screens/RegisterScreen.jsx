import { useState, useEffect } from "react"

import { Link, useNavigate } from "react-router-dom"

import { Form, Button, Row, Col } from "react-bootstrap"

import { useDispatch, useSelector } from "react-redux"

import { register } from "../../store/user"

import Loader from "../Loader"
import Message from "../Message"
import FormContainer from "../FormContainer";

export default function RegisterScreen() {

    const navigate = useNavigate();

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [message, setMessage] = useState("")


    const userLogin = useSelector(state => state.user);

    const dispatch = useDispatch();


    const { error, loading, userInfo } = userLogin;

    useEffect(() => {
        if (userInfo) {
            navigate("/")
        }
    }, [userInfo, navigate])

    const submitHandler = (e) => {
        e.preventDefault();

        if (password != confirmPassword) {
            setMessage("Passwords do not match")

        } else {

            dispatch(register({ name, email, password }))
        }


    }

    return (
        <FormContainer>
            <h1>Register</h1>
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
                    <Form.Control type="password" required placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)}></Form.Control>
                </Form.Group>

                <Form.Group controlId="confirm-password">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control type="password" required placeholder="Confirm password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}></Form.Control>
                </Form.Group>

                <Button variant="primary" type="submit" className="mt-3">Register</Button>
            </Form>

            <Row className="py-3">
                <Col>
                    Have an account? <Link to="/login">Login</Link>
                </Col>
            </Row>
        </FormContainer>
    )
}