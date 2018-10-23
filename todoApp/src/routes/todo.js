const router = module.exports = require('express').Router();
const verifyToken = require("../middlewares/verifyToken");

const {deleteTodo,editTodo,insertTodo,getTodos} = require("../core/todo")


router.delete("/api/delete/:id", verifyToken, deleteTodo);

router.put("/api/edit", verifyToken, editTodo);

router.post("/api/insert", verifyToken,insertTodo);

router.get("/api/todos", verifyToken,getTodos);