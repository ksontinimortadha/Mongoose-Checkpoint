const Person = require("./models/person");

// Create_and_Save_a_Record_of_a_Model
Person.insertMany([
  {
    name: "ksontini mortadha",
    age: 23,
    favoriteFoods: ["Lasagne", "watermelon"],
  },
]).then((insertedElement) => {
  console.log("The Inserted Elemenmt: ", insertedElement);
});

// Create several people using model.create()
Person.create([
  {
    name: "Person 1",
    age: 34,
    favoriteFoods: ["favfood"],
  },
  {
    name: "Person 2",
    age: 43,
    favoriteFoods: ["favfood"],
  },
  {
    name: "Person 3",
    age: 19,
    favoriteFoods: ["favfood"],
  },
]).then((insertedElement) => {
  console.log("The Inserted Elemenmt: ", insertedElement);
});

// Use_model.find()_to_Search_Your_Database
Person.find().then((remainingPerson) => {
  console.log(remainingPerson);
});

// Find one person with a certain food in favorites
const foodToSearch = "Lasagne";
Person.findOne({ favoriteFoods: foodToSearch }, function (err, person) {
  if (err) throw err;
  console.log(`Person with ${foodToSearch} in favorites:`, person.name);
});

// Find a person by _id and update favoriteFoods
const personIdToUpdate = "658a901f0f0b891c605cfd67";

// Find a person by _id
Person.findById(personIdToUpdate, function (err, person) {
  if (err) {
    // Handle the error, e.g., log it or send an error response
    throw err;
  }

  if (!person) {
    // Handle the case where the person with the specified _id is not found
    console.log("Person not found with _id:", personIdToUpdate);
    return;
  }

  // Add "hamburger" to the list of favoriteFoods
  person.favoriteFoods = person.favoriteFoods || []; // Ensure favoriteFoods is an array
  person.favoriteFoods.push("Hamburger");

  // Save the updated person
  person.save(function (err, updatedPerson) {
    if (err) {
      // Handle the error, e.g., log it or send an error response
      throw err;
    }
    console.log("Person food updated:", updatedPerson);
  });
});

// Find a person by name and update age to 20
Person.findOneAndUpdate(
  { name: "ksontini mortadha" },
  { $set: { age: "20" } }
).then((updatedPerson) => {
  console.log("Updated Person: ", updatedPerson);
});

// Delete one person by _id
const personIdToRemove = "616adc1542221ee3848c8903";
Person.findByIdAndRemove(personIdToRemove, function (err, removedPerson) {
  if (err) throw err;
  console.log("Person removed:", removedPerson);
});

// Delete all people whose name is "Mary"
const personNameToRemove = "Mary";
Person.deleteOne({ name: personNameToRemove }, function (err, result) {
  if (err) throw err;
  console.log(
    `${result.deletedCount} people with name ${personNameToRemove} deleted`
  );
});

// Find people who like burritos, sort by name, limit to 2, hide their age
Person.find({ favoriteFoods: "Burritos" })
  .sort("name")
  .limit(2)
  .select("-age")
  .exec(function (err, data) {
    if (err) throw err;
    console.log("People who like burritos:", data);
  });
