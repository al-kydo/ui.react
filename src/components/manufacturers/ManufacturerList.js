import axios from "axios";
import React, { useEffect, useState } from "react";
import Loader from "../helpers/Loader";
import { Container, Row, Col, Table } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import ManufacturerCreate from "./ManufacturerCreate";
import ManufacturerUpdate from "./ManufacturerUpdate";
import ManufacturerDelete from "./ManufacturerDelete";
import { toast } from "react-toastify";

function ManufacturerList() {
  let [searchTerm, setSearchTerm] = useState("");
  const [manufacturers, setManufacturers] = useState([]);
  let [loading, setLoading] = useState(false);
  let [showCreateModal, setShowCreateModel] = useState(false);
  let [showUpdateModal, setShowUpdateModel] = useState(false);
  let [showDeleteModal, setShowDeleteModel] = useState(false);
  let url = "http://localhost:5191/api/manufacturer";
  let [manId, setManId] = useState(0);

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
      .then((data) => setManufacturers(data))
      .catch((error) => {
        toast.error(error.message);
      });
    /*fetch("http://localhost:5191/api/manufacturer")
      .then((response) => {
        return response.json();
      })
      .then((responseJson) => {
        setManufacturers(responseJson);
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
        setManufacturers(responseJson);
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
        setManufacturers(data);
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
        setManufacturers(data);
        setLoading(false);
      })
      .catch((error) => {
        alert(error.message);
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
        setManufacturers(data);
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  let handleUpdateModalShow = (id) => {
    setManId(id);
    setShowUpdateModel(true);
  };

  let handleDeleteModalShow = (id) => {
    setManId(id);
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
        setManufacturers(data);
        setLoading(false);
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  let manufacturerList = manufacturers.map((item) => (
    <tr key={item.id}>
      <td>{item.name}</td>
      <td>
        <Button
          variant="outline-primary"
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
    <Container>
      <Row>
        <Col>
          <h2 className="text-primary">Manufacturers</h2>
        </Col>
        <Col md={6}>
          <input
            type="text"
            className="form-control mt-1"
            placeholder="Enter Manufacturer Name to Search"
            onChange={handleSearchTerm}
          />
        </Col>
        <Col>
          <Button
            type="submit"
            variant="outline-secondary"
            className="mt-1"
            onClick={handleSearch}
          >
            Filter
          </Button>
        </Col>
        <Col md={2}>
          <Button
            type="submit"
            variant="outline-primary"
            className="mt-1"
            onClick={handleCreateModalShow}
          >
            New Manufacturer
          </Button>
        </Col>
      </Row>

      <Row>
        {!loading && (
          <Table className="mt-4" striped bordered hover size="sm">
            <thead>
              <tr>
                <th>Name</th>
                <th>Options</th>
              </tr>
            </thead>
            <tbody>{manufacturerList}</tbody>
          </Table>
        )}
        {loading && <Loader />}
      </Row>

      <Modal show={showCreateModal} onHide={handleCreateModalClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Add New Manufacturer</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ManufacturerCreate />
        </Modal.Body>
      </Modal>

      <Modal show={showUpdateModal} onHide={handleUpdateModalClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Update Manufacturer</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ManufacturerUpdate manId={manId} hide={handleUpdateModalClose} />
        </Modal.Body>
      </Modal>

      <Modal show={showDeleteModal} onHide={handleDeleteModalClose} size="md">
        <Modal.Header closeButton>
          <Modal.Title>Delete Manufacturer</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {
            <ManufacturerDelete
              manufacturerId={manId}
              hide={handleDeleteModalClose}
            />
          }
        </Modal.Body>
      </Modal>
    </Container>
  );
}

export default ManufacturerList;
