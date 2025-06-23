import { useState } from "react";
import UserForm from "./UserForm";
import type { User, UserFormData } from "../types";

interface UserListProps {
  users: User[];
  onDelete: (id: string) => void;
  onUpdate: (id: string, user: UserFormData) => void;
  onSort: (field: keyof User) => void;
  sortBy: keyof User;
  sortDirection: "asc" | "desc";
}

const UserList = ({
  users,
  onDelete,
  onUpdate,
  onSort,
  sortBy,
  sortDirection,
}: UserListProps) => {
  const [editingUser, setEditingUser] = useState<User | null>(null);

  const handleEdit = (user: User) => {
    setEditingUser(user);
  };

  const handleUpdate = (userData: UserFormData) => {
    if (editingUser) {
      onUpdate(editingUser.id, userData);
      setEditingUser(null);
    }
  };

  const handleCancelEdit = () => {
    setEditingUser(null);
  };

  const handleDelete = (user: User) => {
    if (window.confirm(`Are you sure you want to delete "${user.name}"?`)) {
      onDelete(user.id);
    }
  };

  const getSortIcon = (field: keyof User) => {
    if (sortBy !== field) return "↕️";
    return sortDirection === "asc" ? "↑" : "↓";
  };

  const getSortLabel = (field: keyof User) => {
    const labels = {
      name: "Name",
      position: "Position",
      gender: "Gender",
      age: "Age",
      id: "ID",
    };
    return labels[field] || field;
  };

  if (users.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">👥</div>
        <h3>No users found</h3>
        <p>Add a new user using the form on the left!</p>
      </div>
    );
  }

  return (
    <div className="user-list">
      {editingUser && (
        <div className="edit-form-overlay" onClick={handleCancelEdit}>
          <div className="edit-form-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h4>Edit User</h4>
              <button
                className="close-button"
                onClick={handleCancelEdit}
                aria-label="Close"
              >
                ✕
              </button>
            </div>
            <UserForm
              onSubmit={handleUpdate}
              editUser={editingUser}
              onCancel={handleCancelEdit}
            />
          </div>
        </div>
      )}

      <div className="table-container">
        <table className="users-table">
          <thead>
            <tr>
              {(["name", "position", "gender", "age"] as const).map((field) => (
                <th
                  key={field}
                  onClick={() => onSort(field)}
                  className="sortable"
                  title={`Sort by ${getSortLabel(field).toLowerCase()}`}
                >
                  {getSortLabel(field)} {getSortIcon(field)}
                </th>
              ))}
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>
                  <div className="user-name">
                    <strong>{user.name}</strong>
                  </div>
                </td>
                <td>
                  <div className="user-position">{user.position}</div>
                </td>
                <td>
                  <span
                    className={`gender-badge gender-${user.gender.toLowerCase()}`}
                  >
                    {user.gender}
                  </span>
                </td>
                <td>
                  <span className="age-badge">{user.age} y.</span>
                </td>
                <td>
                  <div className="action-buttons">
                    <button
                      onClick={() => handleEdit(user)}
                      className="btn btn-small btn-edit"
                      title="Edit user"
                      aria-label={`Edit ${user.name}`}
                    >
                      ✏️
                    </button>
                    <button
                      onClick={() => handleDelete(user)}
                      className="btn btn-small btn-delete"
                      title="Delete user"
                      aria-label={`Delete ${user.name}`}
                    >
                      🗑️
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="table-summary">
        Total users: <strong>{users.length}</strong> | Sorted by:{" "}
        <strong>{getSortLabel(sortBy)}</strong> (
        {sortDirection === "asc" ? "ascending" : "descending"})
      </div>
    </div>
  );
};

export default UserList;
