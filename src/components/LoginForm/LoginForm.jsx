import { useState } from "react";
import axios from "axios";

import { Form, Button } from "react-bootstrap";

export default function LoginForm({ onLoginSuccess }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting login form...");
    const user = {
      username: username,
      password: password,
    };

    try {
      const { data } = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/token/`, user, {
        headers: { "Content-Type": "application/json" },
      }, {
        withCredentials: true,
      });

      console.log(data); 
      localStorage.clear()
      localStorage.setItem("access_token", data.access);
      localStorage.setItem("refresh_token", data.refresh);
      // axios.defaults.headers.common["Authorization"] = `Bearer ${data["access"]}`;

      if (onLoginSuccess) {
        onLoginSuccess(data); 
      }

      window.location.href = "/";
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <div className="Auth-form-container">
      <Form onSubmit={handleSubmit}>
        <div className="Auth-form-content" style={{
              scale: "0.84"
        }}>
          <h3 className="Auth-form-title">Sign In</h3>
          <Form.Group className="mt-3">
            <Form.Label>Username</Form.Label>
            <Form.Control 
              type="text" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
              required 
            />
          </Form.Group>
          <Form.Group className="mt-3">
            <Form.Label>Password</Form.Label>
            <Form.Control 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
          </Form.Group>
          <div className="d-grid gap-2 mt-3">
            <Button  variant="dark" type="submit" className="btn btn-primary">
              Submit
            </Button>
          </div>
        </div>
      </Form>
    </div>
  );
}
