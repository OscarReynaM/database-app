import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/datos');
      setUsers(response.data);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/api/datos/${id}`);
      setSuccessMessage('User deleted successfully');
      setTimeout(() => {
        setSuccessMessage('');
        fetchUsers();
      }, 2000);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={{ marginLeft: '20px' }}>
      <h1>User List</h1>
      {users.map((user) => (
        <div key={user.id}>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
          <div>
            <button onClick={() => deleteUser(user.id)}>Delete</button>
            <span style={{ marginLeft: '10px' }}></span>
            <Link to={`/user/edit/${user.id}`}>Edit</Link>
          </div>
        </div>
      ))}
      {successMessage && <div>{successMessage}</div>}
    </div>
  );
};

export default UserList;
