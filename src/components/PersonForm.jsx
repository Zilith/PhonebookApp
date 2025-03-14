import personService from "../services/persons";

const PersonForm = ({
  persons,
  setPersons,
  newName,
  setNewName,
  newPhone,
  setNewPhone,
  setFilteredPersons,
  setNotificationMessage,
  setNotificationError,
}) => {
  const addPerson = (e) => {
    e.preventDefault();
    const samePerson = persons.find((p) => p.name === newName);
    if (samePerson === undefined) {
      const personObject = {
        name: newName,
        phone: newPhone,
      };

      personService.create(personObject).then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson));
        setNewName("");
        setNewPhone("");
        setFilteredPersons(persons.concat(returnedPerson));
        console.log("returnedPerson", returnedPerson);
        setNotificationMessage(`Added ${returnedPerson.name} to the phonebook`);
        setTimeout(() => {
          setNotificationMessage(null);
        }, 5000);
      });
    } else {
      alert(`${newName} is already in the phonebook`);
      if (window.confirm(`Replace the old phone with a new one?`)) {
        const changedPerson = { ...samePerson, phone: newPhone };
        personService
          .update(samePerson.id, changedPerson)
          .then((returnedPerson) => {
            setPersons(
              persons.map((person) =>
                person.id !== samePerson.id ? person : returnedPerson
              )
            );
            setFilteredPersons(
              persons.map((person) =>
                person.id !== samePerson.id ? person : returnedPerson
              )
            );
            setNotificationMessage(
              `Editted ${returnedPerson.name} in the phonebook`
            );
            setTimeout(() => {
              setNotificationMessage(null);
            }, 5000);
          })
          .catch(() => {
            setNotificationError(
              `The person ${samePerson.name} was already deleted from the server`
            );
            setFilteredPersons(persons.filter((person) => person.id !== samePerson.id));
            setTimeout(() => {
              setNotificationError(null);
            }, 5000);
          });
      }
    }
  };

  const handleNewName = (e) => {
    setNewName(e.target.value);
  };

  const handleNewPhone = (e) => {
    setNewPhone(e.target.value);
  };

  return (
    <form onSubmit={addPerson}>
      <div>
        name: <input value={newName} onChange={handleNewName} />
      </div>
      <div>
        phone: <input value={newPhone} onChange={handleNewPhone} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default PersonForm;
