const { Router } = require("express");
const authMiddleware = require("../middleware/auth-middleware");
const UserController = require("../controllers/user-controller");
const { route } = require("express/lib/application");

const router = new Router();

router.post("/registration", UserController.registration);
router.post("/login", UserController.login);
router.post("/logout", UserController.logout);
router.get("/activate/:link", UserController.activate);
router.get("/refresh", UserController.refresh);
router.get("/test", (req, res) => res.json("HELLO"));

module.exports = router;
