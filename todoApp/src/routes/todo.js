const router = module.exports = require('express').Router();
const verifyToken = require("../middlewares/verifyToken");
const {deleteTodo,editTodo,insertTodo,getTodos} = require("../core/todo")

const {verifyTodoData,verifyOwnership} = require("../middlewares/todo")

router.delete("/delete/:id", verifyToken,verifyOwnership, deleteTodo);

router.put("/edit", verifyToken,verifyTodoData, editTodo);

router.post("/insert", verifyToken,verifyTodoData,insertTodo);

router.get("/todos", verifyToken,getTodos);