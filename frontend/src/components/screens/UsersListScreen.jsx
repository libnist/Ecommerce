import { useState, useEffect } from "react"

import { Link, useNavigate } from "react-router-dom"

import { Table, Button } from "react-bootstrap"

import { useDispatch, useSelector } from "react-redux"
import { listUsers } from "../../store/users"
import { deleteUser } from "../../store/userDelete"

import Loader from "../Loader"
import Message from "../Message"

export default function UserListScreen() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, users, error } = useSelector(state => state.users);
    const { userInfo } = useSelector(state => state.user);
    const isCurrentUserAdmin = userInfo.isAdmin;

    const { success } = useSelector(state => state.userDelete);

    useEffect(() => {
        if (!isCurrentUserAdmin) {
            navigate("/");
        }
        dispatch(listUsers())
    }, [dispatch, isCurrentUserAdmin, navigate, success]);

    const deleteHandler = (id) => {
        if (window.confirm("Are you sure you want to delete this user?")){
            dispatch(deleteUser(id))
        }
    }
    return (
        <>
            <h1>Users</h1>
            {loading && <Loader />}
            {error && <Message variant={"danger"}>{error}</Message>}
            {!loading && !error && (
                <Table striped bordered hover responsive className="table-sm">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Admin</th>
                            <th></th>
                        </tr>
                    </thead>

                    <tbody>
                        {users.map(user => (
                            <tr key={user._id}>
                                <td>{user._id}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.isAdmin ? <i className="fas fa-check" style={{ color: "green" }}></i> : <i className="fas fa-times" style={{ color: "red" }}></i>}</td>
                                <td>
                                    <Link to={`/admin/user/${user._id}`}>
                                        <Button variant="light" className="btn-sm"><i className="fas fa-edit"></i> </Button>
                                    </Link>
                                    <Button variant="danger" className="btn-sm" onClick={() => deleteHandler(user._id)}><i className="fas fa-trash"></i> </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </>
    )
}