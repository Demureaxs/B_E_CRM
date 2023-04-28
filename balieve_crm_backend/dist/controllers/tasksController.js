"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTask = exports.updateTask = exports.getTaskById = exports.createNewTask = exports.getAllTasks = void 0;
const weddingsModel_1 = __importDefault(require("../models/weddingsModel"));
async function getAllTasks(req, res) {
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
}
exports.getAllTasks = getAllTasks;
async function createNewTask(req, res) {
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
    const { task, completed, comments } = req.body;
    const newTask = {
        task: task,
        createdAt: new Date(),
        completedAt: null,
        completed: completed,
        comments: comments,
    };
    checklistItem.tasks.push(newTask);
    await wedding.save();
    res.status(200).json(wedding);
}
exports.createNewTask = createNewTask;
async function getTaskById(req, res) {
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
}
exports.getTaskById = getTaskById;
async function updateTask(req, res) {
    const weddingId = req.params.id;
    const checklistId = req.params.checklistId;
    const taskId = req.params.taskId;
    const { agent, agentId, deadline, task, completed, comments, completedAt, } = req.body;
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
    if (completed !== undefined)
        taskItem.completed = completed;
    if (comments)
        taskItem.comments = comments;
    if (completedAt)
        taskItem.completedAt = completedAt;
    if (agent)
        taskItem.agent = agent;
    if (agentId)
        taskItem.agentId = agentId;
    if (deadline)
        taskItem.deadline = deadline;
    await wedding.save();
    res.status(200).json(wedding);
}
exports.updateTask = updateTask;
async function deleteTask(req, res) {
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
}
exports.deleteTask = deleteTask;
