import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
// import { useState } from 'react';
import { Link } from "react-router-dom"
// import LoginFormModal from '../../components/LoginFormModal/LoginFormModal';

export default function NavBarFreelance() {
// const [showLoginFormModal, setShowLoginFormModal] = useState(false);
// const [showSignupFormModal, setShowSignupFormModal] = useState(false);


  function handleClick() {
  }

//   function handleLogOut() {
//     userService.logOut();
//     navigate('/');
//     setUser(null);
//   }

//   function checkScreenSize() {
//     setIsSmallScreen(window.innerWidth < 768);
//   }

//   window.addEventListener('resize', checkScreenSize);

  return (
    <div>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
        <Nav.Link as={Link} to="/"></Nav.Link>
          <Navbar.Brand as={Link} to="/">FreelanceNav</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
          <Navbar.Collapse id="responsive-navbar-nav">
            {/* {isSmallScreen ? ( */}
              <Nav className="me-auto">
                {/* <Nav.Link as={Link} to="/" onClick={handleClick}>Home</Nav.Link> */}
                <Nav.Link as={Link} to="/jobs" onClick={handleClick}>Jobs</Nav.Link>
                <Nav.Link as={Link} to="/companies" onClick={handleClick}>Companies</Nav.Link>
                <Nav.Link as={Link} to="/aboutus" onClick={handleClick}>About Us</Nav.Link>
                <Nav.Link as={Link} to="/contactus" onClick={handleClick}>Contact Us</Nav.Link>
                <Nav.Link as={Link} to="/freelanceprofile" onClick={handleClick}>Profile</Nav.Link>
                <Nav.Link as={Link} to="/login" onClick={handleClick}>Log In</Nav.Link>
                <Nav.Link as={Link} to="/signup" onClick={handleClick}>Sign Up</Nav.Link>
                <Nav.Link as={Link} to="/logout" onClick={handleClick}>Log Out</Nav.Link>
              </Nav>
            {/* // ) : (
            //   <Nav className="me-auto">
            //     <Nav.Link as={Link} to="/" onClick={handleClick}>Home</Nav.Link>
            //     <Nav.Link as={Link} to="/products" onClick={handleClick}>Products</Nav.Link>
            //     <Nav.Link as={Link} to="/aboutus" onClick={handleClick}>About Us</Nav.Link>
            //     <Nav.Link as={Link} to="/contactus" onClick={handleClick}>Contact Us</Nav.Link>
            //   </Nav>
            // )} */}
            {/* <Nav>
             
                <>
                  <Nav.Link as={Link} to="/cart">
                    <img
                      src="https://www.shareicon.net/data/2016/02/07/281223_cart_512x512.png"
                      width="40vh"
                      height="35vh"
                      className="d-inline-block align-top"
                      alt="Shopping cart logo"
                    />
                  </Nav.Link>
                  &nbsp;
                  &nbsp;
                  <div className='d-flex align-items-center'>
                    <h5 style={{color: "white", paddingTop: '4%'}}>Welcome {user.name}</h5>
                    &nbsp;
                    &nbsp;
                    <Button variant="secondary" onClick={handleLogOut}>Log out</Button>
                  </div>
                </>
            
                <>
               
                  <Button variant="secondary" onClick={() => setShowLoginFormModal(true)}>Log in</Button>
                  &nbsp;
                  &nbsp;
                  <Button variant="secondary" onClick={() => setShowSignupFormModal(true)}>Sign up</Button>
                </div>
                </>
           
            </Nav> */}
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {/* <LoginFormModal show={showLoginFormModal} handleClose={() => setShowLoginFormModal(false)} setUser={setUser} />
      <SignUpFormModal show={showSignupFormModal} handleClose={() => setShowSignupFormModal(false)} setUser={setUser} /> */}
    </div>
  );
}
