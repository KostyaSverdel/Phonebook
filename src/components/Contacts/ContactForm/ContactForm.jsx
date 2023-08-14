import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addContact } from 'redux/contacts/contactsOperation';
import css from '../ContactForm/ContactForm.module.css';
import { selectContacts } from 'redux/contacts/contactsSelectors';

export const ContactForm = () => {
  const dispatch = useDispatch();
  const newUser = useSelector(selectContacts);

  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleNameChange = e => {
    setName(e.target.value);
  };

  const handleNumberChange = e => {
    setNumber(e.target.value);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const isNameExist = newUser.find(contact => contact.name === name);
    const isNumberExist = newUser.find(contact => contact.number === number);

    if (!name || !number) {
      alert('Please provide both name and number');
      return;
    }
    if (isNameExist) {
      alert(`${name} is already in contacts!`);
      return;
    }
    if (isNumberExist) {
      alert(`${number} is already in contacts!`);
      return;
    }
    try {
      await dispatch(addContact({ name, number }));
      setName('');
      setNumber('');
    } catch (error) {
      console.error(error);
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
        Number
        <input
          className={css.input}
          type="text"
          name="number"
          value={number}
          onChange={handleNumberChange}
        />
      </label>

      <button type="submit" className={css.button}>
        Add contact
      </button>
    </form>
  );
};
