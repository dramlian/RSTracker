import React, { useState, forwardRef, useImperativeHandle } from "react";
import { Form } from "react-bootstrap";

const AddEntryFormRPE = forwardRef(({}, ref) => {
  const [formData, setFormData] = useState({ rpe: "", duration: "" });
  const [formErrors, setFormErrors] = useState({ rpe: false, duration: false });

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

  const handleSubmit = (weekKey, dayKey, selectedPlayer) => {
    if (validateForm()) {
      alert("Form submitted successfully!");
      alert(
        `RPE: ${formData.rpe}, Duration: ${formData.duration}, Player: ${selectedPlayer}, Week: ${weekKey}, Day: ${dayKey}`
      );
    }
  };

  // Expose handleSubmit to parent
  useImperativeHandle(ref, () => ({
    submitForm: handleSubmit,
  }));

  return (
    <Form>
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
  );
});

export default AddEntryFormRPE;
