import { Request, Response, NextFunction } from 'express';
import Wedding from '../models/weddingsModel';
import { IComments } from '../models/weddingsModel';

export async function getComments(req: Request, res: Response) {
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
}

export async function getCommentById(req: Request, res: Response) {
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
}

export async function createComment(req: Request, res: Response) {
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
}

export async function updateComment(req: Request, res: Response) {
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
}

export async function deleteComment(req: Request, res: Response) {
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
}
