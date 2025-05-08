import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import Select from "react-select";

function AddEntryModalRPE({ show, handleClose }) {
  const [formData, setFormData] = useState({
    name: null,
    rpe: "",
    duration: "",
  });

  const [formErrors, setFormErrors] = useState({
    name: false,
    rpe: false,
    duration: false,
  });

  const options = [
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
    { value: "option3", label: "Option 3" },
    { value: "option4", label: "Option 4" },
    { value: "option5", label: "Option 5" },
  ];

  const validateForm = () => {
    const errors = { ...formErrors };
    let isValid = true;

    if (!formData.name) {
      errors.name = true;
      isValid = false;
    } else {
      errors.name = false;
    }

    const fields = ["rpe", "duration"];
    fields.forEach((field) => {
      if (isNaN(formData[field]) || formData[field] === "") {
        errors[field] = true;
        isValid = false;
      } else {
        errors[field] = false;
      }
    });

    setFormErrors(errors);
    return isValid;
  };

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
    if (validateForm()) {
      console.log("Form Data Submitted:", formData);
      handleClose(); // Close modal after submission
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add RPE Entry</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Select Player</Form.Label>
            <Select
              value={formData.name}
              onChange={handleDropdownChange}
              options={options}
              isSearchable={true}
              placeholder="Search and select a player"
            />
            {formErrors.name && (
              <Form.Text className="text-danger">
                Player selection is required.
              </Form.Text>
            )}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>RPE Value</Form.Label>
            <Form.Control
              type="number"
              name="rpe"
              value={formData.rpe}
              onChange={handleInputChange}
              placeholder="Enter RPE value"
              className={formErrors.rpe ? "is-invalid" : ""}
            />
            {formErrors.rpe && (
              <Form.Text className="text-danger">
                RPE value must be a number.
              </Form.Text>
            )}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Duration (minutes)</Form.Label>
            <Form.Control
              type="number"
              name="duration"
              value={formData.duration}
              onChange={handleInputChange}
              placeholder="Enter duration in minutes"
              className={formErrors.duration ? "is-invalid" : ""}
            />
            {formErrors.duration && (
              <Form.Text className="text-danger">
                Duration must be a number.
              </Form.Text>
            )}
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

export default AddEntryModalRPE;
