import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import ApiClient from "../Helpers/ApiClient";

function InsertPlayer({ setPlayersUpdated }) {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    position: "",
    weight: "",
    height: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name cannot be empty.";
    }
    if (!formData.position.trim()) {
      newErrors.position = "Position cannot be empty.";
    }
    if (isNaN(formData.age) || formData.age <= 0) {
      newErrors.age = "Age must be a valid positive number.";
    }
    if (isNaN(formData.weight) || formData.weight <= 0) {
      newErrors.weight = "Weight must be a valid positive number.";
    }
    if (isNaN(formData.height) || formData.height <= 0) {
      newErrors.height = "Height must be a valid positive number.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      await ApiClient.post("addplayer", formData);
      setFormData({
        name: "",
        age: "",
        position: "",
        weight: "",
        height: "",
      });
      setErrors({});
      setPlayersUpdated((prev) => !prev);
    } catch (error) {
      console.error("Failed to add player:", error);
      setErrors({ form: "Failed to add player. Please try again." });
    }
  };

  return (
    <>
      {errors.form && <Alert variant="danger">{errors.form}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter player name"
            isInvalid={!!errors.name}
          />
          <Form.Control.Feedback type="invalid">
            {errors.name}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Age</Form.Label>
          <Form.Control
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            placeholder="Enter player age"
            isInvalid={!!errors.age}
          />
          <Form.Control.Feedback type="invalid">
            {errors.age}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Position</Form.Label>
          <Form.Control
            type="text"
            name="position"
            value={formData.position}
            onChange={handleChange}
            placeholder="Enter player position"
            isInvalid={!!errors.position}
          />
          <Form.Control.Feedback type="invalid">
            {errors.position}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Weight (kg)</Form.Label>
          <Form.Control
            type="number"
            name="weight"
            value={formData.weight}
            onChange={handleChange}
            placeholder="Enter player weight"
            isInvalid={!!errors.weight}
          />
          <Form.Control.Feedback type="invalid">
            {errors.weight}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Height (cm)</Form.Label>
          <Form.Control
            type="number"
            name="height"
            value={formData.height}
            onChange={handleChange}
            placeholder="Enter player height"
            isInvalid={!!errors.height}
          />
          <Form.Control.Feedback type="invalid">
            {errors.height}
          </Form.Control.Feedback>
        </Form.Group>
        <Button
          variant="btn btn-outline-primary"
          type="submit"
          className="w-100"
        >
          Add Player
        </Button>
      </Form>
    </>
  );
}

export default InsertPlayer;
