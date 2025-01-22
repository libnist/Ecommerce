import { Row, Col } from "react-bootstrap";
import Product from "../Product";

import { useState, useEffect } from "react";

import axios from "axios";

export default function HomeScreen() {

    const [products, setProducts] = useState([]);

    useEffect(()=> {
        const getProducts = async() => {
            try {
                const products = await axios.get("/api/products/");
                setProducts(products.data)

            } catch (e) {
                console.log(e)
            }
        }

        getProducts();
    }, [])

    return (
        <>
            <h1>Latest Products</h1>
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