import Button from "./Button";

const Person = ({ p, handleDelete }) => {
  return (
    <p>
      {p.name} {p.phone}
      <Button onClick={() => handleDelete(p)}/>
    </p>
  );
};

export default Person;
