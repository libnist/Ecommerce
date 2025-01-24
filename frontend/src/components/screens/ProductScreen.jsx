import { Link, useParams } from "react-router-dom";

import { Row, Col, Image, ListGroup, Button, Card } from "react-bootstrap";

import Rating from "../Rating";
import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { listProductDetails } from "../../store/product";

import Loader from "../Loader"
import Message from "../Message";

export default function ProductScreen() {

    const params = useParams();
    const dispatch = useDispatch();
    const {product, loading, error} = useSelector(state => state.product)


    useEffect(() => {

        dispatch(listProductDetails(params.id))
        
    }, [params.id, dispatch])

    return (
        <>
        <Link to="/" className="btn btn-light my-3">Go Back</Link>

        { loading && <Loader/>}
        { error && <Message variant="danger">{error}</Message>}

        <Row>
            <Col md={6}>
             <Image src={"http://localhost:8000" + product.image} alt={product.name} fluid/>
            </Col>

            <Col md={3}>
            <ListGroup variant="flush">
                <ListGroup.Item>
                    <h3>{product.name}</h3>
                </ListGroup.Item>

                <ListGroup.Item>
                    <Rating value={product.rating} text={`${product.numReviews} reviews`} color={"#f8e825"}/>
                </ListGroup.Item>

                <ListGroup.Item>
                    Price: ${product.price}
                </ListGroup.Item>

                <ListGroup.Item>
                    Description: ${product.description}
                </ListGroup.Item>
            </ListGroup>
            </Col>

            <Col md={3}>
                <Card>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <Row>
                                <Col>Price:</Col>

                                <Col>
                                    <strong>${product.price}</strong>
                                </Col>
                            </Row>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Row>
                                <Col>Status:</Col>

                                <Col>
                                    <strong>{product.countInStock > 0 ? "In Stock" : "Out of Stock"}</strong>
                                </Col>
                            </Row>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Button className="btn-block w-100" type="button" disabled={product.countInStock <= 0}>ADD TO CART</Button>
                        </ListGroup.Item>


                    </ListGroup>
                </Card>
            </Col>
        </Row>
        </>
    )
}