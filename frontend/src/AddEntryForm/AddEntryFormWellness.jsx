import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

function AddEntryFormWellness({ onSubmit }) {
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

      <Button type="submit" variant="primary">
        Submit
      </Button>
    </Form>
  );
}

export default AddEntryFormWellness;
