const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Note = require("./note");

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
    default: [{
      type: Schema.Types.ObjectId,
      ref: 'Note',

    }]
  }
});

const List = module.exports =  mongoose.model("List", ListSchema);