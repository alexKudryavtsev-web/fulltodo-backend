const ApiError = require("../error/api-error");
const { TodosModel, TodoItemsModel } = require("../models/todos-model");
const UserModel = require("../models/user-model");

class TodosService {
  async read(userId) {
    const todos = await TodosModel.findOne({ user: userId });
    const todoItems = await TodoItemsModel.find();

    return todoItems.filter(
      (todo) => JSON.stringify(todo.todos) === JSON.stringify(todos._id)
    );
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
    return await TodoItemsModel.findByIdAndUpdate(id, newTodo);
  }

  async clear(userId) {
    const todos = await TodosModel.findOne({ user: userId });
    return await TodoItemsModel.deleteMany({ todos: todos._id });
  }
}

module.exports = new TodosService();
