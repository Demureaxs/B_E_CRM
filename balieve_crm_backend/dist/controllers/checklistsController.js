"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteChecklist = exports.updateChecklist = exports.getChecklistById = exports.createChecklist = exports.getAllChecklists = void 0;
const weddingsModel_1 = __importDefault(require("../models/weddingsModel"));
async function getAllChecklists(req, res) {
    const wedding = await weddingsModel_1.default.findById(req.params.id);
    if (!wedding) {
        return res.status(404).json({ error: 'Wedding not found' });
    }
    const checklist = wedding.checklist;
    res.status(200).json(checklist);
}
exports.getAllChecklists = getAllChecklists;
async function createChecklist(req, res) {
    const weddingId = req.params.id;
    const { type, vendor, tasks } = req.body;
    const wedding = await weddingsModel_1.default.findById(weddingId);
    if (!wedding) {
        return res.status(404).json({ error: 'Wedding not found' });
    }
    wedding.checklist.push({
        type: type,
        vendor: vendor,
        tasks: tasks,
    });
    await wedding.save();
    res.status(200).json(wedding);
}
exports.createChecklist = createChecklist;
async function getChecklistById(req, res) {
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
}
exports.getChecklistById = getChecklistById;
async function updateChecklist(req, res) {
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
}
exports.updateChecklist = updateChecklist;
async function deleteChecklist(req, res) {
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
}
exports.deleteChecklist = deleteChecklist;
