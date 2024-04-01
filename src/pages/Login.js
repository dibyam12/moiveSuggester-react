import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import { useRef } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import MyNavbar from "../components/MyNavbar";
import { Container, Modal } from "react-bootstrap";

const Login = () => {
  const email = useRef();
  const password = useRef();

  const [modalShown, setModelShown] = useState(false);
  const [modelText, setModelText] = useState("");

  const history = useHistory();
  const loginHandler = async (e) => {
    e.preventDefault();
    const loginData = {
      email: email.current.value,
      password: password.current.value,
    };
    try {
      const response = await axios.post(
        "https://api.dynoacademy.com/test-api/v1/login",
        loginData,
        {
          timeout: 10000,
        }
      );

      const getAccessToken = response.data.accessToken;
      localStorage.setItem("accessToken", getAccessToken);

      if (response.data.status === "success") {
        setModelShown(true);
        setModelText("Logged In Successfully");
      }
      setTimeout(() => {
        history.replace("/");
      }, 2000);
    } catch (error) {
      try {
        if (error.response) {
          alert(error.response.data.errors[0].message);
        } else {
          // alert("Unknown error occurred.. Try again later");
          setModelText("Unknown error occurred.. Try again later");
          setModelShown(true);
        }
      } catch (errors) {
        // alert("Unknown error occurred.. Try again later");
        setModelShown(true);
        setModelText("Unknown error occurred.. Try again later");
      }
    }
  };
  const returnHome = () => {
    history.push("/");
  };
  return (
    <>
      <MyNavbar />
      <Container className="mt-5 ">
        <h2 className="text-center">Login Screen</h2> <br />
        <form onSubmit={loginHandler}>
          {/*    Email:
          <br />
          <input type="text" placeholder="email" ref={email} /> <br /> <br />
          Password:
          <br />
          <input
            type="password"
            placeholder="password"
            ref={password}
          /> <br /> <br />
          <button>Login </button> <br /> <br />
      */}
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email </Form.Label>
            <Form.Control type="email" placeholder="Enter email" ref={email} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Password </Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter Password"
              ref={password}
            />
          </Form.Group>
          <Button variant="dark" type="submit">
            Login
          </Button>
        </form>{" "}
        <br />
        <br />
        {/* { <button onClick={returnHome}>Return</button>} */}
        <Button variant="primary" onClick={returnHome}>
          Return Home
        </Button>
      </Container>

      <Modal
        show={modalShown}
        onHide={() => {
          setModelShown(true);
        }}
      >
        <Modal.Body>{modelText}</Modal.Body>
        <Modal.Footer>
          <Button
            variant="dark"
            onClick={() => {
              setModelShown(false);
            }}
          >
            Ok
          </Button>
          {/* <Button variant="primary" onClick={handleClose}>
            Ok
          </Button> */}
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Login;
