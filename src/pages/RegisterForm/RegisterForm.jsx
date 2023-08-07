import { React, useState } from 'react';
import { useDispatch } from 'react-redux';
import { registerUser } from 'redux/api';

const RegisterForm = () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState(null);

  const dispatch = useDispatch();

  const handleChangeName = e => {
    const { value } = e.target;
    setUser(prev => ({ ...prev, name: value }));
  };

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
    await dispatch(registerUser(user))
      .then(() => {
        setUser({ name: '', email: '', password: '' });
        setError(null);
      })
      .catch(error => {
        setError(error.message);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Registration</h2>
      {error && <p>{error}</p>}
      <label>
        Name
        <input
          type="text"
          name="name"
          value={user.name}
          onChange={handleChangeName}
        />
      </label>
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
      <button type="submit">Register</button>
    </form>
  );
};

export default RegisterForm;
//Twotest@test.com twotest11111
//rosie.test@test.com rosie12345
