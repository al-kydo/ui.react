import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../helpers/Loader";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { toast } from "react-toastify";

function ProductUpdate(props) {
  let [loading, setLoading] = useState(false);
  let [productId, setProductId] = useState(props.productId);
  let [product, setProduct] = useState([]);
  let [validated, setValidated] = useState(false);
  let url = "http://localhost:5191/api/product/" + productId;

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
        setProduct(data);
      })
      .catch((error) => {
        toast.error(error.message);
      });
    setLoading(false);
  }, [url]);

  let nameHandler = (event) => {
    if (event.target.value !== undefined && event.target.value != null) {
      setValidated(true);
    }
    setProduct({ ...product, name: event.target.value });
  };

  let codeHandler = (event) => {
    setProduct({ ...product, code: event.target.value });
  };
  let descHandler = (event) => {
    setProduct({ ...product, description: event.target.value });
  };
  let priceHandler = (event) => {
    setProduct({ ...product, price: event.target.value });
  };
  let imageHandler = (event) => {
    setProduct({ ...product, imageUrl: event.target.value });
  };

  let handleProductUpdate = (event) => {
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
      .put(url, product)
      .then((response) => {
        if (response.status === 200) {
          toast.success("Product updated successfully");
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
          className="row g-3 mt-2"
          validated={validated}
          onSubmit={handleProductUpdate}
        >
          <Container>
            <Row>
              <Col>
                <Form.FloatingLabel label="Product Name" className="mb-1">
                  <Form.Control
                    type="text"
                    defaultValue={product.name}
                    placeholder="Enter Product Name"
                    onChange={nameHandler}
                    required
                    min={3}
                    autoFocus
                  />
                </Form.FloatingLabel>
              </Col>
              <Col>
                <Form.FloatingLabel label="Product Code" className="mb-1">
                  <Form.Control
                    defaultValue={product.code}
                    type="text"
                    placeholder="Enter Product Code"
                    onChange={codeHandler}
                  />
                </Form.FloatingLabel>
              </Col>
              <Col>
                <Form.FloatingLabel label="Product Price" className="mb-1">
                  <Form.Control
                    defaultValue={product.price}
                    type="number"
                    placeholder="Enter Product Price"
                    onChange={priceHandler}
                  />
                </Form.FloatingLabel>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.FloatingLabel label="Description" className="mb-1">
                  <Form.Control
                    as="textarea"
                    defaultValue={product.description}
                    className="form-control"
                    placeholder="Enter Product Description"
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
                  <Form.Label>Product Image</Form.Label>
                </Col>
                <Col sm={10}>
                  <Form.Control
                    defaultValue={product.imageUrl}
                    type="file"
                    placeholder="Choose Product Image"
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

export default ProductUpdate;
