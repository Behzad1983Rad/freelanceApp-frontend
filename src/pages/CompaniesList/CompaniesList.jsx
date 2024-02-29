import axios from "axios"
import {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'

export default function CompaniesList() {

    const [companiesListing, setCompaniesListing] = useState([])
    async function getCompanies() {
      try {
    
      const companies =  await axios.get(`${process.env.REACT_APP_BACKEND_URL}/companies/` , {
        headers: {
          'Content-Type': 'application/json', 
          "Authorization": `Bearer ${localStorage.getItem("access_token")}`,

        }
      })
      console.log(companies)  
      setCompaniesListing(companies.data)
    }
    catch(error) {
      console.log(error)
    }
    
    }
    useEffect(() => {
      getCompanies()
    } , [])



  return (
    <>
  

        <div>
        <ul>
            {companiesListing && companiesListing.map((listing) => (
                <li key={listing.id}>
                    <Link to={`/companies/${listing.id}`}>
                        {listing.name} 
                    </Link>
                </li>
            ))}
        </ul>
    </div>
    </>
  )
}



