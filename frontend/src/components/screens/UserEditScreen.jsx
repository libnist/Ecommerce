import { useState, useEffect } from "react"

import { Link, useParams, useNavigate } from "react-router-dom"

import { Form, Button } from "react-bootstrap"

import { useDispatch, useSelector } from "react-redux"

import { listUsers } from "../../store/users"
import { updateUser, userUpdateActions } from "../../store/userUpdate"

import Loader from "../Loader"
import Message from "../Message"
import FormContainer from "../FormContainer";
import { userActions } from "../../store/user"

export default function UserEditScreen() {

    const params = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const userId = params.id;

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [isAdmin, setIsAdmin] = useState(false)


    const { users, loading, error } = useSelector(state => state.users);

    const user = users.filter(user => {return user._id === Number(userId)})[0];

    const { error: updateError, loading: updateLoading, success: updateSuccess} = useSelector(state => state.userUpdate);

    
    useEffect(() => {
        if ( users.length === 0 && !error && !loading) {
            dispatch(listUsers());
        }
    }, [dispatch, users, error, loading])
    
    useEffect(() => {

        if(updateSuccess) {
            dispatch(userUpdateActions.userUpdateReset());
            navigate("/admin/userlist");
        }

        if (user) {
            setName(user.name)
            setEmail(user.email)
            setIsAdmin(user.isAdmin)
        }
    },[user, updateSuccess, navigate, dispatch])
    
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(updateUser(user._id, {
            name,
            email,
            isAdmin
        }))
    }

    return (
        <div>
            <Link to="/admin/userlist">Go Back</Link>
            {error && <Message variant="danger">{error}</Message>}
            {loading && <Loader />}
            {!user && !loading && !error && <Message variant="danger">No user with the given ID.</Message>}
            {!error && !loading && user
                && <FormContainer>
                    <h1>Edit User</h1>
                    {updateLoading && <Loader/>}
                    {updateError && <Message variant={"danger"}>{updateError}</Message>}
                    <Form onSubmit={submitHandler}>
                        <Form.Group controlId="name">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="name" placeholder="Enter name" value={name} onChange={(e) => setName(e.target.value)}></Form.Control>
                        </Form.Group>

                        <Form.Group controlId="email">
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)}></Form.Control>
                        </Form.Group>

                        <Form.Group controlId="password">
                            <Form.Check type="checkbox" label="Is Admin" checked={isAdmin} onChange={(e) => setIsAdmin(e.target.checked)}></Form.Check>
                        </Form.Group>

                        <Button variant="primary" type="submit" className="mt-3">Update</Button>
                    </Form>
                </FormContainer>
            }
        </div>
    )
}