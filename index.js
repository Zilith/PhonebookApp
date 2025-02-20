const express = require("express");
const app = express();

app.use(express.json());

let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

const reqDate = () => {
  return new Date();
};

app.get("/", (req, res) => {
  res.status(200).json({
    res: "OK",
  });
});

app.get("/info", (req, res) => {
  time = reqDate();
  // console.log(time)
  res.send(`<p>The phonebook has info for ${persons.length} people </p> 
        <p>${time}</p>`);
});

app.get("/api/persons", (req, res) => {
  res.json(persons);
});

app.get("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  console.log(id);
  const person = persons.find((person) => person.id === id);
  if (person) {
      res.json(person)
  } else {
    res.status(404).json({
        error: `the person with the id of ${id} does not exist`
    })
  }
});

app.delete("/api/persons/:id", (req, res) => {
    const id = Number(req.params.id);
    persons = persons.filter(person => person.id !== id)
    res.status(204).end()
})

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
