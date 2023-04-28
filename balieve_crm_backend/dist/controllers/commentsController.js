"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteComment = exports.updateComment = exports.createComment = exports.getCommentById = exports.getComments = void 0;
const weddingsModel_1 = __importDefault(require("../models/weddingsModel"));
async function getComments(req, res) {
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
    res.status(200).json(taskItem.comments);
}
exports.getComments = getComments;
async function getCommentById(req, res) {
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
    const todoItem = taskItem.comments.find((item) => {
        var _a;
        return ((_a = item._id) === null || _a === void 0 ? void 0 : _a.toString()) === todoId;
    });
    if (!todoItem) {
        return res.status(404).json({ error: 'Todo not found' });
    }
    res.status(200).json(todoItem);
}
exports.getCommentById = getCommentById;
async function createComment(req, res) {
    const weddingId = req.params.id;
    const checklistId = req.params.checklistId;
    const taskId = req.params.taskId;
    const { _id, parentId, text, author, authorId, createdAt, updatedAt, } = req.body;
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
    const newComment = {
        author: author,
        text: text,
        createdAt: createdAt,
        authorId: authorId,
    };
    taskItem.comments.push(newComment);
    await wedding.save();
    res.status(200).json(wedding);
}
exports.createComment = createComment;
async function updateComment(req, res) {
    const weddingId = req.params.id;
    const checklistId = req.params.checklistId;
    const taskId = req.params.taskId;
    const todoId = req.params.todoId;
    const { _id, parentId, text, author, authorId, createdAt, updatedAt, } = req.body;
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
    const commentsItem = taskItem.comments.find((item) => { var _a; return ((_a = item._id) === null || _a === void 0 ? void 0 : _a.toString()) === todoId; });
    if (!commentsItem) {
        return res.status(404).json({ error: 'Todo not found' });
    }
    if (text)
        commentsItem.text = text;
    if (parentId)
        commentsItem.parentId = parentId;
    if (author)
        commentsItem.author = author;
    if (authorId)
        commentsItem.authorId = authorId;
    if (createdAt)
        commentsItem.createdAt = createdAt;
    if (updatedAt)
        commentsItem.updatedAt = updatedAt;
    await wedding.save();
    res.status(200).json(wedding);
}
exports.updateComment = updateComment;
async function deleteComment(req, res) {
    const weddingId = req.params.id;
    const checklistId = req.params.checklistId;
    const taskId = req.params.taskId;
    const commentId = req.params.commentId;
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
    const todoItem = taskItem.comments.find((item) => { var _a; return ((_a = item._id) === null || _a === void 0 ? void 0 : _a.toString()) === commentId; });
    if (!todoItem) {
        return res.status(404).json({ error: 'Todo not found' });
    }
    taskItem.comments = taskItem.comments.filter((item) => { var _a; return ((_a = item._id) === null || _a === void 0 ? void 0 : _a.toString()) !== commentId; });
    await wedding.save();
    res.status(200).json(wedding);
}
exports.deleteComment = deleteComment;
