import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";
import Router from "next/router";
import Head from "next/head";
import { Tab, Nav, Form, Button } from "react-bootstrap";
import AuthService from "services/auth.service";
const authService = new AuthService();

export default function test() {
  //button active color onclick
  const [active, buttonActive] = useState(false);

  //form validation
  const [validated, setValidated] = useState(false);
  const activeButton = () => buttonActive(!active);

  //user login
  const [emailOne, setEmailOne] = useState([]);
  const [passwordOne, setPasswordOne] = useState([]);

  //Form validation
  const handleSubmit = (event: any) => {
    const form = event.currentTarget;
    event.preventDefault();
    event.stopPropagation();
    if (form.checkValidity() === false) {
      setValidated(true);
    } else {
      userLogin();
    }
  };

  //user login
  const userLogin = async () => {
    setValidated(true);
    const response = await fetch("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({
        email: emailOne,
        password: passwordOne,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    alert(data.xtoken);
    localStorage.setItem("user_token", data.xtoken);
  };

  //User Signup
  const [firstName, setFirstName] = useState([]);
  const [lastName, setLastName] = useState([]);
  const [email, setemail] = useState([]);
  const [mobileNumber, setmobileNumber] = useState([]);
  const [password, setpassword] = useState([]);

  const userDetails = async () => {
    try {
      const payload = { firstName, lastName, mobileNumber, email, password };
      const response = await authService.signup(payload);
      await authService.setAccessToken(response.xtoken);
      toast.success(response.message);
    } catch (e: any) {
      toast.error(e.toString());
    }
    // const response = await fetch("/api/auth/signup", {
    //   method: "POST",
    //   body: JSON.stringify({
    //     firstName,
    //     lastName,
    //     mobileNumber,
    //     email,
    //     password,
    //   }),
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // });
    // const data = await response.json();
    // // alert(data.message);
    // toast.success(data.message);
  };

  return (
    <div>
      <div
        className="d-flex align-items-center justify-content-center overflow-auto"
        style={{ background: "#35384dfc", height: "100vh" }}
      >
        <div className="container-card bg-white h-100">
          <div className="row h-100">
            <div className="col-12 col-md-6 d-none d-md-block has-bg-img">
              <div className="centered">
                Fashion is the armor to surive the reality of everyday life
              </div>
            </div>
            <div className="col-12 col-md-6 h-100 p-0">
              <div className="d-flex flex-column h-100 w-100 m-0 p-4">
                <Tab.Container defaultActiveKey="login">
                  <Nav className="d-flex align-items-baseline">
                    <Nav.Item className="w-50">
                      <Nav.Link
                        eventKey="login"
                        className="px-0 font-medium tab-active"
                        onClick={() => {
                          if (active) buttonActive(!active);
                        }}
                        style={{ color: active ? "black" : "red" }}
                      >
                        Login
                      </Nav.Link>
                    </Nav.Item>

                    <Nav.Item className="w-50">
                      <Nav.Link
                        eventKey="signup"
                        className="px-0 font-medium tab-active"
                        // onClick={activeButton}
                        onClick={() => {
                          if (!active) buttonActive(!active);
                        }}
                        style={{ color: active ? "red" : "black" }}
                      >
                        Sign up
                      </Nav.Link>
                    </Nav.Item>
                  </Nav>

                  <Tab.Content className="mt-2">
                    <Tab.Pane eventKey="login">
                      <Form
                        noValidate
                        validated={validated}
                        onSubmit={handleSubmit}
                      >
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                          <Form.Label>Email</Form.Label>
                          <Form.Control
                            size="sm"
                            type="email"
                            placeholder="Enter Email"
                            required
                            value={emailOne}
                            onChange={(e: any) => setEmailOne(e.target.value)}
                          />
                          <Form.Control.Feedback type="invalid">
                            Please provide Mobile Number
                          </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                          <Form.Label>Enter Password</Form.Label>
                          <Form.Control
                            size="sm"
                            type="password"
                            placeholder="Enter Password"
                            required
                            value={passwordOne}
                            onChange={(e: any) =>
                              setPasswordOne(e.target.value)
                            }
                          />
                          <Form.Control.Feedback type="invalid">
                            Please Enter Passowrd
                          </Form.Control.Feedback>
                        </Form.Group>
                        <div className="d-grid gap-2">
                          <Button type="submit" variant="danger" size="sm">
                            Login
                          </Button>
                        </div>
                        <p className="agree mt-2">
                          You agree with our terms of use & privacy by sigining
                          up.
                        </p>
                      </Form>
                    </Tab.Pane>
                    <Tab.Pane eventKey="signup">
                      {/* <form action=""> */}
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control
                          size="sm"
                          type="text"
                          placeholder="First Name"
                          required
                          value={firstName}
                          onChange={(e: any) => setFirstName(e.target.value)}
                        />
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control
                          size="sm"
                          type="text"
                          placeholder="Last Name"
                          required
                          value={lastName}
                          onChange={(e: any) => setLastName(e.target.value)}
                        />
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                          size="sm"
                          type="text"
                          placeholder="Email"
                          required
                          value={email}
                          onChange={(e: any) => setemail(e.target.value)}
                        />
                        <Form.Label>Mobile Number</Form.Label>
                        <Form.Control
                          size="sm"
                          type="text"
                          placeholder="Mobile Number"
                          required
                          value={mobileNumber}
                          onChange={(e: any) => setmobileNumber(e.target.value)}
                        />
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                          type="password"
                          placeholder="Password"
                          required
                          value={password}
                          onChange={(e: any) => setpassword(e.target.value)}
                        />
                      </Form.Group>

                      <div className="d-grid gap-2">
                        <Button
                          onClick={userDetails}
                          type="submit"
                          variant="danger"
                          size="sm"
                        >
                          Sign Up
                        </Button>
                      </div>
                      {/* </form> */}
                    </Tab.Pane>
                  </Tab.Content>
                </Tab.Container>
                <div className="d-flex justify-content-center h-100 mt-2">
                  <img width="30%" className="align-self-end" src="/logo.png" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
