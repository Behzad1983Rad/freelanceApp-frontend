// import { useEffect, useState } from "react";
// import axios from "axios";
// // Define the Login function.
// const Home = () => {
//   const [message, setMessage] = useState("");
//   useEffect(() => {
//     if (localStorage.getItem("access_token") === null) {
//       window.location.href = "/login";
//     } else {
//       (async () => {
//         try {
//           const { data } = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/home/`, {
//             headers: {
//               "Content-Type": "application/json",
//               "Authorization": `Bearer ${localStorage.getItem("access_token")}`
//             },
//           });
//           setMessage(data.message);
//         } catch (e) {
//           console.log("not auth");
//         }
//       })();
//     }
//   }, []);
//   return (
//     <div className="form-signin mt-5 text-center">
//       <h3>Hi {message}</h3>
//     </div>
//   );
// };

// export default Home;

import { Card, Collapse , Button} from 'react-bootstrap'
import { useState } from 'react'

export default function Home() {
  const [openOverview, setOpenOverview] = useState(false);
  const [openMilestones, setOpenMilestones] = useState(false);
  const [openEndeavors, setOpenEndeavors] = useState(false);
  return (
    <div >
       
<div style={{ 
  display: 'flex',
  justifyContent: 'center',
  marginTop: '4%',
  gap: '4%',
 
  }}>
      <Card style={{ 
        width: '21rem',
        height: '29rem'
        
        }}>
       
        <Card.Body style={{backgroundColor: "#B6FF9B"}}>
            <Card.Title>App Overview</Card.Title>
            <Card.Text>
            Our Django React application offers a seamless platform for companies to manage profiles and list jobs effortlessly. With AWS integration, users can enhance their profiles with images, ensuring a visually engaging experience. Whether it's creating, reading, updating, or deleting content, our app streamlines these processes for maximum efficiency.
            </Card.Text>
            <Button
            onClick={() => setOpenOverview(!openOverview)}
            aria-controls="example-collapse-text"
            aria-expanded={openOverview}
            variant='light'
          >
            More..
          </Button>
          <Collapse in={openOverview}>
            <div id="example-collapse-text">
            With a focus on scalability and performance, our app is designed to adapt to the evolving needs of businesses, ensuring a future-proof solution for long-term success.
            </div>
          </Collapse>
          
        </Card.Body>
      </Card>
      <Card style={{ width: '21rem' }}>

        <Card.Body style={{backgroundColor: "#B6FF9B"}} >
          <Card.Title>App Milestones</Card.Title>
          <Card.Text>
          As of now, our app boasts comprehensive CRUD functionality, empowering users to manage their profiles and job listings with ease. From adding vibrant images to profiles to editing job details on the fly, our platform provides the tools necessary for effective content management. With a focus on user experience and functionality, we continue to refine and enhance every aspect of our application.
          </Card.Text>
          <Button
            onClick={() => setOpenMilestones(!openMilestones)}
            aria-controls="example-collapse-text"
            aria-expanded={openMilestones}
            variant='light'
          >
            More..
          </Button>
          <Collapse in={openMilestones}>
            <div id="example-collapse-text">
            Through rigorous testing and iterative development, we've fine-tuned every aspect of our application to deliver a smooth and intuitive user experience.
            </div>
          </Collapse>
          
        
        </Card.Body>
      </Card>
      <Card style={{ width: '21rem' }}>
       
        <Card.Body style={{backgroundColor: "#B6FF9B"}}>
          <Card.Title>Future Endeavors:</Card.Title>
          <Card.Text>
          Looking ahead, we're excited to expand our platform's capabilities by introducing freelance functionality. This upcoming feature will enable users to seamlessly connect with freelancers for their projects, further enhancing the versatility of our platform. Stay tuned as we work diligently to bring this exciting addition to fruition, empowering users with even more opportunities for collaboration and growth.
          </Card.Text>
          <Button
            onClick={() => setOpenEndeavors(!openEndeavors)}
            aria-controls="example-collapse-text"
            aria-expanded={openEndeavors}
            variant='light'
          >
            More..
          </Button>
          <Collapse in={openEndeavors}>
            <div id="example-collapse-text">
            By leveraging cutting-edge technologies and industry best practices, we're committed to staying ahead of the curve and delivering value-driven solutions that empower our users to succeed.
            </div>
          </Collapse>
        
          
        </Card.Body>
      </Card>
    </div>
    </div>

)}
