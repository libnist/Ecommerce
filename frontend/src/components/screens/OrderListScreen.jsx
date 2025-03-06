import { useState, useEffect } from "react"

import { Link, useNavigate } from "react-router-dom"

import { Table, Button } from "react-bootstrap"

import { useDispatch, useSelector } from "react-redux"
import { listOrders } from "../../store/orders"

import Loader from "../Loader"
import Message from "../Message"

export default function OrderListScreen() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, orders, error } = useSelector(state => state.orders);
    const { userInfo } = useSelector(state => state.user);
    const isCurrentUserAdmin = userInfo.isAdmin;


    useEffect(() => {
        if (!isCurrentUserAdmin) {
            navigate("/");
        }
        dispatch(listOrders())
    }, [dispatch, isCurrentUserAdmin, navigate]);

    // const deleteHandler = (id) => {
    //     if (window.confirm("Are you sure you want to delete this user?")){

    //             }
    // }
    return (
        <>
            <h1>Orders</h1>
            {loading && <Loader />}
            {error && <Message variant={"danger"}>{error}</Message>}
            {!loading && !error && (
                <Table striped bordered hover responsive className="table-sm">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>USER</th>
                            <th>DATE</th>
                            <th>TOTAL PRICE</th>
                            <th>PAID</th>
                            <th>DELIVERED</th>
                            <th></th>
                        </tr>
                    </thead>

                    <tbody>
                        {orders.map(order => (
                            <tr key={order._id}>
                                <td>{order._id}</td>
                                <td>{order.user && order.user.name}</td>
                                <td>{order.createdAt.substring(0, 10)}</td>
                                <td>${order.totalPrice}</td>
                                <td>{order.isPaid ? order.paidAt.substring(0, 10) : <i className="fas fa-times" style={{ color: "red" }}></i>}</td>
                                <td>{order.isDelivered ? order.deliveredAt.substring(0, 10) : <i className="fas fa-times" style={{ color: "red" }}></i>}</td>
                                <td>
                                    <Link to={`/order/${order._id}`}>
                                        <Button variant="light" className="btn-sm">Details</Button>
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </>
    )
}