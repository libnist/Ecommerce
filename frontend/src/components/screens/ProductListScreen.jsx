import { useState, useEffect } from "react"

import { Link, useNavigate } from "react-router-dom"

import { Table, Button, Row, Col } from "react-bootstrap"

import { useDispatch, useSelector } from "react-redux"
import { listProducts } from "../../store/products"
import { deleteProduct } from "../../store/deleteProduct"

import Loader from "../Loader"
import Message from "../Message"

export default function ProductListScreen() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, users, error } = useSelector(state => state.users);
    const { userInfo } = useSelector(state => state.user);
    const isCurrentUserAdmin = userInfo.isAdmin;

    const { products, loading: productsLoading, error: productsError } = useSelector(state => state.products);

    const { loading: deleteLoading, error: deleteError, success: deleteSuccess} = useSelector(state => state.deleteProduct)

    useEffect(() => {
        if (!isCurrentUserAdmin) {
            navigate("/");
        }
        dispatch(listProducts())
    }, [dispatch, isCurrentUserAdmin, navigate, deleteSuccess]);

    const deleteHandler = (id) => {
        if (window.confirm("Are you sure you want to delete this product?")){
            dispatch(deleteProduct(id))
        }
    }

    const createProductHandler = (product) => {
        console.log("Create Product")
    }
    return (
        <>
            <Row className="align-items-center">
                <Col>
                    <h1>Products</h1>
                </Col>

                <Col className="text-right">
                    <Button className="my-3" onClick={createProductHandler}>
                        <i className="fas fa-plus"></i>Create Product
                    </Button>
                </Col>
            </Row>
            {deleteLoading && <Loader/>}
            {deleteError && <Message variant="danger">{deleteError}</Message>}
            {loading && <Loader />}
            {error && <Message variant={"danger"}>{error}</Message>}
            {!loading && !error && (
                <Table striped bordered hover responsive className="table-sm">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Category</th>
                            <th>Brand</th>
                            <th></th>
                        </tr>
                    </thead>

                    <tbody>
                        {products.map(product => (
                            <tr key={product._id}>
                                <td>{product._id}</td>
                                <td>{product.name}</td>
                                <td>{product.price}</td>
                                <td>{product.category}</td>
                                <td>{product.brand}</td>
                                <td>
                                    <Link to={`/admin/product/${product._id}`}>
                                        <Button variant="light" className="btn-sm"><i className="fas fa-edit"></i> </Button>
                                    </Link>
                                    <Button variant="danger" className="btn-sm" onClick={() => deleteHandler(product._id)}><i className="fas fa-trash"></i> </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
            </>
    )
}