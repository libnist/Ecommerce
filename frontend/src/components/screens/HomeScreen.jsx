import { Row, Col } from "react-bootstrap";
import Product from "../Product";
import Loader from "../Loader";
import Message from "../Message";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../../store/products";
import { useSearchParams } from "react-router-dom";

import Paginate from "../Paginate";

export default function HomeScreen() {


    const dispath = useDispatch();
    const { products, loading, error, page, pages } = useSelector(state => state.products);
    const [searchParams, _] = useSearchParams();

    const currentPage = searchParams.get("page") ? searchParams.get("page") : 1;
    const keyword = searchParams.get("keyword") ? searchParams.get("keyword") : "";

    useEffect(() => {
        dispath(listProducts(keyword, currentPage));
    }, [dispath, keyword, currentPage])

    return (
        <>
            <h1>Latest Products</h1>

            {loading && <Loader />}
            {error && <Message variant="danger">{error}</Message>}
            <Row className="gy-3">
                {
                    products.map(product => (
                        <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                            <Product {...product} />
                        </Col>
                    ))
                }
            </Row>
            <Row className="mt-5">

            <Paginate pages={pages} page={page} keyword={keyword}/>
            </Row>
        </>
    )
}