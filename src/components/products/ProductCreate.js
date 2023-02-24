import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../helpers/Loader";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { toast } from "react-toastify";

function ProductCreate() {
  let [categories, setCategories] = useState([]);
  let [selectedCategory, setSelectedCategory] = useState();
  let [manufacturers, setManufacturers] = useState([]);
  let [selectedManufacturer, setSelectedManufacturer] = useState();
  let [loading, setLoading] = useState(false);
  let [name, setName] = useState("");
  let [code, setCode] = useState("");
  let [description, setDescription] = useState("");
  let [price, setPrice] = useState(0);
  let [image, setImage] = useState("");
  let [validated, setValidated] = useState(false);
  let url = "http://localhost:5191/api/";
  //const notify = (result) => {if(result === "success") toast.success }

  useEffect(() => {
    setLoading(true);
    axios
      .get(url + "category")
      .then((response) => {
        return response.data;
      })
      .then((data) => {
        setCategories(data);
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get(url + "manufacturer")
      .then((response) => {
        return response.data;
      })
      .then((data) => {
        setManufacturers(data);
      })
      .catch((error) => {
        console.log(error);
      });
    setLoading(false);
  }, [url]);

  /* let categoryList = categories.map((item) => ({
    value: item.id,
    label: item.name,
    id: item.id,
    name: item.name,
  })); */

  let categoryList = categories.map((item) => {
    return (
      <option key={item.id} value={item.id}>
        {item.name}
      </option>
    );
  });

  let manufacturerList = manufacturers.map((item) => {
    return (
      <option key={item.id} value={item.id}>
        {item.name}
      </option>
    );
  });

  let nameHandler = (event) => {
    setName(event.target.value);
  };

  let codeHandler = (event) => {
    setCode(event.target.value);
  };
  let descHandler = (event) => {
    setDescription(event.target.value);
  };
  let priceHandler = (event) => {
    setPrice(event.target.value);
  };
  let imageHandler = (event) => {
    setImage(event.target.value);
  };
  let categoryHandler = (event) => {
    setSelectedCategory(event.target.value);
  };
  let manufacturerHandler = (event) => {
    setSelectedManufacturer(event.target.value);
  };

  let handleSubmit = (event) => {
    event.preventDefault();
    if (selectedCategory === undefined) {
      setValidated(false);
      console.log(validated);
      toast.error("Please, select a category first!");
    } else if (selectedManufacturer === undefined) {
      setValidated(false);
      console.log(validated);
      toast.error("Please, select a manufacturer first!");
    } else {
      let form = event.currentTarget;
      if (form.checkValidity() === false) {
        event.stopPropagation();
      }

      setValidated(true);
      console.log(selectedManufacturer);
      console.log(selectedCategory);
      let product = {
        name: name,
        code: code,
        description: description,
        sellPrice: Number(price),
        imageUrl: image,
      };

      setLoading(false);

      let prodUrl =
        url +
        "product?categoryId=" +
        selectedCategory +
        "&manufacturerId=" +
        selectedManufacturer;

      axios
        .post(prodUrl, product)
        .then((response) => {
          if (response.status === 200) {
            toast.success("Product added successfully");
            setName("");
            setCode("");
            setDescription("");
            setPrice(0);
            setImage("");
          }
        })
        .catch((error) => {
          toast.error(error.data);
        });
      setValidated(false);
    }
  };

  return (
    <>
      {!loading && (
        <Form
          className="row g-3 mt-2"
          validated={validated}
          onSubmit={handleSubmit}
        >
          <Container>
            <Row>
              <Col>
                <Form.FloatingLabel label="Product Name" className="mb-1">
                  <Form.Control
                    type="text"
                    value={name}
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
                    value={code}
                    type="text"
                    placeholder="Enter Product Code"
                    onChange={codeHandler}
                  />
                </Form.FloatingLabel>
              </Col>
              <Col>
                <Form.FloatingLabel label="Product Price" className="mb-1">
                  <Form.Control
                    value={price}
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
                    value={description}
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
                <Col sm={3}>
                  <Form.Label>Product Image</Form.Label>
                </Col>
                <Col sm={9}>
                  <Form.Control
                    value={image}
                    type="file"
                    placeholder="Choose Product Image"
                    onChange={imageHandler}
                  />
                </Col>
              </Row>
            </Container>
          </Form.Group>
          <Form.Group className="mb-1" controlId="formCategory">
            <Container>
              <Row>
                <Col sm={3}>
                  <Form.Label>Product Cateogry</Form.Label>
                </Col>
                <Col sm={9}>
                  <Form.Select
                    defaultValue="Select"
                    placeholder="Choose Product Cateogry"
                    onChange={categoryHandler}
                  >
                    <option>Select Category</option> {categoryList}
                  </Form.Select>
                </Col>
              </Row>
            </Container>
          </Form.Group>
          <Form.Group className="mb-1" controlId="formManufacturer">
            <Container>
              <Row>
                <Col sm={3}>
                  <Form.Label>Product Manufacturer</Form.Label>
                </Col>
                <Col sm={9}>
                  <Form.Select
                    defaultValue="Select"
                    placeholder="Choose Product Manufacturer"
                    onChange={manufacturerHandler}
                  >
                    <option>Select Manufacturer</option>
                    {manufacturerList}
                  </Form.Select>
                </Col>
              </Row>
            </Container>
          </Form.Group>
          <Button variant="primary" type="submit">
            Add Product
          </Button>
        </Form>
      )}
      {loading && <Loader />}
    </>
  );
}

export default ProductCreate;
