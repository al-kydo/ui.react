import { useState } from "react";
import axios from "axios";
import Loader from "../helpers/Loader";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { toast } from "react-toastify";

function CreateManufacturer() {
  let [loading, setLoading] = useState(false);
  let [manName, setManName] = useState("");
  let [validated, setValidated] = useState(false);

  let nameHandler = (event) => {
    setManName(event.target.value);
  };

  let handleSubmit = (event) => {
    let form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    }

    setValidated(true);
    event.preventDefault();
    let man = {
      name: manName,
    };

    let url = "http://localhost:5191/api/manufacturer/";

    /*let options = {
      method: "POST",
      headers: {
        Accept: "applimanion/json",
        "Content-type": "applimanion/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(man),
    };

    fetch(url, options)
      .then((response) => {
        if (response.ok) {
          manNameRef.current.value = "";
          manCodeRef.current.value = "";
          manDescRef.current.value = "";
          manDisplayOrderRef.current.value = "";
          manImageRef.current.value = "";
        }
      })
      .manch((e) => {
        console.log("e", e);
      });*/

    axios
      .post(url, man)
      .then((response) => {
        if (response.status === 200) {
          toast.success("Manufacturer added successfully");
          setManName("");
        }
      })
      .manch((error) => {
        toast.error(error.data);
      });
    setLoading(false);
  };

  return (
    <>
      {!loading && (
        <Form className="row g-3" onSubmit={handleSubmit} validated={validated}>
          <Container>
            <Row>
              <Col>
                <Form.FloatingLabel label="Manufacturer Name" className="mb-1">
                  <Form.Control
                    type="text"
                    value={manName}
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
            Add Manufacturer
          </Button>
        </Form>
      )}
      {loading && <Loader />}
    </>
  );
}

export default CreateManufacturer;
