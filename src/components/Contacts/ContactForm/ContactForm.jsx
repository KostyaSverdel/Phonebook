import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addContact } from 'redux/contacts/contactsOperation';
import css from '../ContactForm/ContactForm.module.css';

export const ContactForm = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const handleNameChange = e => {
    setName(e.target.value);
  };

  const handleNumberChange = e => {
    setPhone(e.target.value);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!name || !phone) {
      alert('Please provide both name and number');
      return;
    }
    try {
      await dispatch(addContact({ name, phone }));
      setName('');
      setPhone('');
      alert('Contact is added!');
    } catch (error) {
      alert('Failed to add contact');
    }
  };

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <label className={css.label}>
        Name
        <input
          className={css.input}
          type="text"
          name="name"
          value={name}
          onChange={handleNameChange}
        />
      </label>
      <label className={css.label}>
        Phone
        <input
          className={css.input}
          type="text"
          name="phone"
          value={phone}
          onChange={handleNumberChange}
        />
      </label>

      <button type="submit" className={css.button}>
        Add contact
      </button>
    </form>
  );
};
