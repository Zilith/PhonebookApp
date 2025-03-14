const Filter = ({persons, setFilteredPersons}) => {
    const handleFilter = (e) => {
        const noFilter = e.target.value === "";
        setFilteredPersons(
          noFilter
            ? persons
            : persons.filter((p) =>
                p.name.toLowerCase().includes(e.target.value.toLowerCase())
              )
        );
      };

  return (
    <div>
      filter shown with: <input onChange={handleFilter} />
    </div>
  );
};

export default Filter;
