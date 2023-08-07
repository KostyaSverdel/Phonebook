import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginUser } from 'redux/api';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [user, setUser] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleChangeEmail = e => {
    const { value } = e.target;
    setUser(prev => ({ ...prev, email: value }));
  };

  const handleChangePassword = e => {
    const { value } = e.target;
    setUser(prev => ({ ...prev, password: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    await dispatch(loginUser(user))
      .then(() => {
        navigate('/contacts');
        setError(null);
      })
      .catch(error => {
        setError(error.message);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Log In</h2>
      {error && <p>{error}</p>}
      <label>
        Email
        <input
          type="email"
          name="email"
          value={user.email}
          onChange={handleChangeEmail}
        />
      </label>
      <label>
        Password
        <input
          type="password"
          name="password"
          value={user.password}
          onChange={handleChangePassword}
        />
      </label>
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;
