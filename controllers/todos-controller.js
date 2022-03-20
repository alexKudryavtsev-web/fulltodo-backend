const ApiError = require("../error/api-error");
const TodosService = require("../service/todos-service");

class TodosController {
  async read(req, res, next) {
    try {
      const { id } = req.user;
      const todos = await TodosService.read(id);
      res.json(todos);
    } catch (e) {
      next(e);
    }
  }

  async create(req, res, next) {
    try {
      const { id } = req.user;
      const newTodo = await TodosService.create(id);
      res.json(newTodo);
    } catch (e) {
      next(e);
    }
  }

  async removeTodo(req, res, next) {
    try {
      const { id } = req.body;

      const todo = await TodosService.removeTodo(id);
      return res.json(todo);
    } catch (e) {
      next(e);
    }
  }

  async updateTodo(req, res, next) {
    try {
      const { id, newTodo } = req.body;

      const updated = await TodosService.updateTodo(id, newTodo);
      return res.json(updated);
    } catch (e) {
      next(e);
    }
  }

  async clear(req, res, next) {
    try {
      const { id } = req.user;

      const removed = await TodosService.clear(id);
      return res.json(removed);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new TodosController();
