require("dotenv").config();
const mongoose = require("mongoose");

const url = process.env.MONGODB_URI;

mongoose
  .connect(url)
  .then((result) => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("Something gone wrong connecting to MongoDB", error);
  });

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: true,
  },
  phone: {
    type: String,
    minLength: 8,
    required: true,
    validate: {
      validator: function (v) {
        return /\d{2,3}-\d{8}/.test(v);
      },
    },
  },
});

personSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__V;
  },
});

module.exports = mongoose.model("Person", personSchema);
