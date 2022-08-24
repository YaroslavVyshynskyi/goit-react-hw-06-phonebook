import { useEffect } from "react";
import { nanoid } from 'nanoid';
import { useSelector, useDispatch } from "react-redux";
import ContactForm from "./ContactForm/ContactForm";
import ContactList from "./ContactList/ContactList";
import Filter from "./Filter/Filter";
import { addContact, deleteContact as deleteContactAction,changeFilter as changeFilterAction } from "slice/contactsSlice";

const App = () => {
  const {items: contacts, filter } = useSelector(store => { return store.contacts });
  const dispatch = useDispatch();
 
  useEffect(() => {
    localStorage.setItem("contacts", JSON.stringify(contacts));
  }, [contacts]);

  const handleAddContact = data => {
    const existingContactsNames = contacts.map(({ name }) => name.toLowerCase());
    if (existingContactsNames.includes(data.name.toLowerCase())) {
      alert(`${data.name} is already in contacts`)
      return
    }
    
    const contact = {
      name: data.name,
      number: data.number,
      id: nanoid()
    };
    
    dispatch(addContact(contact))
  };

  const changeFilter = e => {
    dispatch(changeFilterAction(e.target.value))
  };
  
  const getVisibleContacts = () => { 
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
    contact.name.toLowerCase().includes(normalizedFilter));
  }

  const deleteContact = (deleteId) => {
    dispatch(deleteContactAction(deleteId));
  };
  
  const visibleContacts = getVisibleContacts();
  const containerStyles = {
      display: "block",
      margin: "0 auto",
      width: "400px",
  }

    const contactsLength = contacts.length;

    return (
      <div style={containerStyles}>
        <h1>Phonebook</h1>
        <ContactForm onSubmit={handleAddContact} />

        <h2>Contacts</h2>
        {contactsLength > 0
          ? <>
            <Filter value={filter} onChange={changeFilter} />
            <ContactList contacts={visibleContacts} deleteContact={deleteContact} />
          </>
          : "no contacts"}
      </div>  
    )
  };

export default App;

