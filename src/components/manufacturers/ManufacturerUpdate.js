import axios from "axios";
import React, { useEffect, useState } from "react";
import Loader from "../helpers/Loader";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { toast } from "react-toastify";

function ManufacturerUpdate(props) {
  let [manId, setManId] = useState(props.manId);
  let [manufacturer, setManufacturer] = useState([]);
  let [loading, setLoading] = useState(false);
  let [validated, setValidated] = useState(false);
  let url = "http://localhost:5191/api/manufacturer/" + manId;

  console.log(manId);

  useEffect(() => {
    setLoading(true);
    /*fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((responseJson) => {
        setManufacturer(responseJson);
      })
      .manch((e) => {
        console.log("e", e);
      });*/
    axios
      .get(url)
      .then((response) => {
        return response.data;
      })
      .then((data) => {
        setManufacturer(data);
      })
      .catch((error) => {
        toast.error(error.message);
      });
    setLoading(false);
  }, [manId, url]);

  let nameHandler = (event) => {
    if (event.target.value !== undefined && event.target.value != null) {
      setValidated(true);
    }
    setManufacturer({ ...manufacturer, name: event.target.value });
  };

  let handleManufacturerUpdate = (event) => {
    event.preventDefault();
    setLoading(true);

    /*let options = {
      method: "PUT",
      headers: {
        Accept: "applimanion/json",
        "Content-type": "applimanion/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(manufacturer),
    };

    fetch(url, options)
      .then((response) => {
        console.log("response", response);
      })
      .manch((e) => {
        console.log("e", e);
      });*/

    axios
      .put(url, manufacturer)
      .then((response) => {
        if (response.status === 200) {
          toast.success("Manufacturer updated successfully");
          props.hide();
        }
        return response.data;
      })
      .catch((error) => {
        toast.error(error.message);
      });
    setLoading(false);
  };

  return (
    <>
      {!loading && (
        <Form
          className="row g-3"
          onSubmit={handleManufacturerUpdate}
          validated={validated}
        >
          <Container>
            <Row>
              <Col>
                <Form.FloatingLabel label="Manufacturer Name" className="mb-1">
                  <Form.Control
                    type="text"
                    defaultValue={manufacturer.name}
                    placeholder="Enter Manufacturer Name"
                    onChange={nameHandler}
                    required
                    min={3}
                    autoFocus
                  />
                </Form.FloatingLabel>
              </Col>
            </Row>
          </Container>
          <Button variant="primary" type="submit">
            Save
          </Button>
        </Form>
      )}
      {loading && <Loader />}
    </>
  );
}

export default ManufacturerUpdate;
