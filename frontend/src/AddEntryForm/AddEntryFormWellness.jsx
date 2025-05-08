import React, { useState, forwardRef, useImperativeHandle } from "react";
import { Form } from "react-bootstrap";
import ApiClient from "../Helpers/ApiClient";

const AddEntryFormWellness = forwardRef(({}, ref) => {
  const [formData, setFormData] = useState({
    muscle: "",
    recovery: "",
    stress: "",
    sleep: "",
  });

  const [formErrors, setFormErrors] = useState({
    muscle: false,
    recovery: false,
    stress: false,
    sleep: false,
  });

  const validateForm = () => {
    const errors = { ...formErrors };
    let isValid = true;

    ["muscle", "recovery", "stress", "sleep"].forEach((field) => {
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
        muscleStatus: parseInt(formData.muscle),
        recoveryStatus: parseInt(formData.recovery),
        stressStatus: parseInt(formData.stress),
        sleepStatus: parseInt(formData.sleep),
        leagueWeek: weekKey,
        date: new Date().toISOString().split("T")[0],
        dayOfWeek: parseInt(dayKey, 10),
      };

      try {
        await ApiClient.post(`add-welness/${selectedPlayer}`, payload);
        setFormData({
          muscle: "",
          recovery: "",
          stress: "",
          sleep: "",
        });
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
        <Form.Label>Muscle</Form.Label>
        <Form.Control
          name="muscle"
          value={formData.muscle}
          onChange={handleInputChange}
          placeholder="Enter muscle value"
          className={formErrors.muscle ? "is-invalid" : ""}
        />
        {formErrors.muscle && (
          <Form.Text className="text-danger">
            Muscle value must be greater than 0.
          </Form.Text>
        )}
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Recovery</Form.Label>
        <Form.Control
          name="recovery"
          value={formData.recovery}
          onChange={handleInputChange}
          placeholder="Enter recovery value"
          className={formErrors.recovery ? "is-invalid" : ""}
        />
        {formErrors.recovery && (
          <Form.Text className="text-danger">
            Recovery value must be greater than 0.
          </Form.Text>
        )}
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Stress</Form.Label>
        <Form.Control
          name="stress"
          value={formData.stress}
          onChange={handleInputChange}
          placeholder="Enter stress value"
          className={formErrors.stress ? "is-invalid" : ""}
        />
        {formErrors.stress && (
          <Form.Text className="text-danger">
            Stress value must be greater than 0.
          </Form.Text>
        )}
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Sleep</Form.Label>
        <Form.Control
          name="sleep"
          value={formData.sleep}
          onChange={handleInputChange}
          placeholder="Enter sleep value"
          className={formErrors.sleep ? "is-invalid" : ""}
        />
        {formErrors.sleep && (
          <Form.Text className="text-danger">
            Sleep value must be greater than 0.
          </Form.Text>
        )}
      </Form.Group>
    </Form>
  );
});

export default AddEntryFormWellness;
