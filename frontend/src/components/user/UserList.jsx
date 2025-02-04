// components/User/UserList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('/api/users'); /
        setUsers(response.data);
      } catch (err) {
        setError(err.message || 'Error fetching users.');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return <div>Loading users...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (users.length === 0) {
    return <div>No users found.</div>;
  }

  return (
    <div>
      <h2>User List</h2>
      <table className="table-auto w-full border-collapse border border-gray-300"> {/* Tailwind CSS table styling */}
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">ID</th>
            <th className="border border-gray-300 px-4 py-2">First Name</th>
            <th className="border border-gray-300 px-4 py-2">Last Name</th>
            <th className="border border-gray-300 px-4 py-2">Email</th>
            {/* Add more table headers as needed */}
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}> {/* Assuming your users have an _id field */}
              <td className="border border-gray-300 px-4 py-2">{user._id}</td>
              <td className="border border-gray-300 px-4 py-2">{user.firstName}</td>
              <td className="border border-gray-300 px-4 py-2">{user.lastName}</td>
              <td className="border border-gray-300 px-4 py-2">{user.email}</td>
              {/* Add more table cells as needed */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;