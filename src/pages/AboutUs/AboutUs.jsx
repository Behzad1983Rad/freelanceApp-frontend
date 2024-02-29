import {Card} from 'react-bootstrap'
export default function AboutUs() {
  return (
    <div style={{ 
      display: 'flex',
      justifyContent: 'center',
      marginTop: '4%',
      gap: '4%'
      }}>
          <Card style={{ 
            width: '69rem',
            height: '29rem'
            
            }}>
           
            <Card.Body style={{backgroundColor: "#B6FF9B"}}>
              <Card.Title>About Me</Card.Title>
              <Card.Text>
              Hi there! I'm Behzad, a passionate software engineer with a knack for building innovative web applications. My journey into the world of technology began when I pursued a rigorous curriculum in Software Engineering at GA Bootcamp, where I honed my skills and developed a strong foundation in programming principles.

For my final project, I embarked on the exciting challenge of creating a dynamic web application that seamlessly combines the power of Python, Django, React, and PostgreSQL. Leveraging the versatility of these technologies, I crafted an intuitive platform that empowers companies to manage profiles, list jobs, and collaborate efficiently.

Utilizing Django's REST framework, I ensured seamless communication between the frontend and backend, enabling smooth data exchange and interaction. Additionally, I integrated AWS to facilitate hassle-free profile photo uploads, enhancing the visual appeal of user profiles.

Throughout the development process, I maintained a keen focus on user experience and functionality, striving to deliver a polished product that exceeds expectations. With Bootstrap, I crafted responsive and visually appealing interfaces, ensuring a seamless experience across devices.

I'm excited to continue my journey in the world of software engineering, constantly seeking new challenges and opportunities for growth. Let's connect on  <a href="https://www.linkedin.com/in/behzad-radgizadeh/">LinkedIn</a> where you can learn more about my professional journey and projects.              </Card.Text>
              
            </Card.Body>
          </Card>
    </div>
  )
}
