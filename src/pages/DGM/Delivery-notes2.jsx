import React, { useState, useEffect } from "react";
import { Table, Row, Col, Card, CardBody, CardTitle, Input, Button } from "reactstrap";
import axios from "axios";

const AverageAmountReport = () => {
    const [warehouseData, setWarehouseData] = useState([]);
    const [selectedDate, setSelectedDate] = useState("");
    const [averageAmountData, setAverageAmountData] = useState([]);
    const token = localStorage.getItem("token");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_APP_KEY}orders/`, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                // Extract warehouse data from all orders
                let warehouses = [];
                response.data.forEach(order => {
                    if (Array.isArray(order.warehouse) && order.warehouse.length > 0) {
                        warehouses = warehouses.concat(order.warehouse);
                    }
                });

                setWarehouseData(warehouses);
            } catch (error) {
                console.error("Error fetching warehouse data:", error);
            }
        };

        fetchData();
    }, []);

    // Function to calculate average amount for each parcel_service based on selected date
    const calculateAverageAmount = () => {
        if (!selectedDate) {
            alert("Please select a date!");
            return;
        }

        // Filter warehouse data for selected date
        const filteredData = warehouseData.filter(item => item.postoffice_date === selectedDate);
        console.log("Filtered Data for Date:", selectedDate, filteredData); // Debugging

        if (filteredData.length === 0) {
            alert("No data found for the selected date.");
            setAverageAmountData([]);
            return;
        }

        // Group by parcel_service
        const groupedData = {};
        filteredData.forEach(item => {
            const parcelService = item.parcel_service || "No Service"; // Handle null values
            const key = `${selectedDate}-${parcelService}`;

            if (!groupedData[key]) {
                groupedData[key] = {
                    totalAmount: 0,
                    totalParcels: 0,
                    parcelService: parcelService,
                    postofficeDate: item.postoffice_date,
                };
            }

            // Convert values to float and sum shipping charge + parcel amount
            const shippingCharge = parseFloat(item.shipping_charge) || 0;
            const parcelAmount = parseFloat(item.parcel_amount) || 0;

            groupedData[key].totalAmount += (shippingCharge + parcelAmount);
            groupedData[key].totalParcels += 1;
        });

        // Compute the average amount per parcel_service
        const avgData = Object.keys(groupedData).map(key => ({
            postofficeDate: groupedData[key].postofficeDate,
            parcelService: groupedData[key].parcelService,
            averageAmount: (groupedData[key].totalAmount / groupedData[key].totalParcels).toFixed(2),
        }));

        setAverageAmountData(avgData);
    };

    return (
        <div className="page-content">
            <div className="container-fluid">
                <Row>
                    <Col xl={12}>
                        <Card>
                            <CardBody>
                                <CardTitle className="h4">Average Amount by Parcel Service</CardTitle>

                                {/* Date Picker */}
                                <Row className="mb-3">
                                    <Col sm={6}>
                                        <Input
                                            type="date"
                                            value={selectedDate}
                                            onChange={(e) => setSelectedDate(e.target.value)}
                                        />
                                    </Col>
                                    <Col sm={6}>
                                        <Button color="primary" onClick={calculateAverageAmount}>
                                            Calculate
                                        </Button>
                                    </Col>
                                </Row>

                                {/* Table */}
                                <div className="table-responsive">
                                    <Table className="table table-bordered table-sm text-center">
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Date</th>
                                                <th>Parcel Service</th>
                                                <th>Average Amount (₹)</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {averageAmountData.length > 0 ? (
                                                averageAmountData.map((item, index) => (
                                                    <tr key={index}>
                                                        <th scope="row">{index + 1}</th>
                                                        <td>{item.postofficeDate}</td>
                                                        <td>{item.parcelService}</td>
                                                        <td>₹ {item.averageAmount}</td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan="4" className="text-center text-muted">
                                                        No data available for the selected date
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </Table>
                                </div>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>
        </div>
    );
};

export default AverageAmountReport;
