const mongoose = require('mongoose');


mongoose.connect("mongodb+srv://aniket:Sq8pJb75wPupZpdi@cluster0.z8bjh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {


});

const db = mongoose.connection;

db.on('connected', () => {
  console.log("Connected to the MongoDB server");
});

db.on('disconnected', () => {
  console.log("Disconnected from the MongoDB server");
});

db.on('error', (err) => {
  console.log("DB connection error", err);
});




module.exports=db;