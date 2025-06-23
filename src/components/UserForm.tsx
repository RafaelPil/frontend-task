import { useState, useEffect } from "react";
import type { User, UserFormData } from "../types";


interface UserFormProps {
  onSubmit: (user: UserFormData) => void;
  editUser?: User;
  onCancel?: () => void;
}

interface FormErrors {
  name?: string;
  position?: string;
  gender?: string;
  age?: string;
}

const UserForm = ({
  onSubmit,
  editUser,
  onCancel,
}: UserFormProps) => {
  const [formData, setFormData] = useState<UserFormData>({
    name: "",
    position: "",
    gender: "Male",
    age: 18,
  });

  const [errors, setErrors] = useState<FormErrors>({});

  useEffect(() => {
    if (editUser) {
      setFormData({
        name: editUser.name,
        position: editUser.position,
        gender: editUser.gender,
        age: editUser.age,
      });
    }
  }, [editUser]);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    if (!formData.position.trim()) {
      newErrors.position = "Position is required";
    } else if (formData.position.trim().length < 2) {
      newErrors.position = "Position must be at least 2 characters";
    }

    if (formData.age < 16 || formData.age > 100) {
      newErrors.age = "Age must be between 16 and 100";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    onSubmit(formData);

    if (!editUser) {
      setFormData({
        name: "",
        position: "",
        gender: "Male",
        age: 18,
      });
      setErrors({});
    }
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    }
    if (!editUser) {
      setFormData({
        name: "",
        position: "",
        gender: "Male",
        age: 18,
      });
      setErrors({});
    }
  };

  const handleInputChange = (
    field: keyof UserFormData,
    value: string | number
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    // Clear errors when user starts typing
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="user-form" noValidate>
      <div className="form-group">
        <label htmlFor="name">Name *</label>
        <input
          type="text"
          id="name"
          value={formData.name}
          onChange={(e) => handleInputChange("name", e.target.value)}
          placeholder="Enter name"
          className={errors.name ? "error" : ""}
          required
        />
        {errors.name && <span className="error-message">{errors.name}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="position">Position *</label>
        <input
          type="text"
          id="position"
          value={formData.position}
          onChange={(e) => handleInputChange("position", e.target.value)}
          placeholder="Enter position"
          className={errors.position ? "error" : ""}
          required
        />
        {errors.position && (
          <span className="error-message">{errors.position}</span>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="gender">Gender</label>
        <select
          id="gender"
          value={formData.gender}
          onChange={(e) =>
            handleInputChange("gender", e.target.value as User["gender"])
          }
        >
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="age">Age</label>
        <input
          type="number"
          id="age"
          value={formData.age}
          onChange={(e) =>
            handleInputChange("age", parseInt(e.target.value) || 18)
          }
          min="16"
          max="100"
          className={errors.age ? "error" : ""}
          required
        />
        {errors.age && <span className="error-message">{errors.age}</span>}
      </div>

      <div className="form-actions">
        <button type="submit" className="btn btn-primary">
          {editUser ? "Update" : "Add"}
        </button>
        {(editUser || onCancel) && (
          <button
            type="button"
            onClick={handleCancel}
            className="btn btn-secondary"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

export default UserForm;
