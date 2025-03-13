require("dotenv").config();
const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
const Person = require("./models/person.js");

app.use(express.static("dist"))
app.use(cors());
app.use(express.json());
morgan.token("data", function (req, res) {
  return JSON.stringify(req.body);
});
app.use(morgan(":method :url :response-time :data"));

const reqDate = () => {
  return new Date();
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
  Person.find({}).then((persons) => {
    res.json(persons);
  });
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

  if (!body.name) {
    return res.status(400).json({
      error: "name is missing",
    });
  }

  if (!body.phone) {
    return res.status(400).json({
      error: "phone is missing",
    });
  }

  const notUnique = nameExist(body.name);

  if (notUnique && false) {
    return res.status(400).json({
      error: `the name ${body.name} is already in the phonebook`,
    });
  }

  const person = new Person({
    name: body.name,
    phone: body.phone,
  });

  person.save().then((savedPerson) => {
    res.json(savedPerson);
  });
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
