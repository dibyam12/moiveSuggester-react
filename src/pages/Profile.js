import React from "react";
import { useHistory, Link } from "react-router-dom/cjs/react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import MyNavbar from "../components/MyNavbar";
import { Container, Button, Modal } from "react-bootstrap";

const Profile = () => {
  const history = useHistory();
  const [userData, setUserData] = useState({});

  const [modalShown, setModelShown] = useState(false);

  useEffect(() => {
    getProfile();
  }, []);

  const getProfile = async () => {
    const getAccessToken = localStorage.getItem("accessToken");
    try {
      const response = await axios.post(
        "https://api.dynoacademy.com/test-api/v1/me",

        {
          timeout: 10000,
          headers: {
            Authorization: `Bearer ${getAccessToken}`,
          },
        }
      );
      // alert(response.data.message);

      setUserData(response.data.data);
    } catch (error) {
      if (error.response) {
        alert(error.response.data.errors[0].message);
      } else {
        alert("Unknown error occurred.. Try again later");
      }
    }
  };

  const logOut = () => {
    setModelShown(true);
  };

  return (
    <>
      <MyNavbar />
      <Container className="mt-1">
        <br />
        <br />
        {/* {<Link to="/"> Return to HomePage </Link>} */}
        Name:{userData.name}
        <br />
        <br />
        Email:{userData.email}
        <br />
        <br />
        Country:{userData.location}
        <br />
        <br />
        {/* {  <button onClick={logOut}> LogOut </button>} <br /> <br /> */}
        <Button variant="dark" onClick={logOut}>
          LogOut
        </Button>
      </Container>

      <Modal
        show={modalShown}
        onHide={() => {
          setModelShown(true);
        }}
      >
        <Modal.Body>Are you sure you want to LogOut</Modal.Body>
        <Modal.Footer>
          <Button
            variant="dark"
            onClick={() => {
              setModelShown(false);
            }}
          >
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              localStorage.removeItem("accessToken");
              history.replace("/");
            }}
          >
            LogOut
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Profile;
