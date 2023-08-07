import {
  ContactForm,
  ContactList,
  Filter,
} from 'components/Contacts/indexCont';

const ContactsPage = () => {
  return (
    <div>
      <ContactForm />
      <Filter />
      <ContactList />
    </div>
  );
};

export default ContactsPage;
