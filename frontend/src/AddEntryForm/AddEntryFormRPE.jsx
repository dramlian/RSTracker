import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

function AddEntryFormRPE({ onSubmit }) {
  const [formData, setFormData] = useState({
    rpe: "",
    duration: "",
  });

  const [formErrors, setFormErrors] = useState({
    rpe: false,
    duration: false,
  });

  const validateForm = () => {
    const errors = { ...formErrors };
    let isValid = true;

    ["rpe", "duration"].forEach((field) => {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
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

      <Button type="submit" variant="primary">
        Submit
      </Button>
    </Form>
  );
}

export default AddEntryFormRPE;
