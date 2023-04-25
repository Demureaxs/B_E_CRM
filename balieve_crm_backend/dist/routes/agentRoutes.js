"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const weddingsModel_1 = __importDefault(require("../models/weddingsModel"));
const userModel_1 = __importDefault(require("../models/userModel"));
const router = express_1.default.Router();
router.get('/', async (req, res) => {
    try {
        const users = await userModel_1.default.find({
            role: {
                $in: ['agent', 'admin'],
            },
        });
        res.status(200).json(users);
    }
    catch (err) {
        console.log(err);
    }
});
router.get('/:agentId/tasks', async (req, res) => {
    try {
        const agentId = req.params.agentId;
        // Retrieve the user object based on the agentId
        const user = await userModel_1.default.findById(agentId).lean();
        const role = user === null || user === void 0 ? void 0 : user.role;
        let tasks = [];
        if (role === 'admin') {
            // Retrieve tasks for all agents
            const weddings = await weddingsModel_1.default.find({}).lean();
            weddings.forEach((wedding) => {
                wedding.checklist.forEach((checklist) => {
                    checklist.tasks.forEach((task) => {
                        if (task.agentId && !task.completed) {
                            tasks.push({
                                _id: task._id,
                                createdAt: task.createdAt,
                                completedAt: task.completedAt,
                                task: task.task,
                                completed: task.completed,
                                comments: task.comments,
                                agent: task.agent,
                                agentId: task.agentId,
                                deadline: task.deadline,
                                weddingId: wedding._id,
                                checklistId: checklist._id,
                                weddingName: wedding.name,
                                weddingDate: wedding.date,
                            });
                        }
                    });
                });
            });
        }
        else if (role === 'agent') {
            // Retrieve tasks only for the specified agent
            const weddings = await weddingsModel_1.default.find({
                'checklist.tasks.agentId': agentId,
            }).lean();
            weddings.forEach((wedding) => {
                wedding.checklist.forEach((checklist) => {
                    checklist.tasks.forEach((task) => {
                        var _a;
                        if (((_a = task.agentId) === null || _a === void 0 ? void 0 : _a.toString()) === agentId && !task.completed) {
                            tasks.push({
                                _id: task._id,
                                createdAt: task.createdAt,
                                completedAt: task.completedAt,
                                task: task.task,
                                completed: task.completed,
                                comments: task.comments,
                                agent: task.agent,
                                agentId: task.agentId,
                                deadline: task.deadline,
                                weddingId: wedding._id,
                                checklistId: checklist._id,
                                weddingName: wedding.name,
                                weddingDate: wedding.date,
                            });
                        }
                    });
                });
            });
        }
        else {
            // User not found or invalid role
            res.status(400).send('Sorry you are not authorized to access this');
            return;
        }
        res.json(tasks);
    }
    catch (err) {
        console.log(err);
    }
});
exports.default = router;
