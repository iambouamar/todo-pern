const express = require("express");
const router = express.Router();
const todosController = require("../controllers/todosController");
const verifyJWT = require("../middleware/verifyJWT");

router.use(verifyJWT);

router
  .route("/")
  .get(todosController.getAllTodos)
  .post(todosController.createNewTodo)
  .patch(todosController.updateTodo)
  .delete(todosController.deleteTodo);

module.exports = router;
