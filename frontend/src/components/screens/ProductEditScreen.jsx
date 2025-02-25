import { useState, useEffect } from "react"

import { Link, useParams, useNavigate } from "react-router-dom"

import { Form, Button } from "react-bootstrap"

import { useDispatch, useSelector } from "react-redux"

import { listProducts } from "../../store/products"

import Loader from "../Loader"
import Message from "../Message"
import FormContainer from "../FormContainer";
import { userActions } from "../../store/user"
export default function ProductEditScreen() {
    const params = useParams();
        const dispatch = useDispatch();
        const navigate = useNavigate();
    
        const productId = params.id;
    
        const [name, setName] = useState("")
        const [price, setPrice] = useState(0)
        const [image, setImage] = useState("")
        const [brand, setBrand] = useState("")
        const [category, setCategory] = useState("")
        const [countInStock, setCountInStock] = useState("")
        const [description, setDescription] = useState("")
    
    
        const { products, loading, error } = useSelector(state => state.products);
    
        const product = products.filter(product => {return product._id === Number(productId)})[0];
    
        
        useEffect(() => {
            if ( products.length === 0 && !error && !loading) {
                dispatch(listProducts());
            }
        }, [dispatch, products, error, loading])
        
        useEffect(() => {
    
            if (product) {
                setName(product.name)
                setPrice(product.price)
                setImage(product.image)
                setBrand(product.brand)
                setCategory(product.category)
                setCountInStock(product.countInStock)
                setDescription(product.description)
            }
        },[product])
        
        const submitHandler = (e) => {
            e.preventDefault();
        }
    
        return (
            <div>
                <Link to="/admin/productlist">Go Back</Link>
                {error && <Message variant="danger">{error}</Message>}
                {loading && <Loader />}
                {!product && !loading && !error && <Message variant="danger">No product with the given ID.</Message>}
                {!error && !loading && product
                    && <FormContainer>
                        <h1>Edit Product</h1>
                        <Form onSubmit={submitHandler}>
                            <Form.Group controlId="name">
                                <Form.Label>Name</Form.Label>
                                <Form.Control type="name" placeholder="Enter name" value={name} onChange={(e) => setName(e.target.value)}></Form.Control>
                            </Form.Group>

                            <Form.Group controlId="price">
                                <Form.Label>Price</Form.Label>
                                <Form.Control type="number" placeholder="Enter price" value={price} onChange={(e) => setPrice(e.target.value)}></Form.Control>
                            </Form.Group>

                            <Form.Group controlId="image">
                                <Form.Label>Image</Form.Label>
                                <Form.Control type="text" placeholder="Enter image" value={image} onChange={(e) => setImage(e.target.value)}></Form.Control>
                            </Form.Group>

                            <Form.Group controlId="brand">
                                <Form.Label>Brand</Form.Label>
                                <Form.Control type="text" placeholder="Enter brand" value={brand} onChange={(e) => setBrand(e.target.value)}></Form.Control>
                            </Form.Group>

                            <Form.Group controlId="countinstorch">
                                <Form.Label>Count In Stock</Form.Label>
                                <Form.Control type="number" placeholder="Enter stock" value={countInStock} onChange={(e) => setCountInStock(e.target.value)}></Form.Control>
                            </Form.Group>

                            <Form.Group controlId="category">
                                <Form.Label>Category</Form.Label>
                                <Form.Control type="text" placeholder="Enter category" value={category} onChange={(e) => setCategory(e.target.value)}></Form.Control>
                            </Form.Group>

                            <Form.Group controlId="description">
                                <Form.Label>Description</Form.Label>
                                <Form.Control type="text" placeholder="Enter description" value={description} onChange={(e) => setDescription(e.target.value)}></Form.Control>
                            </Form.Group>
    
                            <Button variant="primary" type="submit" className="mt-3">Update</Button>
                        </Form>
                    </FormContainer>
                }
            </div>
        )
}