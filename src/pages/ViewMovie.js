import React from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import MyNavbar from "../components/MyNavbar";
import { Container, Card } from "react-bootstrap";
export const ViewMovie = () => {
  const getParams = useParams();
  const getID = getParams.id;

  const [movieData, setMovieData] = useState({});

  const getSingleMovieInfo = async () => {
    try {
      const response = await axios.get(
        `https://api.dynoacademy.com/test-api/v1/movie/${getID}`
      );
      setMovieData(response.data.singleMovieData);
    } catch (error) {
      alert("Error ocurred!!");
    }
  };

  useEffect(() => {
    getSingleMovieInfo();
  }, []);

  return (
    <>
      <MyNavbar />
      <Container>
        <br />
        <h1>
          {movieData.name} <br />
        </h1>
        <br />
        <Card style={{ border: "none" }}>
          <Card.Img
            variant="top"
            src={movieData.image}
            style={{ maxWidth: "300px" }}
          />
          <Card.Body>
            <h4>Info :</h4> {movieData.info}
          </Card.Body>
          <br />
          <br />
          <Card.Body>
            {" "}
            <h4> Description : </h4>
            {movieData.desc} <br /> <br />
            <h4>Rating: {movieData.rating}</h4>{" "}
          </Card.Body>
        </Card>
        <br />
        <br />
      </Container>{" "}
    </>
  );
};
