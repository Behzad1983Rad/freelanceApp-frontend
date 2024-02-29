import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { Link } from "react-router-dom"
import { useState , useEffect } from 'react';

import './NavBarCompany.css'

export default function NavBarCompany() {
const [isAuth , setIsAuth] = useState(false)

useEffect(() => {
  if (localStorage.getItem("access_token") !== null) {
    setIsAuth(true);
  }
}, [isAuth]);


  function handleClick() {
  }


  return (
    <div className='navBar'>
      <Navbar bg="light" variant="light" expand="lg" >
        <Container>
        <Nav.Link as={Link} to="/"></Nav.Link>
          <Navbar.Brand as={Link} to="/"> <strong style={{color:"green"}}>Work Wise</strong></Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
          <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="navbarLinks">
                { isAuth ? (
                  <>
                <Nav.Link as={Link} to="/jobs" onClick={handleClick}><span style={{color:"green"}}>Jobs</span></Nav.Link>
                <Nav.Link as={Link} to="/companies" onClick={handleClick}><span style={{color:"green"}}>Profile</span></Nav.Link>
                <Nav.Link as={Link} to="/aboutus" onClick={handleClick}><span style={{color:"green"}}>About Us</span></Nav.Link>
                <Nav.Link as={Link} to="/contactus" onClick={handleClick}><span style={{color:"green"}}>Contact Us</span></Nav.Link>
                {/* <Nav.Link as={Link} to="/companyprofile" onClick={handleClick}>Profile</Nav.Link> */}
                <Nav.Link as={Link} to="/companies/add" onClick={handleClick}><span style={{color:"green"}}>Add Profile</span></Nav.Link>
                <Nav.Link as={Link} to="/jobs/add" onClick={handleClick}><span style={{color:"green"}}>Add Jobs</span></Nav.Link>
                <Nav.Link as={Link} to="/logout" onClick={handleClick}><span style={{color:"green"}}>Log Out</span></Nav.Link>
                </>
                ) : 
                (
                <>
                <Nav.Link as={Link} to="/aboutus" onClick={handleClick}><span style={{color:"green"}}>About Us</span></Nav.Link>
                <Nav.Link as={Link} to="/contactus" onClick={handleClick}><span style={{color:"green"}}>Contact Us</span></Nav.Link>
                <Nav.Link as={Link} to="/login" onClick={handleClick}><span style={{color:"green"}}>Log In</span></Nav.Link>
                <Nav.Link as={Link} to="/signup" onClick={handleClick}><span style={{color:"green"}}>Sign Up</span></Nav.Link>
                
                </>
               )}
              </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      
    </div>
  );
}
