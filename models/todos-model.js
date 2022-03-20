const { Schema, model } = require("mongoose");

const TodoItemSchema = new Schema({
  title: {
    type: Schema.Types.String,
  },
  date: {
    type: Schema.Types.Number,
  },
  todos: {
    type: Schema.Types.ObjectId,
    ref: "Todos",
  },
});

const TodosSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = {
  TodoItemsModel: model("TodoItems", TodoItemSchema),
  TodosModel: model("Todos", TodosSchema),
};
