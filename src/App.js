import axios from "axios"
import './App.css';
import {useEffect, useState} from 'react'

function App() {
const [jobsListing, setJobsListing] = useState()
async function getJobs() {
  const jobs =  await axios.get(`${process.env.REACT_APP_BACKEND_URL}/jobs`)
  const response = await jobs.JSON()
  setJobsListing(response)
  console.log(response)
}
useEffect(() => {
  getJobs()
})

  
  return (
    <div>

    </div>
  )
}

export default App;
