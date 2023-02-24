import axios from "axios";
import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Button from "react-bootstrap/Button";
import { toast } from "react-toastify";
import { useState } from "react";

function ManufacturerDelete(props) {
  let [manufacturerId, setManufacturerId] = useState(props.manufacturerId);
  //let [showModal, setShowModal] = useState(props.hide);
  let url = "http://localhost:5191/api/Manufacturer/" + manufacturerId;

  let handleDelete = () => {
    axios
      .delete(url)
      .then((response) => {
        if (response.status === 200) {
          toast.success("Manufacturer Deleted successfully");
          props.hide();
        }
        return response.data;
      })
      .catch((error) => {
        toast.error(error.message);
      });

    //setShowModal(false);
    //console.log(showModal);
  };

  return (
    <Container className="row">
      <Row>
        <Col>
          <p>Are you sure you want to delete?</p>
        </Col>
      </Row>
      <Row>
        <Col>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

export default ManufacturerDelete;
