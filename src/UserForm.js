import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';

const UserForm = () => {
  const { register, handleSubmit } = useForm();
  const [successMessage, setSuccessMessage] = useState('');

  const onSubmit = async (data) => {
    try {
      await axios.post('http://localhost:3001/api/datos', data);
      setSuccessMessage('User added successfully');
      setTimeout(() => {
        setSuccessMessage('');
        window.location.href = '/users';
      }, 2000);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={{ marginLeft: '20px' }}>
      <h1>Add User</h1>
      {successMessage && <div>{successMessage}</div>}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Name</label>
          <input type="text" {...register('name')} />
        </div>
        <div>
          <label>Email</label>
          <input type="email" {...register('email')} />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default UserForm;
