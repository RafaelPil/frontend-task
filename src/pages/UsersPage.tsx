import { useState, useEffect } from "react";
import UserForm from "../components/UserForm";
import UserList from "../components/UserList";
import type { User } from "../types";

const getInitialUsers = (): User[] => [
  {
    id: "1",
    name: "John Smith",
    position: "Frontend Developer",
    gender: "Male",
    age: 28,
  },
  {
    id: "2",
    name: "Jane Doe",
    position: "Backend Developer",
    gender: "Female",
    age: 32,
  },
  {
    id: "3",
    name: "Alex Johnson",
    position: "Full Stack Developer",
    gender: "Other",
    age: 25,
  },
];

const UsersPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [sortBy, setSortBy] = useState<keyof User>("name");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  // Load initial data
  useEffect(() => {
    setUsers(getInitialUsers());
  }, []);

  const addUser = (userData: Omit<User, "id">) => {
    const newUser: User = {
      ...userData,
      id: Date.now().toString(),
    };
    setUsers((prevUsers) => [...prevUsers, newUser]);
  };

  const deleteUser = (id: string) => {
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
  };

  const updateUser = (id: string, userData: Omit<User, "id">) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) => (user.id === id ? { ...userData, id } : user))
    );
  };

  const handleSort = (field: keyof User) => {
    if (sortBy === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortDirection("asc");
    }
  };

  const sortedUsers = [...users].sort((a, b) => {
    const aValue = a[sortBy];
    const bValue = b[sortBy];

    if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
    if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
    return 0;
  });

  return (
    <div className="users-page">
      <h2>User Management</h2>

      <div className="page-content">
        <div className="form-section">
          <h3>Add New User</h3>
          <UserForm onSubmit={addUser} />
        </div>

        <div className="list-section">
          <h3>Users List ({users.length})</h3>
          <UserList
            users={sortedUsers}
            onDelete={deleteUser}
            onUpdate={updateUser}
            onSort={handleSort}
            sortBy={sortBy}
            sortDirection={sortDirection}
          />
        </div>
      </div>
    </div>
  );
};

export default UsersPage;
