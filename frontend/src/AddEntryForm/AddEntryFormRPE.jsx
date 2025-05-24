import React, { useState, forwardRef, useImperativeHandle } from "react";
import { Form } from "react-bootstrap";
import ApiClient from "../Helpers/ApiClient";

const AddEntryFormRPE = forwardRef(({}, ref) => {
  const [formData, setFormData] = useState({ rpe: "", duration: "" });
  const [formErrors, setFormErrors] = useState({ rpe: false, duration: false });

  const validateForm = () => {
    const errors = { ...formErrors };
    let isValid = true;

    if (isNaN(formData.rpe) || formData.rpe <= 0 || formData.rpe > 10) {
      errors.rpe = true;
      isValid = false;
    } else {
      errors.rpe = false;
    }

    if (
      isNaN(formData.duration) ||
      formData.duration <= 0 ||
      formData.duration > 90
    ) {
      errors.duration = true;
      isValid = false;
    } else {
      errors.duration = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: parseInt(value, 10) || 0,
    }));
  };

  const handleSubmit = async (selectedDate, selectedPlayer, handleClose) => {
    if (validateForm()) {
      const payload = {
        intervalInMinutes: parseInt(formData.duration),
        value: parseInt(formData.rpe),
        date: selectedDate,
      };

      try {
        await ApiClient.post(`add-rpe/${selectedPlayer}`, payload);
        setFormData({ rpe: "", duration: "" });
        if (handleClose) {
          handleClose();
        }
        return true;
      } catch (error) {
        alert("Failed to submit the form. Please try again.");
        console.error("API Error:", error);
        return false;
      }
    }
  };

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
            RPE value must be greater than 0 smaller than 10.
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
            Duration must be greater than 0 smaller than 90.
          </Form.Text>
        )}
      </Form.Group>
    </Form>
  );
});

export default AddEntryFormRPE;
