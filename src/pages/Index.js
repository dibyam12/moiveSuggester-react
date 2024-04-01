import React from "react";
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom";
import { useEffect } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import MyNavbar from "../components/MyNavbar";
import SingleMovie from "../components/SingleMovie";
import { Row, Form, Container, Spinner } from "react-bootstrap";

const Index = () => {
  const history = useHistory();

  const [movies, setMovies] = useState([]);

  const [isError, setIsError] = useState(false);
  const [errorText, setErrorText] = useState("");

  const [searchMovieText, setSearchMovieText] = useState("");
  const [searchErrorText, setSearchErrorText] = useState(false);
  const [loading, setLoading] = useState(false);

  const [firstRun, setFirstRun] = useState(true);

  const fetchMovies = async () => {
    setLoading(true);
    //fetch resources....
    setSearchErrorText("");
    console.log("calling api");

    try {
      const response = await axios.get(
        `https://api.dynoacademy.com/test-api/v1/movies?search=${searchMovieText}`
      );

      setMovies(response.data.moviesData);
      setIsError(false);
      setLoading(false);
      setFirstRun(false);
    } catch (error) {
      setIsError(true);
      setErrorText("Cannot get movie info");
      setFirstRun(false);
    }
    console.log(movies);

    //  console.log(response.data.moviesData);
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  useEffect(() => {
    if (!firstRun) {
      //Searching Code
      const fetchTimer = setTimeout(() => {
        if (searchMovieText && searchMovieText.length > 2) {
          fetchMovies();
        } else if (searchMovieText.length < 1) {
          fetchMovies();
        } else {
          setSearchErrorText("Please Enter a valid character for searching");
        }
      }, 1000);

      //cleanup function ....
      return () => {
        clearTimeout(fetchTimer);
      };
    }
  }, [searchMovieText]);

  return (
    <>
      <MyNavbar />
      <div className="App">
        <div className="mt-3">
          <Container>
            {/* <input
            type="text"
            value={searchMovieText}
            placeholder="Enter the movie title"
            onChange={(e) => setSearchMovieText(e.target.value)}
          /> */}
            <span style={{ color: "red" }}>{searchErrorText}</span>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control
                type="text"
                placeholder="Enter Movie name"
                value={searchMovieText}
                onChange={(e) => setSearchMovieText(e.target.value)}
              />
            </Form.Group>
          </Container>{" "}
        </div>

        <br />

        <br />

        {isError ? (
          <>
            <div
              style={{
                background: "red",
                color: "white",
                padding: "10px",
                margin: "10px",
              }}
            >
              {errorText}
            </div>
          </>
        ) : (
          <>
            {" "}
            <div
              style={{
                background: "#e7e7e7",
                padding: "10px",

                display: "flex",
                justifyContent: "space-evenly",
                alignItems: "center",
              }}
            >
              <div>
                {loading ? (
                  <>
                    {" "}
                    <Spinner animation="border" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </Spinner>
                  </>
                ) : (
                  <></>
                )}
              </div>
              {loading && movies.length < 1 ? (
                <></>
              ) : (
                <>
                  <Row>
                    {movies.map((el) => (
                      <SingleMovie data={el} />
                    ))}
                  </Row>
                </>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Index;
