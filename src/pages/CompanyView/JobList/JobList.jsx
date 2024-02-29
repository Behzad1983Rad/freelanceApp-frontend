import React from 'react'
import {Link} from 'react-router-dom'
import axios from "axios"
import {useEffect, useState} from 'react'
import { currentUser } from '../../../lib/currentUser'
// import { ListGroup } from 'react-bootstrap'

export default function JobList() {
const [jobsListing, setJobsListing] = useState()
async function getJobs() {
  const jobs =  await axios.get(`${process.env.REACT_APP_BACKEND_URL}/jobs/`,{
    headers: {
      
      'Content-Type': 'application/json',
      "Authorization": `Bearer ${localStorage.getItem("access_token")}`,

    }
  })
  console.log(jobs)  
  setJobsListing(jobs.data)

}
useEffect(() => { 
  const userId = currentUser()
  console.log(userId)
  getJobs(userId)
  
} , [])
  return (
    <div style={{backgroundColor:"#B6FF9B" , paddingTop:"3%"       
    }} >
      <h3 style={{ marginLeft: "1%"}}>Jobs List</h3>
    <ol>
        {jobsListing && jobsListing.map((listing) => (
            <li key={listing.id}>
                <Link to={`/jobs/${listing.id}`}>
                    {listing.title} {listing.location}
                </Link>
            </li>
        ))}
    </ol>
    {/* <ListGroup variant="flush" >
    {jobsListing && jobsListing.map((listing) => (
      <ListGroup.Item style={{backgroundColor:"#B6FF9B"}}> 
        <Link to={`/jobs/${listing.id}`}>
                    {listing.title} {listing.location}
        </Link>
      </ListGroup.Item>
    ))}
    
    </ListGroup> */}
</div>
 
  )
}
