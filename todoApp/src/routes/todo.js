const router = module.exports = require('express').Router();
const verifyToken = require("../middlewares/verifyToken");
const {deleteTodo,editTodo,insertTodo,getTodos} = require("../core/todo")

const {verifyTodoData,verifyOwnership} = require("../middlewares/todo")

router.delete("/api/delete/:id", verifyToken,verifyOwnership, deleteTodo);

router.put("/api/edit", verifyToken,verifyTodoData, editTodo);

router.post("/api/insert", verifyToken,verifyTodoData,insertTodo);

router.get("/api/todos", verifyToken,getTodos);