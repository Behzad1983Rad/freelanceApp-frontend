import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {  useParams } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import EditJobModal from '../EditJobModal/EditJobModal';


export default function SingleJobView() {
    const [singleJob, setSingleJob] = useState({});
    const [showEditModal, setShowEditModal] = useState(false);
    const { jobid } = useParams()
   
    const navigate = useNavigate();

    useEffect(() => {
        async function getJob() {
            try {
                const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/jobs/${jobid}`,{
                    headers: {
                      
                      'Content-Type': 'application/json',
                      "Authorization": `Bearer ${localStorage.getItem("access_token")}`,
      
                    }
                  });
                setSingleJob(response.data);
            } catch (error) {
                console.error('Error fetching jobs:', error);
            }
        }
        getJob();
    }, [jobid]); 

    const handleDelete = async () => {
        try {
            await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/jobs/${jobid}`,{
                headers: {
                  
                  'Content-Type': 'application/json',
                  "Authorization": `Bearer ${localStorage.getItem("access_token")}`,
  
                }
              });
            console.log('Deleting job:', singleJob.title);
            navigate('/jobs');
        } catch (error) {
            console.error('Error deleting job:', error);
        }
    };

    const handleEdit = () => {
        setShowEditModal(true);
    };

    const handleCloseEditModal = () => {
        setShowEditModal(false);
    };

    const handleSaveEdit = async (updatedJob) => {
        try {
            await axios.put(`${process.env.REACT_APP_BACKEND_URL}/jobs/${jobid}/`, updatedJob ,{
                headers: {
                  
                  'Content-Type': 'application/json',
                  "Authorization": `Bearer ${localStorage.getItem("access_token")}`,
  
                }
              });
            setSingleJob(updatedJob);
            handleCloseEditModal();
        } catch (error) {
            console.error('Error updating job:', error);
        }
    };

    return (
        <div>
            <Card style={{backgroundColor:"#B6FF9B"}}>
                <Card.Body style={{backgroundColor:"#B6FF9B"}}>
                    <Card.Title><h3 style={{color:"green"}}>{singleJob.title}</h3></Card.Title>                
                </Card.Body>
                <Card.Footer>
                    <Card.Text><strong style={{color:"green"}}>Description:</strong> {singleJob.description}</Card.Text>
                    <Card.Text><strong style={{color:"green"}}>Location:</strong> {singleJob.location}</Card.Text>
                    <Card.Text><strong style={{color:"green"}}>Salary:</strong> {singleJob.salary}</Card.Text>
                    <Card.Text><strong style={{color:"green"}}>Application Deadline:</strong> {singleJob.application_deadline}</Card.Text>
                    <Button variant="outline-danger" onClick={handleDelete}>Delete</Button> &nbsp;
                    <Button variant="outline-primary" onClick={handleEdit}>Edit</Button>
                </Card.Footer>
            </Card>
            <EditJobModal 
                show={showEditModal}
                handleClose={handleCloseEditModal}
                handleSave={handleSaveEdit}
                job={singleJob}
            />
        </div>
    );
}
