const { TodosModel, TodoItemsModel } = require("../models/todos-model");
const compareObject = require("../utils/compateObject");

class TodosService {
  async read(userId) {
    const todos = await TodosModel.findOne({ user: userId });
    const todoItems = await TodoItemsModel.find();

    return todoItems.filter((todo) => compareObject(todo.todos, todos._id));
  }
  async create(userId) {
    const todos = await TodosModel.findOne({ user: userId });
    const todoItem = await TodoItemsModel.create({
      title: "",
      date: Date.now(),
      todos: todos._id,
    });

    await todoItem.save();
    return todoItem;
  }

  async removeTodo(id) {
    return await TodoItemsModel.findByIdAndDelete(id);
  }

  async updateTodo(id, newTodo) {
    await TodoItemsModel.findByIdAndUpdate(id, newTodo);
    return await TodoItemsModel.findById(id);
  }

  async clear(userId) {
    const todos = await TodosModel.findOne({ user: userId });
    return await TodoItemsModel.deleteMany({ todos: todos._id });
  }
}

module.exports = new TodosService();
