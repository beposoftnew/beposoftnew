import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";



const EmiTotalInfo = () => {
    const { id } = useParams(); // Correctly extracting the "id" parameter
    const token = localStorage.getItem("token");
    const [ totalInfo, setTotalInfo] = useState("");

    // Define the fetch function inside the component
    const fetchFullOrderDetails = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_APP_IMAGE}/apis/emiexpense/${id}/`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log("Fetched Data:", response.data);
            setTotalInfo(response.data)
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    // useEffect to call fetchFullOrderDetails on mount
    useEffect(() => {
        fetchFullOrderDetails();
    }, [id]); // Added "id" as a dependency


 

    return (
        <>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", marginTop: "70px" }}>
            
            {/* Table Container */}
            <div style={{ display: "flex", justifyContent: "center", marginTop: "20px", width: "100%" }}>
                <table style={{ borderCollapse: "collapse", width: "60%", textAlign: "center" }}>
                    <thead>
                    <tr>
                    <th style={{ border: "1px solid black", padding: "15px", textAlign: "center", background: "#3840d1", color: "white" }} colSpan="3">
                        EMI INFORMATION
                    </th>
                </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style={{ border: "1px solid black", padding: "10px" }}>Emi Name</td>
                            <td style={{ border: "1px solid black", padding: "10px", fontWeight:"bolder" , textTransform:"uppercase"}}>{totalInfo?.emi_name}</td>
                        </tr>
                        <tr>
                            <td style={{ border: "1px solid black", padding: "10px" }}>principal</td>
                            <td style={{ border: "1px solid black", padding: "10px" }}> ₹{totalInfo.principal}</td>
                        </tr>
                        <tr>
                            <td style={{ border: "1px solid black", padding: "10px" }}>Annual Intrust</td>
                            <td style={{ border: "1px solid black", padding: "10px" }}>{totalInfo.annual_interest_rate}%</td>
                        </tr>
                        <tr>
                            <td style={{ border: "1px solid black", padding: "10px" }}>Down Payment</td>
                            <td style={{ border: "1px solid black", padding: "10px" }}> ₹{totalInfo.down_payment}</td>
                        </tr>
                    
                        <tr>
                            <td style={{ border: "1px solid black", padding: "10px" }}>Total Amount Paid</td>
                            <td style={{ border: "1px solid black", padding: "10px" }}> ₹{totalInfo.total_amount_paid}</td>
                        </tr>
                        <tr>
                            <td style={{ border: "1px solid black", padding: "10px" }}>Total Emi Paid</td>
                            <td style={{ border: "1px solid black", padding: "10px" }}> ₹{totalInfo.total_emi_paid}</td>
                        </tr>
                        <tr>
                            <td style={{ border: "1px solid black", padding: "10px" }}>Tenure Month</td>
                            <td style={{ border: "1px solid black", padding: "10px" }}> ₹{totalInfo.tenure_months}</td>
                        </tr>
        
                    </tbody>
                </table>
               
            </div>
            <div style={{padding:"20px" }}>
                    <h3 style={{display:"flex", justifyContent:"center", textAlign:"center", }}>PAYMENT INFORMATION</h3>

                    <table style={{ borderCollapse: "collapse", width: "100%", padding:"10px 30px", textAlign: "center", maxWidth:"400px", minWidth:"100px"}}>
                        <thead>
                            <tr style={{background:"green", color:"white"}}>
                                <td style={{ border: "1px solid black", padding: "10px" }}>Payment Date</td>
                                <td style={{ border: "1px solid black", padding: "10px" }}>Payment Amount</td>
                                <td style={{ border: "1px solid black", padding: "10px" }}> Payment Status</td>
                            </tr>
                            
                            {(totalInfo?.emidata || []).map((item, index) => (
                                <tr key={index}>
                                    <td style={{ border: "1px solid black", padding: "10px" }}>{item.date}</td>
                                    <td style={{ border: "1px solid black", padding: "10px" }}> ₹{item.amount}</td>
                                    <td style={{ border: "1px solid black", padding: "10px" }}>{item.status || "Paid"}</td>
                                </tr>
                            ))}

                            <tr>
                                <td></td>    
                            </tr>
                        </thead>
                    </table>
                </div>
        </div>
    </>
    
    );
};

export default EmiTotalInfo;
