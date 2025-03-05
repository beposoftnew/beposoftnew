import React, { Fragment, useState, useEffect } from "react";
import axios from "axios";

const WaitingProducts = () => {
    const warehouseId = localStorage.getItem('warehouseId');
    const token = localStorage.getItem('token');
    const [waitingProducts, setWaitingProducts] = useState([]);
    const [refresh, setRefresh] = useState(false); // 👈 State to trigger re-fetch

    useEffect(() => {
        const fetchWaitingProducts = async () => {
            if (!warehouseId) {
                console.log("No warehouse ID found.");
                return;
            }

            try {
                const response = await axios.get(`${import.meta.env.VITE_APP_KEY}warehouse/products/${warehouseId}/`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                // Filter only disapproved products
                const disapprovedProducts = response.data.data.filter(product => product.approval_status === "Disapproved");
                setWaitingProducts(disapprovedProducts);
            } catch (error) {
                console.log("Error fetching waiting products:", error);
            }
        };

        fetchWaitingProducts();
    }, [token, warehouseId, refresh]); // 👈 Depend on `refresh` state

    const handleApprove = async (productId) => {
        try {
            await axios.put(`${import.meta.env.VITE_APP_KEY}product/update/${productId}/`, 
                { approval_status: "Approved" },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                }
            );
            alert("Product approved successfully.");

            // Trigger useEffect by updating refresh state
            setRefresh(prev => !prev);
        } catch (error) {
            console.log("Error approving product:", error);
            alert("Failed to approve product.");
        }
    };

    return (
        <Fragment>
            <div className="page-content">
                <div className="container-fluid">
                    <h1 style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                        Products Waiting for Approval
                    </h1>

                    {warehouseId ? (
                        waitingProducts.length > 0 ? (
                            <table className="table table-hover">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Product Name</th>
                                        <th>Stock</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {waitingProducts.map((product, index) => (
                                        <tr key={product.id}>
                                            <td>{index + 1}</td>
                                            <td>{product.name}</td>
                                            <td>{product.stock}</td>
                                            <td>
                                                <button 
                                                    className="btn btn-success"
                                                    onClick={() => handleApprove(product.id)}
                                                >
                                                    Approve
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <p style={{ textAlign: "center" }}>No disapproved products found.</p>
                        )
                    ) : (
                        <p style={{ textAlign: "center", color: "red" }}>No warehouse ID found.</p>
                    )}
                </div>
            </div>
        </Fragment>
    );
};

export default WaitingProducts;
