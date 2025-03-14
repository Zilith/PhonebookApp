import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import personService from "./services/persons";
import Notification from "./components/Notification";
import "./App.css";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [filteredPersons, setFilteredPersons] = useState([]);
  const [notificationMessage, setNotificationMessage] = useState();
  const [notificationError, setNotificationError] = useState();

  const hook = () => {
    personService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
      setFilteredPersons(initialPersons);
    });
  };

  useEffect(hook, []);

  const handleDelete = (p) => {
    if (window.confirm(`Delete ${p.name}?`)) {
      personService.deletePerson(p.id).then((deletedPerson) => {
        console.log("person deleted", deletedPerson);
      });
      setPersons(persons.filter((person) => person.id !== p.id));
      setFilteredPersons(
        filteredPersons.filter((person) => person.id !== p.id)
      );
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification Message={notificationMessage} Class={"noti"} />
      <Notification Message={notificationError} Class={"error"} />
      <Filter persons={persons} setFilteredPersons={setFilteredPersons} />

      <h2>add a new</h2>

      <PersonForm
        persons={persons}
        setPersons={setPersons}
        newName={newName}
        setNewName={setNewName}
        newPhone={newPhone}
        setNewPhone={setNewPhone}
        setFilteredPersons={setFilteredPersons}
        setNotificationMessage={setNotificationMessage}
        setNotificationError={setNotificationError}
      />

      <h2>Phones</h2>

      <Persons filteredPersons={filteredPersons} handleDelete={handleDelete} />
    </div>
  );
};

export default App;
