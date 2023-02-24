import { useState } from "react";
import axios from "axios";
import Loader from "../helpers/Loader";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { toast } from "react-toastify";

function CreateCategory() {
  let [loading, setLoading] = useState(false);
  let [catName, setCatName] = useState("");
  let [catCode, setCatCode] = useState("");
  let [catDesc, setCatDesc] = useState("");
  let [catDisplayOrder, setCatDisOrder] = useState(0);
  let [catImage, setCatImage] = useState("");
  let [validated, setValidated] = useState(false);

  let nameHandler = (event) => {
    setCatName(event.target.value);
  };

  let codeHandler = (event) => {
    setCatCode(event.target.value);
  };
  let descHandler = (event) => {
    setCatDesc(event.target.value);
  };
  let displayOrderHandler = (event) => {
    setCatDisOrder(event.target.value);
  };
  let imageHandler = (event) => {
    setCatImage(event.target.value);
  };

  let handleSubmit = (event) => {
    let form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    }

    setValidated(true);
    event.preventDefault();
    let cat = {
      name: catName,
      code: catCode,
      description: catDesc,
      displayOrder: Number(catDisplayOrder),
      image: catImage,
    };

    let url = "http://localhost:5191/api/category/";

    /*let options = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(cat),
    };

    fetch(url, options)
      .then((response) => {
        if (response.ok) {
          catNameRef.current.value = "";
          catCodeRef.current.value = "";
          catDescRef.current.value = "";
          catDisplayOrderRef.current.value = "";
          catImageRef.current.value = "";
        }
      })
      .catch((e) => {
        console.log("e", e);
      });*/

    axios
      .post(url, cat)
      .then((response) => {
        if (response.status === 200) {
          toast.success("Category added successfully");
          setCatName("");
          setCatCode("");
          setCatDesc("");
          setCatDisOrder("");
          setCatImage("");
        }
      })
      .catch((error) => {
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
                <Form.FloatingLabel label="Category Name" className="mb-1">
                  <Form.Control
                    type="text"
                    value={catName}
                    placeholder="Enter Category Name"
                    onChange={nameHandler}
                    required
                    min={3}
                    autoFocus
                  />
                </Form.FloatingLabel>
              </Col>
              <Col>
                <Form.FloatingLabel label="Category Code" className="mb-1">
                  <Form.Control
                    type="text"
                    value={catCode}
                    placeholder="Enter Category Code"
                    onChange={codeHandler}
                  />
                </Form.FloatingLabel>
              </Col>
              <Col>
                <Form.FloatingLabel
                  label="Category Display Order"
                  className="mb-1"
                >
                  <Form.Control
                    type="number"
                    value={catDisplayOrder}
                    placeholder="Enter Category Display Order"
                    onChange={displayOrderHandler}
                  />
                </Form.FloatingLabel>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.FloatingLabel
                  label="Category Description"
                  className="mb-1"
                >
                  <Form.Control
                    as="textarea"
                    value={catDesc}
                    placeholder="Enter Category Description"
                    onChange={descHandler}
                  />
                </Form.FloatingLabel>
              </Col>
            </Row>
          </Container>
          <Form.Group className="mb-1" controlId="formImage">
            <Container>
              <Row>
                <Col sm={3}>
                  <Form.Label>Category Image</Form.Label>
                </Col>
                <Col sm={9}>
                  <Form.Control
                    value={catImage}
                    type="file"
                    placeholder="Choose Cateogry Image"
                    onChange={imageHandler}
                  />
                </Col>
              </Row>
            </Container>
          </Form.Group>
          <Button variant="primary" type="submit">
            Add Category
          </Button>
        </Form>
      )}
      {loading && <Loader />}
    </>
  );
}

export default CreateCategory;
