import { useState, useEffect } from "react"

import { Link, useSearchParams, useNavigate, useLocation } from "react-router-dom"

import { Form, Button, Row, Col } from "react-bootstrap"

import { useDispatch, useSelector } from "react-redux"

import { login } from "../../store/user"

import Loader from "../Loader"
import Message from "../Message"
import FormContainer from "../FormContainer";

export default function LoginScreen() {
    
    const navigate = useNavigate();

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const userLogin = useSelector(state => state.user);

    const dispatch = useDispatch();


    const {error, loading, userInfo} = userLogin;

    useEffect(() => {
        if (userInfo) {
            navigate("/")
        }
    }, [userInfo, navigate])

    const submitHandler = (e) => {
        e.preventDefault();

        dispatch(login(email, password))

    }

    return (
        <FormContainer>
            <h1>Sign In</h1>
            {error && <Message variant="danger">{error}</Message>}
            {loading && <Loader/>}

            <Form onSubmit={submitHandler}>
                <Form.Group controlId="email">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control type="email" required placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)}></Form.Control>
                </Form.Group>

                <Form.Group controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" required placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)}></Form.Control>
                </Form.Group>

                <Button variant="primary" type="submit" className="mt-3">Sign In</Button>
            </Form>

            <Row className="py-3">
                <Col>
                    New Customer? <Link to="/register">Register</Link>
                </Col>
            </Row>
        </FormContainer>
    )
}