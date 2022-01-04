import React, { useState } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import "./App.css";
import { Link, Redirect } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner"

const Signup = () => {
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [username, setUsername] = useState("");
  let [phone, setPhone] = useState("");
  let [role, setRole] = useState("");
  const [loading,setLoading] = useState(false);
  

  const signupFunc = async (event) => {
    event.preventDefault();
    setLoading(true);
    let data = {
      username: username,
      email: email,
      password: password,
      phone: phone,
      role: role,
    };

    let url = "https://ticket-management-tool.herokuapp.com/api/register";
    
    let response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    let Fetchdata = await response.json();
    console.log("Fetched Data", Fetchdata);
    if (Fetchdata.status === 200) {
      alert("Registration successfull");
      <Redirect to="/login"/>
    }
    setEmail("");
    setPassword("");
    setUsername("");
    setPhone("");
    setRole("");
    setLoading(false);
  };

  return (
    <div className="container mt-3 signup-div">
      <div className="card col-lg-6 col-md-8 col-xs-12 card-bg text-center">
        <h2>Sign Up</h2>
        <p>Please fill in this form to create an account!</p>
        <hr />
        <div className="card-body signup-body">
          <Form className="form-group" onSubmit={signupFunc} method="POST">
            <div className="input-group">
              <span>
                <i className="fa fa-user signup_icon"></i>
              </span>
              <Form.Control
                type="text"
                name="username"
                id="username"
                className="bg-light form-control mb-2"
                onChange={(e) => setUsername(e.target.value)}
                value={username}
                placeholder="Username"
                required
              />
            </div>
            <div className="input-group">
              <span>
                <i className="fa fa-envelope signup_icon"></i>
              </span>
              <Form.Control
                type="email"
                name="email"
                id="email"
                className="bg-light form-control mb-2"
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                value={email}
                required
              />
            </div>
            <div className="input-group">
              <span>
                <i className="fa fa-lock signup_icon"></i>
              </span>
              <Form.Control
                type="password"
                name="password"
                id="password"
                className="bg-light form-control mb-2"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                placeholder="Password"
                required
              />
            </div>
            <div className="input-group">
              <span>
                <i className="fa fa-phone signup_icon"></i>
              </span>
              <Form.Control
                type="tel"
                name="phone"
                id="phone"
                className="bg-light form-control mb-2"
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Phone"
                value={phone}
                required
              />
            </div>
            <div className="input-group">
              <span>
                <i className="fa fa-user signup_icon"></i>
              </span>
              <select
                className="form-control mb-2"
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="">Select Role</option>
                <option value="admin">Admin</option>
                <option value="customer">Customer</option>
                <option value="agent">Agent</option>
              </select>
            </div>

            <Button type="submit" className="btn btn-info px-3 mt-3">
              Sign Up {loading && <Spinner animation="border" variant="light" />}
            </Button>
          </Form>
          <div>
            <Link to="/">Back to Login</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
