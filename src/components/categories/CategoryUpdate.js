import axios from "axios";
import React, { useEffect, useState } from "react";
import Loader from "../helpers/Loader";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { toast } from "react-toastify";

function CategoryUpdate(props) {
  let [catId, setCatId] = useState(props.catId);
  let [category, setCategory] = useState([]);
  let [loading, setLoading] = useState(false);
  let [validated, setValidated] = useState(false);
  let url = "http://localhost:5191/api/category/" + catId;

  console.log(catId);

  useEffect(() => {
    setLoading(true);
    /*fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((responseJson) => {
        setCategory(responseJson);
      })
      .catch((e) => {
        console.log("e", e);
      });*/
    axios
      .get(url)
      .then((response) => {
        return response.data;
      })
      .then((data) => {
        setCategory(data);
      })
      .catch((error) => {
        toast.error(error.message);
      });
    setLoading(false);
  }, [catId, url]);

  let nameHandler = (event) => {
    if (event.target.value !== undefined && event.target.value != null) {
      setValidated(true);
    }
    setCategory({ ...category, name: event.target.value });
  };

  let codeHandler = (event) => {
    setCategory({ ...category, code: event.target.value });
  };
  let descHandler = (event) => {
    setCategory({ ...category, description: event.target.value });
  };
  let displayOrderHandler = (event) => {
    setCategory({ ...category, displayOrder: event.target.value });
  };
  let imageHandler = (event) => {
    setCategory({ ...category, imageUrl: event.target.value });
  };

  let handleCategoryUpdate = (event) => {
    event.preventDefault();
    setLoading(true);
    /*let options = {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(category),
    };

    fetch(url, options)
      .then((response) => {
        console.log("response", response);
      })
      .catch((e) => {
        console.log("e", e);
      });*/

    axios
      .put(url, category)
      .then((response) => {
        if (response.status === 200) {
          toast.success("Category updated successfully");
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
          onSubmit={handleCategoryUpdate}
          validated={validated}
        >
          <Container>
            <Row>
              <Col>
                <Form.FloatingLabel label="Category Name" className="mb-1">
                  <Form.Control
                    type="text"
                    defaultValue={category.name}
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
                    defaultValue={category.code}
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
                    defaultValue={category.displayOrder}
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
                    defaultValue={category.description}
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
                <Col sm={2}>
                  <Form.Label>Category Image</Form.Label>
                </Col>
                <Col sm={10}>
                  <Form.Control
                    defaultValue={category.imageUrl}
                    type="file"
                    placeholder="Choose Cateogry Image"
                    onChange={imageHandler}
                  />
                </Col>
              </Row>
            </Container>
          </Form.Group>
          <Button variant="primary" type="submit">
            Save
          </Button>
        </Form>
      )}
      {loading && <Loader />}
    </>
  );
}

export default CategoryUpdate;
