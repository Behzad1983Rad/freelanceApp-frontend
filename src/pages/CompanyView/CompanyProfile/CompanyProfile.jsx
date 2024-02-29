import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {  useParams } from 'react-router-dom';
import { Card, Button , Image, Col} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import EditProfileModal from './EditProfileModal';
import { v4 as uuidv4 } from 'uuid';

export default function CompanyProfile() {
    const [singleProfile, setSingleProfile] = useState({});
    const [showProfileEditModal, setShowProfileEditModal] = useState(false);
    const { companyid } = useParams();
    const navigate = useNavigate();
    // const [imageTitle, setImageTitle] = useState('')
    const [image, setImage] = useState(null)
    const [photoUrl, setPhotoUrl] = useState('');
   


    useEffect(() => {
        async function getProfile() {
            try {
              
                const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/companies/${companyid}`
                 ,{
                  headers: {
                    
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${localStorage.getItem("access_token")}`,

                  }
                }
                );
                setSingleProfile(response.data);
            } catch (error) {
                console.error('Error fetching company:', error);
            }
        }
        getProfile();
    }, [companyid]);

    const handleDelete = async () => {
        try {
            await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/companies/${companyid}`,{
              headers: {
                
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${localStorage.getItem("access_token")}`,

              }
            } 
            );
            console.log('Deleting profile:', singleProfile.name);
            navigate('/companies');
        } catch (error) {
            console.error('Error deleting company:', error);
        }
    };

    const handleEdit = () => {
        setShowProfileEditModal(true);
    };

    const handleCloseEditModal = () => {
        setShowProfileEditModal(false);
    };

    const handleSaveEdit = async (updateProfile) => {
      try {
          const response = await axios.put(
              `${process.env.REACT_APP_BACKEND_URL}/companies/${companyid}/`,
              updateProfile,
              {
                headers: {
                  
                  'Content-Type': 'application/json',
                  "Authorization": `Bearer ${localStorage.getItem("access_token")}`,

                }
              }
          );
          setSingleProfile(updateProfile);
          handleCloseEditModal();
          console.log('Response:' , response);
          navigate('/companies');
      } catch (error) {
          console.error('Error updating company:', error);
      }
  };

 

  const handleImageChange = (e) => {
    const myFile = e.target.files[0] 
    const blob = myFile.slice(0, myFile.size);
    const fileExt = myFile.name.split('.').pop();
    const newFile = new File([blob], `${uuidv4()}.${fileExt}`, { type: `${myFile.type}` });
    setImage(newFile);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(image);
    
    const body = {
      profile: companyid,
      url: image
    }
    console.log(body)
    console.log(localStorage.getItem("access_token"))
    axios.post(`${process.env.REACT_APP_BACKEND_URL}/add_photo/`, body,{
      headers: {
        
        'Content-Type': 'multipart/form-data',
        "Authorization": `Bearer ${localStorage.getItem("access_token")}`,

      }
    }
    )
    .then((res) => {
      console.log(res.data);
    })
    .catch((err) => console.log(err));  
  }

  useEffect(() => {
    async function fetchPhotoUrl() {
        try {
            const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/company/${companyid}/photo/` 
            ,{
              headers: {
                
                'Content-Type': 'multipart/form-data',
                "Authorization": `Bearer ${localStorage.getItem("access_token")}`,

              }
            });
            setPhotoUrl(response.data.url);
        } catch (error) {
            console.error('Error fetching photo:', error);
        }
    }
    fetchPhotoUrl();
}, [companyid]);


  

    return (
  <div style={{
    scale: "0.86"
  }}>
  <Card>
    <Card.Body style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' , backgroundColor:"#B6FF9B"}}>
      <div>
        <Card.Title>{singleProfile.name}</Card.Title> <br />
        {photoUrl && (
          <Col xs={6} md={4}>
            <Image src={photoUrl} alt="Profile" style={{ maxWidth: '100%', maxHeight: '150px' }} rounded />
          </Col>
        )}
       <br />
        <Card.Text><strong>Name:</strong> {singleProfile.name}</Card.Text> 
        <Card.Text><strong>Website: </strong>{singleProfile.website}</Card.Text>
        <div>
          <Button variant="outline-danger" onClick={handleDelete}>Delete</Button> &nbsp;
          <Button variant="outline-primary" onClick={handleEdit}>Edit</Button> &nbsp;
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", marginRight: '10px' }}>
        <br />
            <p style={{ margin: '0' }}>
              <input
                type="file"
                id="image"
                accept="image/png, image/jpeg"
                onChange={handleImageChange}
                required
              />
            </p>
           <br />
            <input type="submit" value="Upload" />
          </form>
        </div>
      </div>
      <div style={{ textAlign: 'right' }}>
      <Card.Text style={{ textAlign: 'left' , marginTop:"4px"}}><strong>Bio:</strong> <br /> <br />{singleProfile.description}</Card.Text>
      </div>
    </Card.Body>
  </Card>

          
            <EditProfileModal
                show={showProfileEditModal}
                handleClose={handleCloseEditModal}
                handleSave={handleSaveEdit}
                company={singleProfile}
            />
        </div>
    );
}


      