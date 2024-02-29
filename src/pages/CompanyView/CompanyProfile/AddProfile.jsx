import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { currentUser } from '../../../lib/currentUser';

export default function AddProfile() {
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState({
    user: currentUser(),
    name: '',
    description: '',
    website: '',
  
  });

  console.log('CURRENT USER: ' , currentUser())


  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log('Profile Data:', profileData);
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/companies/`,
        profileData,
        {
            headers: {
              
              'Content-Type': 'application/json',
              "Authorization": `Bearer ${localStorage.getItem("access_token")}`,

            }
          }
      );
      console.log('Response:' , response);
      navigate('/companies');
    } catch (error) {
      console.error('Error adding profile:', error);
    }
  };

  return (
    
    <Form onSubmit={handleSubmit} style={{
      scale: "0.86",
      backgroundColor: "#B6FF9B"
    }}>    

      <Form.Control type="text" name="name" placeholder="Name" value={profileData.name} onChange={handleChange} /> <br />
      <Form.Control as="textarea" name="description" placeholder="Bio" value={profileData.description} onChange={handleChange} /> <br />
      <Form.Control type="text" name="website" placeholder="Website" value={profileData.website} onChange={handleChange} />

      <div className="mt-3">
        <Button type="submit" className="me-2" variant='light'>Add a Profile</Button>
       
      </div>
    </Form>
  );
}
