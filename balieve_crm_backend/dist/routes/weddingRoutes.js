"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const weddingsModel_1 = __importDefault(require("../models/weddingsModel"));
const catchAsync_1 = require("../utilities/catchAsync");
const weddingsController_1 = require("../controllers/weddingsController");
const router = express_1.default.Router();
router.get('/', (0, catchAsync_1.catchAsync)(weddingsController_1.getWeddings));
router.post('/', (0, catchAsync_1.catchAsync)(weddingsController_1.createWedding));
router.get('/:id', (0, catchAsync_1.catchAsync)(weddingsController_1.getWedding));
router.put('/:id', (0, catchAsync_1.catchAsync)(weddingsController_1.updateWedding));
router.delete('/:id', (0, catchAsync_1.catchAsync)(weddingsController_1.deleteWedding));
router.get('/:id/checklist', (0, catchAsync_1.catchAsync)(async (req, res) => {
    const wedding = await weddingsModel_1.default.findById(req.params.id);
    if (!wedding) {
        return res.status(404).json({ error: 'Wedding not found' });
    }
    const checklist = wedding.checklist;
    res.status(200).json(checklist);
}));
router.post('/:id/checklist/', (0, catchAsync_1.catchAsync)(async (req, res) => {
    const weddingId = req.params.id;
    const { type, vendor, tasks } = req.body;
    // the mongoose version
    const updateObject = { $push: { checklist: {} } };
    if (type)
        updateObject.$push.checklist.type = type;
    if (vendor)
        updateObject.$push.checklist.vendor = vendor;
    if (tasks)
        updateObject.$push.checklist.tasks = tasks;
    const updateWedding = await weddingsModel_1.default.findOneAndUpdate({ _id: weddingId }, updateObject, { new: true });
    if (!updateWedding) {
        return res.status(404).json({ error: 'Wedding not found' });
    }
    res.status(200).json(updateWedding);
    /*
    const wedding = await Wedding.findById(weddingId);

    if (!wedding) {
      return res.status(404).json({ error: 'Wedding not found' });
    }

    wedding.checklist.push({
      type: type!,
      vendor: vendor!,
      tasks: tasks!,
    });

    await wedding.save(); */
    // res.status(200).json(wedding);
}));
router.get('/:id/checklist/:checklistId', (0, catchAsync_1.catchAsync)(async (req, res) => {
    const weddingId = req.params.id;
    const checklistId = req.params.checklistId;
    const wedding = await weddingsModel_1.default.findById(weddingId);
    if (!wedding) {
        return res.status(404).json({ error: 'Wedding not found' });
    }
    const checklistItem = wedding.checklist.find((checklist) => { var _a; return ((_a = checklist._id) === null || _a === void 0 ? void 0 : _a.toString()) === checklistId; });
    if (!checklistItem) {
        return res.status(404).json({ error: 'Checklist not found' });
    }
    res.status(200).json(checklistItem);
}));
router.put('/:id/checklist/:checklistId', (0, catchAsync_1.catchAsync)(async (req, res) => {
    const weddingId = req.params.id;
    const checklistId = req.params.checklistId;
    const wedding = await weddingsModel_1.default.findById(weddingId);
    if (!wedding) {
        return res.status(404).json({ error: 'Wedding not found' });
    }
    const checklistItem = wedding.checklist.find((checklist) => { var _a; return ((_a = checklist._id) === null || _a === void 0 ? void 0 : _a.toString()) === checklistId; });
    if (!checklistItem) {
        return res.status(404).json({ error: 'Checklist not found' });
    }
    const { type, vendor, tasks } = req.body;
    if (type)
        checklistItem.type = type;
    if (vendor)
        checklistItem.vendor = vendor;
    if (tasks)
        checklistItem.tasks = tasks;
    await wedding.save();
    res.status(200).json(wedding);
}));
router.delete('/:id/checklist/:checklistId', (0, catchAsync_1.catchAsync)(async (req, res) => {
    const weddingId = req.params.id;
    const checklistId = req.params.checklistId;
    const wedding = await weddingsModel_1.default.findByIdAndUpdate(weddingId, {
        $pull: {
            checklist: {
                _id: checklistId,
            },
        },
    }, { new: true });
    if (!wedding) {
        return res.status(404).json({ error: 'Wedding not found' });
    }
    await wedding.save();
    res.status(200).json(wedding);
}));
router.get('/:id/checklist/:checklistId/tasks', (0, catchAsync_1.catchAsync)(async (req, res) => {
    const weddingId = req.params.id;
    const checklistId = req.params.checklistId;
    const wedding = await weddingsModel_1.default.findById(weddingId);
    if (!wedding) {
        return res.status(404).json({ error: 'Wedding not found' });
    }
    const checklistItem = wedding.checklist.find((checklist) => { var _a; return ((_a = checklist._id) === null || _a === void 0 ? void 0 : _a.toString()) === checklistId; });
    if (!checklistItem) {
        return res.status(404).json({ error: 'Checklist not found' });
    }
    const tasks = checklistItem.tasks;
    res.status(200).json(tasks);
}));
router.post('/:id/checklist/:checklistId/tasks', (0, catchAsync_1.catchAsync)(async (req, res) => {
    const weddingId = req.params.id;
    const checklistId = req.params.checklistId;
    const wedding = await weddingsModel_1.default.findById(weddingId);
    if (!wedding) {
        return res.status(404).json({ error: 'Wedding not found' });
    }
    const checklistItem = wedding.checklist.find((checklist) => { var _a; return ((_a = checklist._id) === null || _a === void 0 ? void 0 : _a.toString()) === checklistId; });
    if (!checklistItem) {
        return res.status(404).json({ error: 'Checklist not found' });
    }
    const { task, completed, todos } = req.body;
    const newTask = {
        task: task,
        completed: completed,
        todos: todos,
    };
    checklistItem.tasks.push(newTask);
    await wedding.save();
    res.status(200).json(wedding);
}));
router.get('/:id/checklist/:checklistId/tasks/:taskId', (0, catchAsync_1.catchAsync)(async (req, res) => {
    const weddingId = req.params.id;
    const checklistId = req.params.checklistId;
    const taskId = req.params.taskId;
    const wedding = await weddingsModel_1.default.findById(weddingId);
    if (!wedding) {
        return res.status(404).json({ error: 'Wedding not found' });
    }
    const checklistItem = wedding.checklist.find((item) => { var _a; return ((_a = item._id) === null || _a === void 0 ? void 0 : _a.toString()) === checklistId; });
    if (!checklistItem) {
        return res.status(404).json({ error: 'Checklist not found' });
    }
    const task = checklistItem.tasks.find((item) => { var _a; return ((_a = item._id) === null || _a === void 0 ? void 0 : _a.toString()) === taskId; });
    if (!task) {
        return res.status(404).json({ error: 'Task not found' });
    }
    res.status(200).json(task);
}));
router.put('/:id/checklist/:checklistId/tasks/:taskId', (0, catchAsync_1.catchAsync)(async (req, res) => {
    const weddingId = req.params.id;
    const checklistId = req.params.checklistId;
    const taskId = req.params.taskId;
    const { task, completed, todos } = req.body;
    const wedding = await weddingsModel_1.default.findById(weddingId);
    if (!wedding) {
        return res.status(404).json({ error: 'Wedding not found' });
    }
    const checklistItem = wedding.checklist.find((item) => { var _a; return ((_a = item._id) === null || _a === void 0 ? void 0 : _a.toString()) === checklistId; });
    if (!checklistItem) {
        return res.status(404).json({ error: 'Checklist not found' });
    }
    const taskItem = checklistItem.tasks.find((item) => { var _a; return ((_a = item._id) === null || _a === void 0 ? void 0 : _a.toString()) === taskId; });
    if (!taskItem) {
        return res.status(404).json({ error: 'Task not found' });
    }
    if (task)
        taskItem.task = task;
    if (completed)
        taskItem.completed = completed;
    if (todos)
        taskItem.todos = todos;
    await wedding.save();
    res.status(200).json(wedding);
}));
router.delete('/:id/checklist/:checklistId/tasks/:taskId', (0, catchAsync_1.catchAsync)(async (req, res) => {
    const weddingId = req.params.id;
    const checklistId = req.params.checklistId;
    const taskId = req.params.taskId;
    const wedding = await weddingsModel_1.default.findById(weddingId);
    if (!wedding) {
        return res.status(404).json({ error: 'Wedding not found' });
    }
    const checklistItem = wedding.checklist.find((item) => { var _a; return ((_a = item._id) === null || _a === void 0 ? void 0 : _a.toString()) === checklistId; });
    if (!checklistItem) {
        return res.status(404).json({ error: 'Checklist not found' });
    }
    const taskItem = checklistItem.tasks.find((item) => { var _a; return ((_a = item._id) === null || _a === void 0 ? void 0 : _a.toString()) === taskId; });
    if (!taskItem) {
        return res.status(404).json({ error: 'Task not found' });
    }
    checklistItem.tasks = checklistItem.tasks.filter((item) => { var _a; return ((_a = item._id) === null || _a === void 0 ? void 0 : _a.toString()) !== taskId; });
    await wedding.save();
    res.status(200).json(wedding);
}));
router.get('/:id/checklist/:checklistId/tasks/:taskId/todos', (0, catchAsync_1.catchAsync)(async (req, res) => {
    const weddingId = req.params.id;
    const checklistId = req.params.checklistId;
    const taskId = req.params.taskId;
    const wedding = await weddingsModel_1.default.findById(weddingId);
    if (!wedding) {
        return res.status(404).json({ error: 'Wedding not found' });
    }
    const checklistItem = wedding.checklist.find((item) => { var _a; return ((_a = item._id) === null || _a === void 0 ? void 0 : _a.toString()) === checklistId; });
    if (!checklistItem) {
        return res.status(404).json({ error: 'Checklist not found' });
    }
    const taskItem = checklistItem.tasks.find((item) => { var _a; return ((_a = item._id) === null || _a === void 0 ? void 0 : _a.toString()) === taskId; });
    if (!taskItem) {
        return res.status(404).json({ error: 'Task not found' });
    }
    res.status(200).json(taskItem.todos);
}));
router.get('/:id/checklist/:checklistId/tasks/:taskId/todos/:todoId', (0, catchAsync_1.catchAsync)(async (req, res) => {
    const weddingId = req.params.id;
    const checklistId = req.params.checklistId;
    const taskId = req.params.taskId;
    const todoId = req.params.todoId;
    const wedding = await weddingsModel_1.default.findById(weddingId);
    if (!wedding) {
        return res.status(404).json({ error: 'Wedding not found' });
    }
    const checklistItem = wedding.checklist.find((item) => {
        var _a;
        return ((_a = item._id) === null || _a === void 0 ? void 0 : _a.toString()) === checklistId;
    });
    if (!checklistItem) {
        return res.status(404).json({ error: 'Checklist not found' });
    }
    const taskItem = checklistItem.tasks.find((item) => {
        var _a;
        return ((_a = item._id) === null || _a === void 0 ? void 0 : _a.toString()) === taskId;
    });
    if (!taskItem) {
        return res.status(404).json({ error: 'Task not found' });
    }
    const todoItem = taskItem.todos.find((item) => {
        var _a;
        return ((_a = item._id) === null || _a === void 0 ? void 0 : _a.toString()) === todoId;
    });
    if (!todoItem) {
        return res.status(404).json({ error: 'Todo not found' });
    }
    res.status(200).json(todoItem);
}));
router.post('/:id/checklist/:checklistId/tasks/:taskId/todos', (0, catchAsync_1.catchAsync)(async (req, res) => {
    const weddingId = req.params.id;
    const checklistId = req.params.checklistId;
    const taskId = req.params.taskId;
    const { todo, date, deadline, done } = req.body;
    const wedding = await weddingsModel_1.default.findById(weddingId);
    if (!wedding) {
        return res.status(404).json({ error: 'Wedding not found' });
    }
    const checklistItem = wedding.checklist.find((item) => { var _a; return ((_a = item._id) === null || _a === void 0 ? void 0 : _a.toString()) === checklistId; });
    if (!checklistItem) {
        return res.status(404).json({ error: 'Checklist not found' });
    }
    const taskItem = checklistItem.tasks.find((item) => { var _a; return ((_a = item._id) === null || _a === void 0 ? void 0 : _a.toString()) === taskId; });
    if (!taskItem) {
        return res.status(404).json({ error: 'Task not found' });
    }
    const newTodo = {
        todo: todo,
        date: date,
        deadline: deadline,
        done: done,
    };
    taskItem.todos.push(newTodo);
    await wedding.save();
    res.status(200).json(wedding);
}));
router.put('/:id/checklist/:checklistId/tasks/:taskId/todos/:todoId', (0, catchAsync_1.catchAsync)(async (req, res) => {
    const weddingId = req.params.id;
    const checklistId = req.params.checklistId;
    const taskId = req.params.taskId;
    const todoId = req.params.todoId;
    const { todo, date, deadline, done } = req.body;
    const wedding = await weddingsModel_1.default.findById(weddingId);
    if (!wedding) {
        return res.status(404).json({ error: 'Wedding not found' });
    }
    const checklistItem = wedding.checklist.find((item) => { var _a; return ((_a = item._id) === null || _a === void 0 ? void 0 : _a.toString()) === checklistId; });
    if (!checklistItem) {
        return res.status(404).json({ error: 'Checklist not found' });
    }
    const taskItem = checklistItem.tasks.find((item) => { var _a; return ((_a = item._id) === null || _a === void 0 ? void 0 : _a.toString()) === taskId; });
    if (!taskItem) {
        return res.status(404).json({ error: 'Task not found' });
    }
    const todoItem = taskItem.todos.find((item) => { var _a; return ((_a = item._id) === null || _a === void 0 ? void 0 : _a.toString()) === todoId; });
    if (!todoItem) {
        return res.status(404).json({ error: 'Todo not found' });
    }
    if (todo)
        todoItem.todo = todo;
    if (date)
        todoItem.date = date;
    if (deadline)
        todoItem.deadline = deadline;
    if (done)
        todoItem.done = done;
    await wedding.save();
    res.status(200).json(wedding);
}));
router.delete('/:id/checklist/:checklistId/tasks/:taskId/todos/:todoId', (0, catchAsync_1.catchAsync)(async (req, res) => {
    const weddingId = req.params.id;
    const checklistId = req.params.checklistId;
    const taskId = req.params.taskId;
    const todoId = req.params.todoId;
    const wedding = await weddingsModel_1.default.findById(weddingId);
    if (!wedding) {
        return res.status(404).json({ error: 'Wedding not found' });
    }
    const checklistItem = wedding.checklist.find((item) => { var _a; return ((_a = item._id) === null || _a === void 0 ? void 0 : _a.toString()) === checklistId; });
    if (!checklistItem) {
        return res.status(404).json({ error: 'Checklist not found' });
    }
    const taskItem = checklistItem.tasks.find((item) => { var _a; return ((_a = item._id) === null || _a === void 0 ? void 0 : _a.toString()) === taskId; });
    if (!taskItem) {
        return res.status(404).json({ error: 'Task not found' });
    }
    const todoItem = taskItem.todos.find((item) => { var _a; return ((_a = item._id) === null || _a === void 0 ? void 0 : _a.toString()) === todoId; });
    if (!todoItem) {
        return res.status(404).json({ error: 'Todo not found' });
    }
    taskItem.todos = taskItem.todos.filter((item) => { var _a; return ((_a = item._id) === null || _a === void 0 ? void 0 : _a.toString()) !== todoId; });
    await wedding.save();
    res.status(200).json(wedding);
}));
exports.default = router;
