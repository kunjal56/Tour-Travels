const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/tours-travel")
const db = mongoose.connection
db.once("open", (err) => {
    console.log(err ? err : "database connected")
})