import { Row, Col } from "react-bootstrap";
import Product from "../Product";
import Loader from "../Loader";
import Message from "../Message";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../../store/products";
import { useSearchParams } from "react-router-dom";

export default function HomeScreen() {

    const dispath = useDispatch();
    const {products, loading, error} = useSelector(state => state.products);
    const [searchParams, _] = useSearchParams();

    useEffect(()=> {
        dispath(listProducts(searchParams.get("keyword")));
    }, [dispath, searchParams])

    return (
        <>
            <h1>Latest Products</h1>

            { loading && <Loader/>}
            { error && <Message variant="danger">{error}</Message>}

            <Row className="gy-3">
                {
                    products.map(product => (
                        <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                            <Product {...product}/>
                        </Col>
                    ))
                }
            </Row>
        </>
    )
}