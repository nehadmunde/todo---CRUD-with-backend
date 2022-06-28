const express = require("express");
const todoController = require("../controller/todoController");

const router = express.Router();

router.get("/", todoController.getTodoData);

router.post("/", todoController.createTodo);

router.get("/edit/:id", todoController.editTodo);

router.put("/edit/:id", todoController.updateTodo);

router.delete("/delete/:id", todoController.deleteTodo);

module.exports = router;
