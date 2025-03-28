import { useState } from "react"

import { useNavigate } from "react-router-dom"

import { Form, Button, } from "react-bootstrap"

import { useDispatch, useSelector } from "react-redux"

import FormContainer from "../FormContainer";

import { saveShippingAddress } from "../../store/cart";

import CheckoutSteps from "../CheckoutSteps";

export default function ShippingScreen() {

    const navigate = useNavigate();

    const { cartItems, shippingAddress} = useSelector(state => state.cart);
    const dispatch = useDispatch();

    const [address, setAddress] = useState(shippingAddress.address || "")
    const [city, setCity] = useState(shippingAddress.city  || "")
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode  || "")
    const [country, setCountry] = useState(shippingAddress.country  || "")


    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(saveShippingAddress({address, city, postalCode, country}));
        navigate("/payment")
    }


    return (
        <FormContainer>
            <CheckoutSteps step1 step2/>
            <h1>Shipping</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group controlId="address">
                    <Form.Label>Address</Form.Label>
                    <Form.Control type="text" required placeholder="Enter address" value={address} onChange={(e) => setAddress(e.target.value)}></Form.Control>
                </Form.Group>

                <Form.Group controlId="city">
                    <Form.Label>City</Form.Label>
                    <Form.Control type="text" required placeholder="Enter city" value={city} onChange={(e) => setCity(e.target.value)}></Form.Control>
                </Form.Group>

                <Form.Group controlId="postalCode">
                    <Form.Label>Postal Code</Form.Label>
                    <Form.Control type="text" required placeholder="Enter postal code" value={postalCode} onChange={(e) => setPostalCode(e.target.value)}></Form.Control>
                </Form.Group>

                <Form.Group controlId="country">
                    <Form.Label>Country</Form.Label>
                    <Form.Control type="text" required placeholder="Enter country" value={country} onChange={(e) => setCountry(e.target.value)}></Form.Control>
                </Form.Group>

                <Button variant="primary" type="submit" className="mt-3">Continue</Button>
            </Form>
        </FormContainer>
    )
}