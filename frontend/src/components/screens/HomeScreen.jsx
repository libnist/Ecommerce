import products from "../../products";

import { Row, Col } from "react-bootstrap";
import Product from "../Product";

export default function HomeScreen() {
    return (
        <>
            <h1>Latest Products</h1>

            <Row>
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