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

import {
  createWedding,
  deleteWedding,
  getWedding,
  getWeddings,
  updateWedding,
} from '../controllers/weddingsController';

const router: Router = express.Router();

router.get('/', catchAsync(getWeddings));
router.post('/', catchAsync(createWedding));
router.get('/:id', catchAsync(getWedding));
router.put('/:id', catchAsync(updateWedding));
router.delete('/:id', catchAsync(deleteWedding));

router.get(
  '/:id/checklist',

  catchAsync(async (req: Request, res: Response) => {
    const wedding = await Wedding.findById(req.params.id);

    if (!wedding) {
      return res.status(404).json({ error: 'Wedding not found' });
    }

    const checklist = wedding.checklist;

    res.status(200).json(checklist);
  })
);

router.post(
  '/:id/checklist/',

  catchAsync(async (req: Request, res: Response) => {
    const weddingId = req.params.id;

    const { type, vendor, tasks }: Partial<IChecklistField> = req.body;

    /*
    // the mongoose version
    const updateObject: any = { $push: { checklist: {} } };

    if (type) updateObject.$push.checklist.type = type;
    if (vendor) updateObject.$push.checklist.vendor = vendor;
    if (tasks) updateObject.$push.checklist.tasks = tasks;

    const updateWedding = await Wedding.findOneAndUpdate(
      { _id: weddingId },
      updateObject,
      { new: true }
    );

    if (!updateWedding) {
      return res.status(404).json({ error: 'Wedding not found' });
    }

    res.status(200).json(updateWedding);
    */

    const wedding = await Wedding.findById(weddingId);

    if (!wedding) {
      return res.status(404).json({ error: 'Wedding not found' });
    }

    wedding.checklist.push({
      type: type!,
      vendor: vendor!,
      tasks: tasks!,
    });

    await wedding.save();

    res.status(200).json(wedding);
  })
);

router.get(
  '/:id/checklist/:checklistId',

  catchAsync(async (req: Request, res: Response) => {
    const weddingId = req.params.id;
    const checklistId = req.params.checklistId;

    const wedding = await Wedding.findById(weddingId);

    if (!wedding) {
      return res.status(404).json({ error: 'Wedding not found' });
    }

    const checklistItem = wedding.checklist.find(
      (checklist) => checklist._id?.toString() === checklistId
    );

    if (!checklistItem) {
      return res.status(404).json({ error: 'Checklist not found' });
    }

    res.status(200).json(checklistItem);
  })
);

router.put(
  '/:id/checklist/:checklistId',

  catchAsync(async (req: Request, res: Response) => {
    const weddingId = req.params.id;
    const checklistId = req.params.checklistId;

    const wedding = await Wedding.findById(weddingId);

    if (!wedding) {
      return res.status(404).json({ error: 'Wedding not found' });
    }

    const checklistItem = wedding.checklist.find(
      (checklist) => checklist._id?.toString() === checklistId
    );

    if (!checklistItem) {
      return res.status(404).json({ error: 'Checklist not found' });
    }

    const { type, vendor, tasks }: Partial<IChecklistField> = req.body;

    if (type) checklistItem.type = type;
    if (vendor) checklistItem.vendor = vendor;
    if (tasks) checklistItem.tasks = tasks;

    await wedding.save();

    res.status(200).json(wedding);
  })
);

router.delete(
  '/:id/checklist/:checklistId',

  catchAsync(async (req: Request, res: Response) => {
    const weddingId = req.params.id;
    const checklistId = req.params.checklistId;

    const wedding = await Wedding.findByIdAndUpdate(
      weddingId,
      {
        $pull: {
          checklist: {
            _id: checklistId,
          },
        },
      },
      { new: true }
    );

    if (!wedding) {
      return res.status(404).json({ error: 'Wedding not found' });
    }

    await wedding.save();
    res.status(200).json(wedding);
  })
);

router.get(
  '/:id/checklist/:checklistId/tasks',

  catchAsync(async (req: Request, res: Response) => {
    const weddingId = req.params.id;
    const checklistId = req.params.checklistId;

    const wedding = await Wedding.findById(weddingId);

    if (!wedding) {
      return res.status(404).json({ error: 'Wedding not found' });
    }

    const checklistItem = wedding.checklist.find(
      (checklist) => checklist._id?.toString() === checklistId
    );

    if (!checklistItem) {
      return res.status(404).json({ error: 'Checklist not found' });
    }

    const tasks = checklistItem.tasks;

    res.status(200).json(tasks);
  })
);

router.post(
  '/:id/checklist/:checklistId/tasks',

  catchAsync(async (req: Request, res: Response) => {
    const weddingId = req.params.id;
    const checklistId = req.params.checklistId;

    const wedding = await Wedding.findById(weddingId);

    if (!wedding) {
      return res.status(404).json({ error: 'Wedding not found' });
    }

    const checklistItem = wedding.checklist.find(
      (checklist) => checklist._id?.toString() === checklistId
    );

    if (!checklistItem) {
      return res.status(404).json({ error: 'Checklist not found' });
    }

    const { task, completed, comments }: Partial<ITaskItem> = req.body;

    const newTask = {
      task: task!,
      createdAt: new Date(),
      completedAt: null,
      completed: completed!,
      comments: comments!,
    };

    checklistItem.tasks.push(newTask);

    await wedding.save();

    res.status(200).json(wedding);
  })
);

router.get(
  '/:id/checklist/:checklistId/tasks/:taskId',

  catchAsync(async (req: Request, res: Response) => {
    const weddingId = req.params.id;
    const checklistId = req.params.checklistId;
    const taskId = req.params.taskId;

    const wedding = await Wedding.findById(weddingId);

    if (!wedding) {
      return res.status(404).json({ error: 'Wedding not found' });
    }

    const checklistItem = wedding.checklist.find(
      (item) => item._id?.toString() === checklistId
    );

    if (!checklistItem) {
      return res.status(404).json({ error: 'Checklist not found' });
    }

    const task = checklistItem.tasks.find(
      (item) => item._id?.toString() === taskId
    );

    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    res.status(200).json(task);
  })
);

router.put(
  '/:id/checklist/:checklistId/tasks/:taskId',
  catchAsync(async (req: Request, res: Response) => {
    const weddingId = req.params.id;
    const checklistId = req.params.checklistId;
    const taskId = req.params.taskId;

    const {
      agent,
      agentId,
      deadline,
      task,
      completed,
      comments,
      completedAt,
    }: Partial<ITaskItem> = req.body;

    const wedding = await Wedding.findById(weddingId);

    if (!wedding) {
      return res.status(404).json({ error: 'Wedding not found' });
    }

    const checklistItem = wedding.checklist.find(
      (item) => item._id?.toString() === checklistId
    );

    if (!checklistItem) {
      return res.status(404).json({ error: 'Checklist not found' });
    }

    const taskItem = checklistItem.tasks.find(
      (item) => item._id?.toString() === taskId
    );

    if (!taskItem) {
      return res.status(404).json({ error: 'Task not found' });
    }

    if (task) taskItem.task = task;
    if (completed !== undefined) taskItem.completed = completed;
    if (comments) taskItem.comments = comments;
    if (completedAt) taskItem.completedAt = completedAt;
    if (agent) taskItem.agent = agent;
    if (agentId) taskItem.agentId = agentId;
    if (deadline) taskItem.deadline = deadline;

    await wedding.save();

    res.status(200).json(wedding);
  })
);

router.delete(
  '/:id/checklist/:checklistId/tasks/:taskId',

  catchAsync(async (req: Request, res: Response) => {
    const weddingId = req.params.id;
    const checklistId = req.params.checklistId;
    const taskId = req.params.taskId;

    const wedding = await Wedding.findById(weddingId);

    if (!wedding) {
      return res.status(404).json({ error: 'Wedding not found' });
    }

    const checklistItem = wedding.checklist.find(
      (item) => item._id?.toString() === checklistId
    );

    if (!checklistItem) {
      return res.status(404).json({ error: 'Checklist not found' });
    }

    const taskItem = checklistItem.tasks.find(
      (item) => item._id?.toString() === taskId
    );

    if (!taskItem) {
      return res.status(404).json({ error: 'Task not found' });
    }

    checklistItem.tasks = checklistItem.tasks.filter(
      (item) => item._id?.toString() !== taskId
    );

    await wedding.save();

    res.status(200).json(wedding);
  })
);

router.get(
  '/:id/checklist/:checklistId/tasks/:taskId/comments',

  catchAsync(async (req: Request, res: Response) => {
    const weddingId = req.params.id;
    const checklistId = req.params.checklistId;
    const taskId = req.params.taskId;

    const wedding = await Wedding.findById(weddingId);

    if (!wedding) {
      return res.status(404).json({ error: 'Wedding not found' });
    }

    const checklistItem = wedding.checklist.find(
      (item) => item._id?.toString() === checklistId
    );

    if (!checklistItem) {
      return res.status(404).json({ error: 'Checklist not found' });
    }

    const taskItem = checklistItem.tasks.find(
      (item) => item._id?.toString() === taskId
    );

    if (!taskItem) {
      return res.status(404).json({ error: 'Task not found' });
    }

    res.status(200).json(taskItem.comments);
  })
);

router.get(
  '/:id/checklist/:checklistId/tasks/:taskId/comments/:commentId',

  catchAsync(async (req: Request, res: Response) => {
    const weddingId = req.params.id;
    const checklistId = req.params.checklistId;
    const taskId = req.params.taskId;
    const todoId = req.params.todoId;

    const wedding = await Wedding.findById(weddingId);

    if (!wedding) {
      return res.status(404).json({ error: 'Wedding not found' });
    }

    const checklistItem = wedding.checklist.find((item) => {
      return item._id?.toString() === checklistId;
    });

    if (!checklistItem) {
      return res.status(404).json({ error: 'Checklist not found' });
    }

    const taskItem = checklistItem.tasks.find((item) => {
      return item._id?.toString() === taskId;
    });

    if (!taskItem) {
      return res.status(404).json({ error: 'Task not found' });
    }

    const todoItem = taskItem.comments.find((item) => {
      return item._id?.toString() === todoId;
    });

    if (!todoItem) {
      return res.status(404).json({ error: 'Todo not found' });
    }

    res.status(200).json(todoItem);
  })
);

router.post(
  '/:id/checklist/:checklistId/tasks/:taskId/comments',
  catchAsync(async (req: Request, res: Response) => {
    const weddingId = req.params.id;
    const checklistId = req.params.checklistId;
    const taskId = req.params.taskId;

    const {
      _id,
      parentId,
      text,
      author,
      authorId,
      createdAt,
      updatedAt,
    }: Partial<IComments> = req.body;

    const wedding = await Wedding.findById(weddingId);

    if (!wedding) {
      return res.status(404).json({ error: 'Wedding not found' });
    }

    const checklistItem = wedding.checklist.find(
      (item) => item._id?.toString() === checklistId
    );

    if (!checklistItem) {
      return res.status(404).json({ error: 'Checklist not found' });
    }

    const taskItem = checklistItem.tasks.find(
      (item) => item._id?.toString() === taskId
    );

    if (!taskItem) {
      return res.status(404).json({ error: 'Task not found' });
    }

    const newComment: IComments = {
      author: author!,
      text: text!,
      createdAt: createdAt!,
      authorId: authorId,
    };

    taskItem.comments.push(newComment);

    await wedding.save();

    res.status(200).json(wedding);
  })
);

router.put(
  '/:id/checklist/:checklistId/tasks/:taskId/comments/:commentId',

  catchAsync(async (req: Request, res: Response) => {
    const weddingId = req.params.id;
    const checklistId = req.params.checklistId;
    const taskId = req.params.taskId;
    const todoId = req.params.todoId;

    const {
      _id,
      parentId,
      text,
      author,
      authorId,
      createdAt,
      updatedAt,
    }: Partial<IComments> = req.body;

    const wedding = await Wedding.findById(weddingId);

    if (!wedding) {
      return res.status(404).json({ error: 'Wedding not found' });
    }

    const checklistItem = wedding.checklist.find(
      (item) => item._id?.toString() === checklistId
    );

    if (!checklistItem) {
      return res.status(404).json({ error: 'Checklist not found' });
    }

    const taskItem = checklistItem.tasks.find(
      (item) => item._id?.toString() === taskId
    );

    if (!taskItem) {
      return res.status(404).json({ error: 'Task not found' });
    }

    const commentsItem = taskItem.comments.find(
      (item) => item._id?.toString() === todoId
    );

    if (!commentsItem) {
      return res.status(404).json({ error: 'Todo not found' });
    }

    if (text) commentsItem.text = text;
    if (parentId) commentsItem.parentId = parentId;
    if (author) commentsItem.author = author;
    if (authorId) commentsItem.authorId = authorId;
    if (createdAt) commentsItem.createdAt = createdAt;
    if (updatedAt) commentsItem.updatedAt = updatedAt;

    await wedding.save();

    res.status(200).json(wedding);
  })
);
router.delete(
  '/:id/checklist/:checklistId/tasks/:taskId/comments/:commentId',
  catchAsync(async (req: Request, res: Response) => {
    const weddingId = req.params.id;
    const checklistId = req.params.checklistId;
    const taskId = req.params.taskId;
    const commentId = req.params.commentId;

    const wedding = await Wedding.findById(weddingId);

    if (!wedding) {
      return res.status(404).json({ error: 'Wedding not found' });
    }

    const checklistItem = wedding.checklist.find(
      (item) => item._id?.toString() === checklistId
    );

    if (!checklistItem) {
      return res.status(404).json({ error: 'Checklist not found' });
    }

    const taskItem = checklistItem.tasks.find(
      (item) => item._id?.toString() === taskId
    );

    if (!taskItem) {
      return res.status(404).json({ error: 'Task not found' });
    }

    const todoItem = taskItem.comments.find(
      (item) => item._id?.toString() === commentId
    );

    if (!todoItem) {
      return res.status(404).json({ error: 'Todo not found' });
    }

    taskItem.comments = taskItem.comments.filter(
      (item) => item._id?.toString() !== commentId
    );

    await wedding.save();

    res.status(200).json(wedding);
  })
);

export default router;
