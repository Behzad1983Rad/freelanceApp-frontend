import { Form, Button } from "react-bootstrap";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';

export default function Signup({ onSignupSuccess }) {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newUser = {
      username: username,
      email: email,
      password: password,
    };

    try {
      const { data } = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/signup/`, newUser, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      console.log(data)
      localStorage.setItem("access_token", data.access);
      localStorage.setItem("refresh_token", data.refresh);
      axios.defaults.headers.common["Authorization"] = `Bearer ${data["access"]}`;

      if (onSignupSuccess) {
        onSignupSuccess(data);
      }

      navigate('/');
    } catch (error) {
      console.error("Signup error:", error);
    }
  };

  return (
    <Form onSubmit={handleSubmit} style={{
      scale: "0.84"
    }}>
      <Form.Group>
      <h3 className="Auth-form-title">Sign Up</h3>
        <Form.Label>Username</Form.Label>
        <Form.Control 
          type="text" 
          value={username} 
          onChange={(e) => setUsername(e.target.value)} 
          required 
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Email</Form.Label>
        <Form.Control 
          type="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required 
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Password</Form.Label>
        <Form.Control 
          type="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required 
        />
      </Form.Group>
      <div className="mt-2">
        <Button type="submit" variant="dark">
          Sign Up
        </Button>
      </div>
    </Form>
  );
}
