import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export default function AddJobForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    company: '',
    title: '',
    description: '',
    location: '',
    salary: '',
    application_deadline: '',
  });
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log('Form Data:', formData);
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/jobs/`,
        formData,
        {
              headers: {
                
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${localStorage.getItem("access_token")}`,

              }
            }
      );
      console.log('Response:' , response);
      // onJobAdded(response.data);
      navigate('/jobs');
    } catch (error) {
      console.error('Error adding job:', error);
    }
  };

  return (
    
    <Form onSubmit={handleSubmit} style={{
      scale: "0.86",
      backgroundColor: "#B6FF9B"
    }}>
      <Form.Select
        className="mt-1"
        onChange={handleChange}
        name="company"
        value={formData.company}
      >
        <option value="">Select Employee</option>
        {companies.map(company => (
          <option key={company.id} value={company.url}>{company.name}</option>
        ))}
      </Form.Select> <br />
      

      <Form.Control type="text" name="title" placeholder="Job Title" value={formData.title} onChange={handleChange} /> <br />
      <Form.Control as="textarea" name="description" placeholder="Job Description" value={formData.description} onChange={handleChange} /> <br />
      <Form.Control type="text" name="location" placeholder="Location" value={formData.location} onChange={handleChange} /> <br />
      <Form.Control type="text" name="salary" placeholder="Salary" value={formData.salary} onChange={handleChange} /> <br />
      <Form.Control type="date" name="application_deadline" value={formData.application_deadline} onChange={handleChange} />
      <div className="mt-3">
        <Button type="submit" className="me-2" variant='light'>Add Job</Button>
       
      </div>
    </Form>
  );
}
