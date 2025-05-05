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

  const [formErrors, setFormErrors] = useState({
    name: false,
    muscle: false,
    recovery: false,
    stress: false,
    sleep: false,
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

    const fields = ["muscle", "recovery", "stress", "sleep"];
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
            {formErrors.name && (
              <Form.Text className="text-danger">
                Player selection is required.
              </Form.Text>
            )}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Muscle</Form.Label>
            <Form.Control
              type="number"
              name="muscle"
              value={formData.muscle}
              onChange={handleInputChange}
              placeholder="Enter muscle value"
              className={formErrors.muscle ? "is-invalid" : ""}
            />
            {formErrors.muscle && (
              <Form.Text className="text-danger">
                Muscle value must be a number.
              </Form.Text>
            )}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Recovery</Form.Label>
            <Form.Control
              type="number"
              name="recovery"
              value={formData.recovery}
              onChange={handleInputChange}
              placeholder="Enter recovery value"
              className={formErrors.recovery ? "is-invalid" : ""}
            />
            {formErrors.recovery && (
              <Form.Text className="text-danger">
                Recovery value must be a number.
              </Form.Text>
            )}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Stress</Form.Label>
            <Form.Control
              type="number"
              name="stress"
              value={formData.stress}
              onChange={handleInputChange}
              placeholder="Enter stress value"
              className={formErrors.stress ? "is-invalid" : ""}
            />
            {formErrors.stress && (
              <Form.Text className="text-danger">
                Stress value must be a number.
              </Form.Text>
            )}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Sleep</Form.Label>
            <Form.Control
              type="number"
              name="sleep"
              value={formData.sleep}
              onChange={handleInputChange}
              placeholder="Enter sleep value"
              className={formErrors.sleep ? "is-invalid" : ""}
            />
            {formErrors.sleep && (
              <Form.Text className="text-danger">
                Sleep value must be a number.
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

export default AddEntryModal;
