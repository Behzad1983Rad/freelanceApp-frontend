
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Form, Modal, Button } from 'react-bootstrap';
// export default function EditProfileModal({ show, handleClose, handleSave, company }) {
//     const [formData, setFormData] = useState({ ...company });
//     const [companies, setCompanies] = useState([]);

//     useEffect(() => {
//         const fetchCompanies = async () => {
//             try {
//                 const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/companies/`);
//                 setCompanies(response.data);
//             } catch (error) {
//                 console.error('Error fetching companies:', error);
//             }
//         };

//         fetchCompanies();
//     }, []);

    
//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData(prevFormData => ({
//             ...prevFormData,
//             [name]: value
//         }));
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         handleSave(formData);
//     };

//     return (
//         <Modal show={show} onHide={handleClose}>
//             <Modal.Header closeButton>
//                 <Modal.Title>Edit Profile</Modal.Title>
//             </Modal.Header>
//             <Modal.Body>
//                 <Form onSubmit={handleSubmit}>
//                     <Form.Group controlId="formCompany">
//                         <Form.Label>Select Company</Form.Label>
//                         <Form.Select
//                             className="mt-1"
//                             onChange={handleChange}
//                             name="company"
//                             value={formData.company}
//                         >
//                             <option value="default">Select Company</option>
//                             {companies.map(company => (
//                                 <option key={company.id} value={company.url}>{company.name}</option>
//                             ))}
//                         </Form.Select>
//                     </Form.Group>

//                     <Form.Group controlId="formTitle">
//                         <Form.Label>Profile Name:</Form.Label>
//                         <Form.Control type="text" name="title" value={formData.name} onChange={handleChange} />
//                     </Form.Group>

//                     <Form.Group controlId="formDescription">
//                         <Form.Label>Description</Form.Label>
//                         <Form.Control as="textarea" name="description" value={formData.description} onChange={handleChange} />
//                     </Form.Group>

//                     <Form.Group controlId="formLocation">
//                         <Form.Label>Website</Form.Label>
//                         <Form.Control type="text" name="location" value={formData.website} onChange={handleChange} />
//                     </Form.Group>

//                     <Button variant="primary" type="submit">
//                         Save 
//                     </Button> &nbsp;
//                     <Button variant="secondary" onClick={handleClose}> 
//                     Close
//                     </Button>
//                 </Form>
//             </Modal.Body>
//             <Modal.Footer>
                
//             </Modal.Footer>
//         </Modal>
//     );
// }

// EditProfileModal.js
import React, { useState } from 'react';
import { currentUser } from '../../../lib/currentUser';
import { Modal, Button, Form } from 'react-bootstrap';

export default function EditProfileModal({ show, handleClose, handleSave, company }) {
    const [updatedProfile, setUpdatedProfile] = useState({ ...company });
    console.log(currentUser())
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdatedProfile(prevState => ({
            ...prevState,
            user: currentUser(),
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        handleSave(updatedProfile);
    };

    return (
        <Modal show={show} onHide={handleClose} >
            <Modal.Header closeButton>
                <Modal.Title>Edit Company Profile</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{backgroundColor: "#B6FF9B"}}>
                <Form onSubmit={handleSubmit} >
                    <Form.Group controlId="formCompanyName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" name="name" value={updatedProfile.name} onChange={handleChange} />
                    </Form.Group>
                    <Form.Group controlId="formCompanyDescription">
                        <Form.Label>Bio</Form.Label>
                        <Form.Control as="textarea" rows={3} name="description" value={updatedProfile.description} onChange={handleChange} />
                    </Form.Group>
                    <Form.Group controlId="formCompanyWebsite">
                        <Form.Label>Website</Form.Label>
                        <Form.Control type="text" name="website" value={updatedProfile.website} onChange={handleChange} />
                    </Form.Group>
                    <br />
                    <Button variant="dark" type="submit">
                        Save Changes
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
}
