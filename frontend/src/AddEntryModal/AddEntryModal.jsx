import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import Select from "react-select";

function AddEntryModal({ show, handleClose }) {
  const [formData, setFormData] = useState({
    name: null,
    muscle: "",
    recovery: "",
    stress: "",
    sleep: "",
  });

  const options = [
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
    { value: "option3", label: "Option 3" },
    { value: "option4", label: "Option 4" },
    { value: "option5", label: "Option 5" },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleDropdownChange = (selectedOption) => {
    setFormData((prevData) => ({
      ...prevData,
      name: selectedOption,
    }));
  };

  const handleSubmit = () => {
    console.log("Form Data Submitted:", formData);
    handleClose(); // Close modal after submission
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add Entry</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Select Name</Form.Label>
            <Select
              value={formData.name}
              onChange={handleDropdownChange}
              options={options}
              isSearchable={true}
              placeholder="Search and select a name"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Muscle</Form.Label>
            <Form.Control
              name="muscle"
              value={formData.muscle}
              onChange={handleInputChange}
              placeholder="Enter muscle value"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Recovery</Form.Label>
            <Form.Control
              name="recovery"
              value={formData.recovery}
              onChange={handleInputChange}
              placeholder="Enter recovery value"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Stress</Form.Label>
            <Form.Control
              name="stress"
              value={formData.stress}
              onChange={handleInputChange}
              placeholder="Enter stress value"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Sleep</Form.Label>
            <Form.Control
              name="sleep"
              value={formData.sleep}
              onChange={handleInputChange}
              placeholder="Enter sleep value"
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Save Entry
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default AddEntryModal;
