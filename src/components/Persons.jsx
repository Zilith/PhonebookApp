import Person from "./Person";

const Persons = ({ filteredPersons, handleDelete }) => (
  <>
    {filteredPersons.map((p) => (
      <Person key={p.id} p={p} handleDelete={handleDelete} />
    ))}
  </>
);

export default Persons;
