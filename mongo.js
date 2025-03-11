const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log("please provide password as argument");
  process.exit(1);
}
const password = process.argv[2];

const url = `mongodb+srv://Fullstack:${password}@cluster0.owsfs.mongodb.net/phonebookApp?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.set("strictQuery", false);

mongoose.connect(url);

const personSchema = new mongoose.Schema({
  name: String,
  phone: Number,
});

const Person = mongoose.model("Person", personSchema);

if (process.argv.length < 4) {
  Person.find({}).then((result) => {
    console.log("persons in collection:")
    result.forEach((person) => {
      console.log(person);
    });
    mongoose.connection.close();
  });
} else {
  if (process.argv.length < 5) {
    console.log("please provide phone as argument");
    process.exit(1);
  }
  person = new Person({
    name: process.argv[3],
    phone: process.argv[4],
  });

  person.save().then((result) => {
    console.log("note saved", result);
    mongoose.connection.close();
  });
}
