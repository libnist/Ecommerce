import { useState, useEffect } from "react"

import { Link, useParams, useNavigate } from "react-router-dom"

import { Form, Button } from "react-bootstrap"

import { useDispatch, useSelector } from "react-redux"

import { listProducts } from "../../store/products"
import { updateProduct, productUpdateActions } from "../../store/productEdit";

import axios from "axios"
import Loader from "../Loader"
import Message from "../Message"
import FormContainer from "../FormContainer";
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
    const [uploading, setUploading] = useState(false)


    const { products, loading, error } = useSelector(state => state.products);

    const product = products.filter(product => { return product._id === Number(productId) })[0];

    const { loading: updateLoading, error: updateError, success: updateSuccess } = useSelector(state => state.updateProduct);



    useEffect(() => {

        if (updateSuccess) {
            dispatch(productUpdateActions.updateProductReset());
            navigate("/admin/productlist");
        }

        if (products.length === 0 && !error && !loading) {
            dispatch(listProducts());
        }
    }, [dispatch, products, error, loading, updateSuccess, navigate])

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
    }, [product])

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(updateProduct({
            _id: productId,
            name,
            price,
            image,
            brand,
            category,
            countInStock,
            description
        }))
    }

    const uploadFileHandler = async(e) => {
        const file = e.target.files[0];
        const formData = new FormData();

        formData.append("image", file)
        formData.append("product_id", productId)
        setUploading(true)

        try {
            const config = {
                headers: {
                    "content-type": "multipart/form-data"
                }
            }

            const {data} = await axios.post("/api/products/upload", formData, config);
            setUploading(false)
        } catch(error) {
            setUploading(false)
        }
        
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
                    {updateError && <Message variant="danger">{updateError}</Message>}
                    {updateLoading && <Loader />}
                    <Form onSubmit={submitHandler}>
                        <Form.Group controlId="name">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="name" placeholder="Enter name" value={name} onChange={(e) => setName(e.target.value)}></Form.Control>
                        </Form.Group>

                        <Form.Group controlId="price">
                            <Form.Label>Price</Form.Label>
                            <Form.Control type="number" placeholder="Enter price" value={price} onChange={(e) => setPrice(e.target.value)}></Form.Control>
                        </Form.Group>

                        {/* <Form.Group controlId="image">
                            <Form.Label>Image</Form.Label>
                            <Form.Control type="text" placeholder="Enter image" value={image} onChange={(e) => setImage(e.target.value)}></Form.Control>
                        </Form.Group> */}

                        <Form.Group controlId="image-upload">
                            <Form.Label>Choose File</Form.Label>
                            <Form.Control type="file" onChange={(e) => uploadFileHandler(e)}></Form.Control>
                        </Form.Group>

                        {uploading && <Loader/>}

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