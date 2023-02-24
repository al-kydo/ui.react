import axios from "axios";
import React, { useEffect, useState } from "react";
import { Container, Row, Col, Table } from "react-bootstrap";
import Loader from "../helpers/Loader";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import CategoryCreate from "./CategoryCreate";
import CategoryUpdate from "./CategoryUpdate";
import CategoryDelete from "./CategoryDelete";
import { toast } from "react-toastify";

function CategoryList() {
  let [searchTerm, setSearchTerm] = useState("");
  let [categories, setCategories] = useState([]);
  let [loading, setLoading] = useState(false);
  let [showCreateModal, setShowCreateModel] = useState(false);
  let [showUpdateModal, setShowUpdateModel] = useState(false);
  let [showDeleteModal, setShowDeleteModel] = useState(false);
  let url = "http://localhost:5191/api/category";
  let [categoryId, setCategoryId] = useState(0);

  useEffect(() => {
    setLoading(true);
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
        setCategories(data);
      })
      .catch((error) => {
        toast.error(error.message);
      });
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
        setCategories(data);
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
        setCategories(data);
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
        setCategories(data);
        setLoading(false);
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  let handleUpdateModalShow = (id) => {
    setCategoryId(id);
    setShowUpdateModel(true);
  };

  let handleDeleteModalShow = (id) => {
    setCategoryId(id);
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
        setCategories(data);
        setLoading(false);
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  let categoryList = categories.map((item) => (
    <tr key={item.id}>
      <td>{item.name}</td>
      <td>{item.description}</td>
      <td>{item.code}</td>
      <td>{item.displayOrder}</td>
      <td>
        <Button
          variant="outline-primary"
          className="mx-1"
          onClick={() => handleUpdateModalShow(item.id)}
        >
          Update
        </Button>
        <Button variant="danger" onClick={() => handleDeleteModalShow(item.id)}>
          Delete
        </Button>
      </td>
    </tr>
  ));

  return (
    <>
      {!loading && (
        <Container>
          <Row>
            <Col sm={2}>
              <h2 className="text-primary">Categories</h2>
            </Col>
            <Col sm={7}>
              <input
                type="text"
                className="form-control mt-1"
                placeholder="Enter Category Name to Search"
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
                New Category
              </Button>
            </Col>
          </Row>
          <Row>
            <Table className="mt-4" striped bordered hover size="sm">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Code</th>
                  <th>Display Order</th>
                  <th>Options</th>
                </tr>
              </thead>
              <tbody>{categoryList}</tbody>
            </Table>
          </Row>

          <Modal
            show={showCreateModal}
            onHide={handleCreateModalClose}
            size="lg"
          >
            <Modal.Header closeButton>
              <Modal.Title>Add New Category</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <CategoryCreate />
            </Modal.Body>
          </Modal>

          <Modal
            show={showUpdateModal}
            onHide={handleUpdateModalClose}
            size="lg"
          >
            <Modal.Header closeButton>
              <Modal.Title>Update Category</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <CategoryUpdate
                catId={categoryId}
                hide={handleUpdateModalClose}
              />
            </Modal.Body>
          </Modal>

          <Modal
            show={showDeleteModal}
            onHide={handleDeleteModalClose}
            size="md"
          >
            <Modal.Header closeButton>
              <Modal.Title>Delete Category</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {
                <CategoryDelete
                  categoryId={categoryId}
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
}

export default CategoryList;
