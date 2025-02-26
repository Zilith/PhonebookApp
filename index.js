const express = require("express");
const app = express();
const morgan = require("morgan");

app.use(express.json());
app.use(morgan("tiny"));

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

const generateId = (min, max) => {
  const random = Math.random() * (max - min) + min;
  return random;
};

const nameExist = (name) => {
  const exist = persons.find((person) => person.name === name);
  return Boolean(exist);
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
    res.json(person);
  } else {
    res.status(404).json({
      error: `the person with the id of ${id} does not exist`,
    });
  }
});

app.post("/api/persons", (req, res) => {
  const body = req.body;
  const id = generateId(0, 500);

  if (!body.name) {
    return res.status(400).json({
      error: "name is missing",
    });
  }

  if (!body.number) {
    return res.status(400).json({
      error: "number is missing",
    });
  }

  const notUnique = nameExist(body.name);

  if (notUnique) {
    return res.status(400).json({
      error: `the name ${body.name} is already in the phonebook`,
    });
  }

  const person = {
    id: id,
    name: body.name,
    number: body.number,
  };

  persons = persons.concat(person);
  res.json(person);
});

app.delete("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  persons = persons.filter((person) => person.id !== id);
  res.status(204).end();
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
