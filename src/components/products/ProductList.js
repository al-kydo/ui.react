import React, { useEffect, useState } from "react";
import { Col, Container, Row, Button } from "react-bootstrap";
import axios from "axios";
import Loader from "../helpers/Loader";
import Modal from "react-bootstrap/Modal";
import Card from "react-bootstrap/Card";
import ProductCreate from "./ProductCreate";
import ProductUpdate from "./ProductUpdate";
import { toast } from "react-toastify";
import ProductDelete from "./ProductDelete";

function ProductList() {
  let [searchTerm, setSearchTerm] = useState("");
  let [products, setProducts] = useState([]);
  let [loading, setLoading] = useState(false);
  let [showCreateModal, setShowCreateModel] = useState(false);
  let [showUpdateModal, setShowUpdateModel] = useState(false);
  let [showDeleteModal, setShowDeleteModel] = useState(false);
  let url = "http://localhost:5191/api/product";
  let [productId, setProductId] = useState(0);

  useEffect(() => {
    setLoading(true);
    axios
      .get(url)
      .then((response) => {
        if (response.data.length === 0) {
          toast.info("No Results!");
        }
        return response.data;
      })
      .then((data) => {
        setProducts(data);
      })
      .catch((error) => {
        toast.error(error.message);
      });
    /*fetch("http://localhost:5191/api/product")
      .then((response) => {
        return response.json();
      })
      .then((responseJson) => {
        setProducts(responseJson);
      });*/
    setLoading(false);
  }, [url]);

  let handleSearchTerm = (event) => {
    setSearchTerm(event.target.value);
  };

  let handleSearch = () => {
    setLoading(true);
    url = url + "?searchTerm=" + searchTerm;
    /*fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((responseJson) => {
        setCategories(responseJson);
        setLoading(false);
      });*/

    axios
      .get(url)
      .then((response) => {
        if (response.data.length === 0) {
          toast.info("No Results!");
        }
        return response.data;
      })
      .then((data) => {
        setProducts(data);
      })
      .catch((error) => {
        toast.error(error.message);
      });
    setLoading(false);
  };

  let handleCreateModalClose = () => {
    setShowCreateModel(false);
    axios
      .get(url)
      .then((response) => {
        return response.data;
      })
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  let handleCreateModalShow = () => setShowCreateModel(true);

  let handleUpdateModalClose = () => {
    setShowUpdateModel(false);
    axios
      .get(url)
      .then((response) => {
        return response.data;
      })
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  let handleUpdateModalShow = (id) => {
    setProductId(id);
    setShowUpdateModel(true);
  };

  let handleDeleteModalShow = (id) => {
    setProductId(id);
    setShowDeleteModel(true);
  };

  let handleDeleteModalClose = () => {
    setShowDeleteModel(false);
    axios
      .get(url)
      .then((response) => {
        return response.data;
      })
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  let productList = products.map((item) => (
    <Col key={item.id}>
      <Card className="mt-1" style={{ width: "13rem" }}>
        <Card.Img variant="top" src="holder.js/100px180" />
        <Card.Body>
          <Card.Title>{item.name}</Card.Title>
          <Card.Text>{item.description}</Card.Text>
          <Card.Text>{item.sellPrice} USD</Card.Text>
          <Button
            variant="outline-primary"
            onClick={() => handleUpdateModalShow(item.id)}
          >
            Update
          </Button>
          <Button
            variant="danger"
            onClick={() => handleDeleteModalShow(item.id)}
          >
            Delete
          </Button>
        </Card.Body>
      </Card>
    </Col>
  ));

  return (
    <>
      {!loading && (
        <Container>
          <Row>
            <Col sm={2}>
              <h2 className="text-primary">Products</h2>
            </Col>
            <Col sm={7}>
              <input
                type="text"
                className="form-control mt-1"
                placeholder="Enter Product Name to Search"
                onChange={handleSearchTerm}
              />
            </Col>
            <Col sm={1}>
              <Button
                type="submit"
                variant="outline-secondary"
                className="mt-1"
                onClick={handleSearch}
              >
                Filter
              </Button>
            </Col>
            <Col sm={2}>
              <Button
                type="submit"
                variant="outline-primary"
                className="mt-1"
                onClick={handleCreateModalShow}
              >
                New Product
              </Button>
            </Col>
          </Row>
          <Row className="mt-4">{productList}</Row>

          <Modal
            show={showCreateModal}
            onHide={handleCreateModalClose}
            size="lg"
          >
            <Modal.Header closeButton>
              <Modal.Title>Add New Product</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <ProductCreate />
            </Modal.Body>
          </Modal>

          <Modal
            show={showUpdateModal}
            onHide={handleUpdateModalClose}
            size="lg"
          >
            <Modal.Header closeButton>
              <Modal.Title>Update Product</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {
                <ProductUpdate
                  productId={productId}
                  hide={handleUpdateModalClose}
                />
              }
            </Modal.Body>
          </Modal>

          <Modal
            show={showDeleteModal}
            onHide={handleDeleteModalClose}
            size="md"
          >
            <Modal.Header closeButton>
              <Modal.Title>Delete Product</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {
                <ProductDelete
                  productId={productId}
                  hide={handleDeleteModalClose}
                />
              }
            </Modal.Body>
          </Modal>
        </Container>
      )}
      {loading && <Loader />}
    </>
  );
  /*<>
      <h2 className="text-primary">Available Products</h2>
      <div className="container mt-2">
        <Table className="mt-4" striped bordered hover size="sm">
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Code</th>
              <th>Price</th>
              <th>Options</th>
            </tr>
          </thead>
          <tbody>
            {products.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.description}</td>
                <td>{item.code}</td>
                <td>{item.sellPrice}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </>*/
}

export default ProductList;
