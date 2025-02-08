import React, { useEffect, useState } from "react";
import axios from 'axios';
import * as XLSX from 'xlsx';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import {
    Table,
    Row,
    Col,
    Card,
    CardBody,
    CardTitle,
    CardSubtitle,
    Button,
    Input,
    FormGroup,
    Label
} from "reactstrap";
import { useNavigate } from "react-router-dom";

const BasicTable = () => {
    const [data, setData] = useState([]);
    const [states, setStates] = useState([]);
    const [managers, setManager] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedState, setSelectedState] = useState("");
    const [selectedManager, setSelectedManager] = useState("");
    const [nextPage, setNextPage] = useState(null);
    const [prevPage, setPrevPage] = useState(null);
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    const fetchData = async (url = `${import.meta.env.VITE_APP_KEY}customers/`) => {
        try {
            setLoading(true);
            const [response, responseState, responseManager] = await Promise.all([
                axios.get(url, { headers: { 'Authorization': `Bearer ${token}` } }),
                axios.get(`${import.meta.env.VITE_APP_KEY}states/`, { headers: { 'Authorization': `Bearer ${token}` } }),
                axios.get(`${import.meta.env.VITE_APP_KEY}staffs/`, { headers: { 'Authorization': `Bearer ${token}` } })
            ]);
            
            if (response.status === 200) {
                setData(response.data.results.data);
                setNextPage(response.data.next);
                setPrevPage(response.data.previous);
            }
            if (responseState.status === 200) setStates(responseState.data.data);
            if (responseManager.status === 200) setManager(responseManager.data.data);
        } catch (error) {
            setError(error.message || "Failed to fetch data");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [token]);


    console.log("data indormation", data);

    const filteredData = data.filter((customer) =>
        (customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            customer.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            customer.phone.toLowerCase().includes(searchTerm.toLowerCase())) &&
        (selectedState === "" || customer.state === selectedState) &&
        (selectedManager === "" || customer.manager === selectedManager)
    );

    const exportToExcel = () => {
        const formattedData = filteredData.map((customer, index) => ({
            "#": index + 1,
            "Name": customer.name,
            "Manager": customer.manager,
            "GST": customer.gst || 'N/A',
            "Email": customer.email || 'N/A',
            "Phone": customer.phone || 'N/A',
            "City": customer.city || 'N/A',
            "State": customer.state || 'N/A',
            "Zip": customer.zip_code || 'N/A',
            "Address": customer.address || 'N/A'
        }));

        const worksheet = XLSX.utils.json_to_sheet(formattedData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Customers");
        XLSX.writeFile(workbook, "Customer_List.xlsx");
    };

    return (
        <React.Fragment>
            <div className="page-content">
                <div className="container-fluid">
                    <Row>
                        <Col xl={12}>
                            <Card>
                                <CardBody>
                                    <CardTitle className="h4">Customer List</CardTitle>
                                    <CardSubtitle className="card-title-desc">
                                        Filter and view customer data.
                                    </CardSubtitle>
                                    <Row className="align-items-center mb-3">
                                        <Col md={4}>
                                            <FormGroup>
                                                <Label for="stateFilter">Filter by State</Label>
                                                <Input
                                                    type="select"
                                                    id="stateFilter"
                                                    value={selectedState}
                                                    onChange={(e) => setSelectedState(e.target.value)}
                                                >
                                                    <option value="">All States</option>
                                                    {states.map((state) => (
                                                        <option key={state.id} value={state.name}>{state.name}</option>
                                                    ))}
                                                </Input>
                                            </FormGroup>
                                        </Col>
                                        <Col md={4}>
                                            <FormGroup>
                                                <Label for="managerFilter">Filter by Manager</Label>
                                                <Input
                                                    type="select"
                                                    id="managerFilter"
                                                    value={selectedManager}
                                                    onChange={(e) => setSelectedManager(e.target.value)}
                                                >
                                                    <option value="">All Managers</option>
                                                    {managers.map((manager) => (
                                                        <option key={manager.id} value={manager.name}>{manager.name}</option>
                                                    ))}
                                                </Input>
                                            </FormGroup>
                                        </Col>
                                        <Col md={4}>
                                            <Button color="success" onClick={exportToExcel}>Export to Excel</Button>
                                        </Col>
                                    </Row>
                                    <Table bordered striped hover>
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Name</th>
                                                <th>Manager</th>
                                                <th>GST</th>
                                                <th>Email</th>
                                                <th>Phone</th>
                                                <th>City</th>
                                                <th>State</th>
                                                <th>Zip</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {filteredData.length > 0 ? (
                                                filteredData.map((customer, index) => (
                                                    <tr key={customer.id}>
                                                        <th scope="row">{index + 1}</th>
                                                        <td>{customer.name}</td>
                                                        <td>{customer.manager}</td>
                                                        <td>{customer.gst || 'N/A'}</td>
                                                        <td>{customer.email || 'N/A'}</td>
                                                        <td>{customer.phone || 'N/A'}</td>
                                                        <td>{customer.city || 'N/A'}</td>
                                                        <td>{customer.state || 'N/A'}</td>
                                                        <td>{customer.zip_code || 'N/A'}</td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan="9" className="text-center">No data available</td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </Table>
                                    <div className="d-flex justify-content-between mt-3">
                                        <Button disabled={!prevPage} onClick={() => fetchData(prevPage)}>Previous</Button>
                                        <Button disabled={!nextPage} onClick={() => fetchData(nextPage)}>Next</Button>
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </div>
            </div>
        </React.Fragment>
    );
};

export default BasicTable;
