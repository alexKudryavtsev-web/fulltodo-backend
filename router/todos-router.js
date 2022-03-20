const { Router } = require("express");
const TodosController = require("../controllers/todos-controller");
const authMiddleware = require("../middleware/auth-middleware");

const router = new Router();

router.get("/read", authMiddleware, TodosController.read);
router.post("/create", authMiddleware, TodosController.create);
router.post("/clear", authMiddleware, TodosController.clear);
router.post("/updateTodo", authMiddleware, TodosController.updateTodo);
router.post("/removeTodo", authMiddleware, TodosController.removeTodo);

module.exports = router;
