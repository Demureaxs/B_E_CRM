import { Request, Response, NextFunction } from 'express';
import Wedding from '../models/weddingsModel';
import { ITaskItem } from '../models/weddingsModel';

export async function getAllTasks(req: Request, res: Response) {
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
}

export async function createNewTask(req: Request, res: Response) {
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
}

export async function getTaskById(req: Request, res: Response) {
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
}

export async function updateTask(req: Request, res: Response) {
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
}

export async function deleteTask(req: Request, res: Response) {
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
}
