import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useParams, useHistory } from 'react-router-dom';

const UserEdit = () => {
  const { id } = useParams();
  const { register, handleSubmit, setValue } = useForm();
  const [user, setUser] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const history = useHistory();

  useEffect(() => {
    fetchUser(id);
  }, [id]);

  const fetchUser = async (id) => {
    try {
      const response = await axios.get(`http://localhost:3001/api/datos/${id}`);
      const userData = response.data;
      setUser(userData);
      setValue('name', userData.name);
      setValue('email', userData.email);
    } catch (error) {
      console.error(error);
    }
  };

  const onSubmit = async (data) => {
    try {
      await axios.put(`http://localhost:3001/api/datos/${id}`, data);
      setSuccessMessage('User updated successfully');
      setTimeout(() => {
        setSuccessMessage('');
        history.push('/users');
      }, 2000);
    } catch (error) {
      console.error(error);
    }
  };

  if (!user) {
    return <div>Loading user...</div>;
  }

  return (
    <div style={{ marginLeft: '20px' }}>
      <h1>Edit User</h1>
      {successMessage && <div>{successMessage}</div>}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Name</label>
          <input type="text" {...register('name')} defaultValue={user.name} />
        </div>
        <div>
          <label>Email</label>
          <input type="email" {...register('email')} defaultValue={user.email} />
        </div>
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default UserEdit;
