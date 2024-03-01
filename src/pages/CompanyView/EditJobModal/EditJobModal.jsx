import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Modal, Button } from 'react-bootstrap';
export default function EditJobModal({ show, handleClose, handleSave, job }) {
    const [formData, setFormData] = useState({ ...job });
    const [companies, setCompanies] = useState([]);

    useEffect(() => {
        const fetchCompanies = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/companies/`,{
                    headers: {
                      
                      'Content-Type': 'application/json',
                      "Authorization": `Bearer ${localStorage.getItem("access_token")}`,
      
                    }
                  });
                setCompanies(response.data);
            } catch (error) {
                console.error('Error fetching companies:', error);
            }
        };

        fetchCompanies();
    }, []);

    // Handle change in form inputs
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        handleSave(formData);
    };

    return (
        <Modal show={show} onHide={handleClose} style={{
            scale: "0.9"

        }}>
            <Modal.Header closeButton>
                <Modal.Title>Edit Job</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formCompany">
                        <Form.Label>Select Employee</Form.Label>
                        <Form.Select
                            className="mt-1"
                            onChange={handleChange}
                            name="company"
                            value={formData.company}
                        >
                            <option value="default">Select Employee</option>
                            {companies.map(company => (
                                <option key={company.id} value={company.url}>{company.name}</option>
                            ))}
                        </Form.Select>
                    </Form.Group>

                    <Form.Group controlId="formTitle">
                        <Form.Label>Title</Form.Label>
                        <Form.Control type="text" name="title" value={formData.title} onChange={handleChange} />
                    </Form.Group>

                    <Form.Group controlId="formDescription">
                        <Form.Label>Description</Form.Label>
                        <Form.Control as="textarea" name="description" value={formData.description} onChange={handleChange} />
                    </Form.Group>

                    <Form.Group controlId="formLocation">
                        <Form.Label>Location</Form.Label>
                        <Form.Control type="text" name="location" value={formData.location} onChange={handleChange} />
                    </Form.Group>

                    <Form.Group controlId="formSalary">
                        <Form.Label>Salary</Form.Label>
                        <Form.Control type="text" name="salary" value={formData.salary} onChange={handleChange} />
                    </Form.Group>

                    <Form.Group controlId="formApplicationDeadline">
                        <Form.Label>Application Deadline</Form.Label>
                        <Form.Control type="date" name="application_deadline" value={formData.application_deadline} onChange={handleChange} />
                    </Form.Group>
                    <br />
                    <Button variant="primary" type="submit">
                        Save 
                    </Button> &nbsp;
                    <Button variant="dark" onClick={handleClose}>
                    Close
                    </Button>
                </Form>
            </Modal.Body>
            {/* <Modal.Footer>
                <Button variant="dark" onClick={handleClose}>
                    Close
                </Button>
            </Modal.Footer> */}
        </Modal>
    );
}
