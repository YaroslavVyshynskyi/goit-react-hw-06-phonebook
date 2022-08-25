import { useSelector } from "react-redux";
import ContactForm from "./ContactForm/ContactForm";
import ContactList from "./ContactList/ContactList";
import Filter from "./Filter/Filter";

const containerStyles = {
  display: "block",
  margin: "0 auto",
  width: "400px",
};

const App = () => {
  const {items: contacts} = useSelector(store => { return store.contacts });
  
  const contactsLength = contacts.length;

    return (
      <div style={containerStyles}>
        <h1>Phonebook</h1>
        <ContactForm />

        <h2>Contacts</h2>
        {contactsLength > 0
          ? <>
            <Filter />
            <ContactList />
          </>
          : "no contacts"}
      </div>  
    )
  };

export default App;

