import { Link, useNavigate, useParams } from "react-router-dom";

import { Row, Col, Image, ListGroup, Button, Card, Form } from "react-bootstrap";

import Rating from "../Rating";
import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { listProductDetails } from "../../store/product";
import { createReview, createReviewActions } from "../../store/createReview";

import Loader from "../Loader"
import Message from "../Message";

export default function ProductScreen() {

    const [qty, setQty] = useState(1);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");

    const params = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {product, loading, error} = useSelector(state => state.product)

    const {loading: createReviewLoading, error: createReviewError, success: createReviewSuccess} = useSelector(state => state.createReview)
    const {userInfo} = useSelector(state => state.user)


    useEffect(() => {
        if (createReviewSuccess){
            setRating(0);
            setComment("");
            dispatch(createReviewActions.createReviewReset())
        }
        dispatch(listProductDetails(params.id))
        
    }, [params.id, dispatch, createReviewSuccess])

    const addToCartHandler = () => {
        navigate(`/cart/${params.id}?qty=${qty}`)
    }

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(createReview(params.id, {rating, comment}))
    }

    return (
        <>
        <Link to="/" className="btn btn-light my-3">Go Back</Link>

        { loading && <Loader/>}
        { error && <Message variant="danger">{error}</Message>}

        <Row>
            <Col md={6}>
             <Image src={product.image} alt={product.name} fluid/>
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

                        {product.countInStock > 0 && (
                            <ListGroup.Item>
                            <Row>
                                <Col>Qty:</Col>

                                <Col xs="auto" className="my-1">
                                    <Form.Control as="select" value={qty} onChange={(e) => setQty(e.target.value)}>
                                        {
                                            [...Array(product.countInStock).keys()].map((x) => (
                                                <option value={x+1} key={x+1}>
                                                    {x + 1}
                                                </option>
                                            ))
                                        }
                                    </Form.Control>
                                </Col>
                            </Row>
                        </ListGroup.Item>
                        )}

                        <ListGroup.Item>
                            <Button className="btn-block w-100" type="button" disabled={product.countInStock <= 0} onClick={addToCartHandler}>ADD TO CART</Button>
                        </ListGroup.Item>


                    </ListGroup>
                </Card>
            </Col>
        </Row>

        <Row>
            <Col md={6}>
                <h4>Reviews</h4>
                {product.reviews.length === 0 && <Message variant="info">No Reviews</Message>}

                <ListGroup variant="flush">
                    {product.reviews.map(review => (
                        <ListGroup.Item key={review._id}>
                            <strong>{review.name}</strong>
                            <Rating value={review.rating} color="#f8e825"/>
                            <p>{review.createdAt.substring(0, 10)}</p>
                            <p>{review.comment}</p>
                        </ListGroup.Item>
                    ))}

                    <ListGroup.Item variant="flush">

                        <h4>Write a review</h4>

                        {createReviewLoading && <Loader/>}
                        {createReviewSuccess && <Message variant={"success"}>Review submitted</Message>}
                        {createReviewError && <Message variant={"danger"}>{createReviewError}</Message>}

                        {userInfo ? (
                            <Form onSubmit={submitHandler}>
                                <Form.Group controlId="rating">
                                    <Form.Label>
                                        Rating
                                    </Form.Label>
                                    <Form.Control as="select" value={rating} onChange={(e) => setRating(e.target.value)}>
                                        <option value="">Select...</option>
                                        <option value="1">1 - Poor</option>
                                        <option value="2">2 - Fair</option>
                                        <option value="3">3 - Good</option>
                                        <option value="4">4 - Very Good</option>
                                        <option value="5">5 - Excellent</option>
                                    </Form.Control>

                                </Form.Group>

                                <Form.Group controlId="comment">
                                    <Form.Label>Review</Form.Label>
                                    <Form.Control as="textarea" row="5" value={comment} onChange={e => setComment(e.target.value)}></Form.Control>
                                </Form.Group>

                                <Button disabled={createReviewLoading} type="submit" variant="primary">Submit</Button>
                            </Form>
                        ): ( <Message variant={"info"}>
                            Please <Link to="/login">Login</Link> to write a review.
                        </Message>)}

                    </ListGroup.Item>
                </ListGroup>
            </Col>
        </Row>
        </>
    )
}