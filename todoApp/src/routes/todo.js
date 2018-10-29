const router = module.exports = require('express').Router();
const verifyToken = require("../middlewares/verifyToken");
const {deleteTodo,editTodo,insertTodo,getTodos,getFile} = require("../core/todo")
const {verifyTodoData,verifyOwnership} = require("../middlewares/todo")
var multer = require('multer')
var upload = multer({
    dest: './tmp'
})




router.delete("/delete/:id", verifyToken,verifyOwnership, deleteTodo);

router.put("/edit", verifyToken,upload.single('file'),verifyTodoData, editTodo);

router.post("/insert", verifyToken,upload.single('file'),verifyTodoData,insertTodo);

router.get("/todos", verifyToken,getTodos);

router.get("/file/:id",getFile);
