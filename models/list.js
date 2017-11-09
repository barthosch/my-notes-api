const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ListSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name is required"]
  },
  type: {
    type: String, //todo: type Object?
    default: "todo"
  },
  items: {
    type: Array,
    default: []
  }
});

const List = mongoose.model("list", ListSchema);
module.exports = List;