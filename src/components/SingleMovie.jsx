import React from "react";
import { Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom/cjs/react-router-dom";

const SingleMovie = (props) => {
  return (
    <>
      <Col key={props.data.id}>
        <Card style={{ width: "16rem", minHeight: "730px" }}>
          <Card.Img
            variant="top"
            src={props.data.image}
            style={{ maxWidth: "255px" }}
          />
          <Card.Body>
            <Card.Title>{props.data.name}</Card.Title>
            <Card.Text>{props.data.info}</Card.Text>
            <br />
            <br /> <Card.Text>RATING : {props.data.rating}</Card.Text>
            <Button variant="dark">
              {" "}
              <Link to={`/view/${props.data.id}`} className="text-white">
                View More
              </Link>
            </Button>
          </Card.Body>
        </Card>

        {/*   <div>
          <Link to={`/view/${props.data.id}`}>
            <span style={{ fontWeight: "bold" }}>{props.data.name}</span>{" "}
          </Link>
          <br />
          <img
            src={props.data.image}
            alt="Movie Image"
            style={{
              height: "100px",
              display: "flex",
              alignContent: "space-around",
            }}
          />
          <br />
          <span
            style={{
              margin: "10px",
              display: "flex",
              alignItems: "center",
              position: "relative",
            }}
          >
            {props.data.info}
            <br />
            RATING : {props.data.rating}
          </span>
        </div> */}
      </Col>
    </>
  );
};

export default SingleMovie;
