import axios from "axios";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import MyNavbar from "../components/MyNavbar";
import { Container, Form, Button } from "react-bootstrap";
const AddMovie = () => {
  const history = useHistory();

  const movie_name_reference = useRef();
  const rating_reference = useRef();
  const desc_reference = useRef();

  const addMovieHandler = async (e) => {
    e.preventDefault();

    const movieData = {
      movie_name: movie_name_reference.current.value,
      rating: rating_reference.current.value,
      description: desc_reference.current.value,
    };

    try {
      const response = await axios.post(
        "https://api.dynoacademy.com/test-api/v1/movies",
        movieData,
        {
          timeout: 10000,
        }
      );
      alert(response.data.message);
      history.replace("/");
    } catch (error) {
      if (error.response) {
        alert(error.response.data.errors[0].message);
      } else {
        alert("Unknown error occurred.. Try again later");
      }
    }
  };

  return (
    <>
      <MyNavbar />
      <Container>
        <br /> <br />
        <form onSubmit={addMovieHandler}>
          {/* {  Movie Name <br />
        <input
          type="text"
          placeholder="Movie Name"
          ref={movie_name_reference}
        />{" "}} */}
          <br /> <br />
          <Form.Group className="mb-3">
            <Form.Label>Movie Name </Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Movie Name"
              ref={movie_name_reference}
            />
          </Form.Group>
          {/* {  Rating <br />
        <input
          type="text"
          placeholder="Rating"
          ref={rating_reference}
        />}  */}
          <Form.Group className="mb-3">
            <Form.Label>Rating </Form.Label>
            <Form.Control
              type="number"
              placeholder="Rating"
              ref={rating_reference}
            />
          </Form.Group>
          {/* {  Description <br />
          <textarea ref={desc_reference} placeholder="Description"></textarea>} */}
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            type="text"
            ref={desc_reference}
            placeholder="Description"
            style={{ maxHeight: "100px" }}
          />
          {/* { <button type="submit">Add a Movie</button>} */}
          <br />
          <br />{" "}
          <Button variant="dark" type="submit">
            AddMovie
          </Button>
        </form>
      </Container>
    </>
  );
};

export default AddMovie;
