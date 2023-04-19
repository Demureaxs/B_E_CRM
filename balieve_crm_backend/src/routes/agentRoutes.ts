import express, { Router } from 'express';
import Wedding, {
  IWedding,
  IChecklistField,
  ITaskItem,
  ITodo,
} from '../models/weddingsModel';
import { Types } from 'mongoose';
import { catchAsync } from '../utilities/catchAsync';
import { Request, Response, NextFunction } from 'express';
import User from '../models/userModel';

import {
  createWedding,
  deleteWedding,
  getWedding,
  getWeddings,
  updateWedding,
} from '../controllers/weddingsController';

interface IAgentTask {
  _id: Types.ObjectId;
  createdAt: Date;
  completedAt: Date | null;
  task: string;
  completed: boolean;
  todos: ITodo[];
  agent: string;
  agentId: string;
  deadline?: Date;
  weddingId: Types.ObjectId;
  weddingName: string;
  weddingDate: Date;
  checklistId: Types.ObjectId;
}

const router: Router = express.Router();

router.get('/', async (req, res) => {
  try {
    const users = await User.find({
      role: {
        $in: ['agent', 'admin'],
      },
    });
    res.status(200).json(users);
  } catch (err) {
    console.log(err);
  }
});

router.get('/:agentId/tasks', async (req, res) => {
  try {
    const agentId = req.params.agentId;

    const weddings = await Wedding.find({
      'checklist.tasks.agentId': agentId,
    }).lean();

    const tasks: IAgentTask[] = [];

    weddings.forEach((wedding) => {
      wedding.checklist.forEach((checklist) => {
        checklist.tasks.forEach((task) => {
          if (task.agentId?.toString() === agentId && !task.completed) {
            tasks.push({
              _id: task._id as Types.ObjectId,
              createdAt: task.createdAt,
              completedAt: task.completedAt,
              task: task.task,
              completed: task.completed,
              todos: task.todos,
              agent: task.agent!,
              agentId: task.agentId!,
              deadline: task.deadline!,
              weddingId: wedding._id as Types.ObjectId,
              checklistId: checklist._id as Types.ObjectId,
              weddingName: wedding.name!,
              weddingDate: wedding.date,
            });
          }
        });
      });
    });

    res.json(tasks);
  } catch (err) {
    console.log(err);
  }
});

export default router;
