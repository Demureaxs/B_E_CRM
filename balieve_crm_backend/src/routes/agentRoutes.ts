import express, { Router } from 'express';
import Wedding, {
  IWedding,
  IChecklistField,
  ITaskItem,
  IComments,
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

export interface IAgentTask {
  _id: Types.ObjectId;
  createdAt: Date;
  completedAt: Date | null;
  task: string;
  completed: boolean;
  comments: IComments[];
  agent: string;
  agentId: string;
  deadline: Date;
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

    // Retrieve the user object based on the agentId
    const user = await User.findById(agentId).lean();
    const role = user?.role;

    let tasks: IAgentTask[] = [];

    if (role === 'admin') {
      // Retrieve tasks for all agents
      const weddings = await Wedding.find({}).lean();

      weddings.forEach((wedding) => {
        wedding.checklist.forEach((checklist) => {
          checklist.tasks.forEach((task) => {
            if (task.agentId && !task.completed) {
              tasks.push({
                _id: task._id as Types.ObjectId,
                createdAt: task.createdAt,
                completedAt: task.completedAt,
                task: task.task,
                completed: task.completed,
                comments: task.comments,
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
    } else if (role === 'agent') {
      // Retrieve tasks only for the specified agent
      const weddings = await Wedding.find({
        'checklist.tasks.agentId': agentId,
      }).lean();

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
                comments: task.comments,
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
    } else {
      // User not found or invalid role
      res.status(400).send('Sorry you are not authorized to access this');
      return;
    }

    res.json(tasks);
  } catch (err) {
    console.log(err);
  }
});

export default router;
