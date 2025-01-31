import { useState, useEffect } from "react"

import { useNavigate } from "react-router-dom"

import { Form, Button, Col} from "react-bootstrap"

import { useDispatch, useSelector } from "react-redux"

import { savePaymentMethod } from "../../store/cart";

import FormContainer from "../FormContainer";

import CheckoutSteps from "../CheckoutSteps";

export default function PaymentScreen() {

    const cart = useSelector(state => state.cart);
    const { shippingAddress} = cart

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [paymentMethod, setPaymentMethod] = useState("Shaparak");

    if (!shippingAddress.address) {
        navigate("/shipping")
    }

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(savePaymentMethod(paymentMethod))
        navigate("/placeorder")
    }

    return (
        <FormContainer>
            <CheckoutSteps step1 step2 step3/>

            <Form onSubmit={submitHandler}>

                <Form.Group>
                    <Form.Label as="legend">Select Method</Form.Label>
                    <Col>                        
                        <Form.Check value="Shapark" type="radio" label="Shaparak" id="shaparak" name="paymentMethod" checked onClick={(e) => {setPaymentMethod(e.target.value);}}></Form.Check>
                    </Col>
                </Form.Group>
                <Button type="submit" variant="primary" className="mt-3">Continue</Button>
            </Form>
        </FormContainer>
    )
}