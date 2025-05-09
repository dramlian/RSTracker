import React, { useState, forwardRef, useImperativeHandle } from "react";
import { Form } from "react-bootstrap";
import ApiClient from "../Helpers/ApiClient";

const AddEntryFormRPE = forwardRef(({}, ref) => {
  const [formData, setFormData] = useState({ rpe: "", duration: "" });
  const [formErrors, setFormErrors] = useState({ rpe: false, duration: false });

  const validateForm = () => {
    const errors = { ...formErrors };
    let isValid = true;

    ["rpe", "duration"].forEach((field) => {
      if (isNaN(formData[field]) || formData[field] <= 0) {
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
      [name]: parseInt(value, 10) || 0,
    }));
  };

  const handleSubmit = async (weekKey, dayKey, selectedPlayer, handleClose) => {
    if (validateForm()) {
      const payload = {
        intervalInMinutes: parseInt(formData.duration),
        value: parseInt(formData.rpe),
        leagueWeek: weekKey,
        date: new Date().toISOString().split("T")[0],
        dayOfWeek: parseInt(dayKey, 10),
      };

      try {
        await ApiClient.post(`add-rpe/${selectedPlayer}`, payload);
        setFormData({ rpe: "", duration: "" });
        if (handleClose) {
          handleClose();
        }
      } catch (error) {
        alert("Failed to submit the form. Please try again.");
        console.error("API Error:", error);
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
            RPE value must be greater than 0.
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
            Duration must be greater than 0.
          </Form.Text>
        )}
      </Form.Group>
    </Form>
  );
});

export default AddEntryFormRPE;
