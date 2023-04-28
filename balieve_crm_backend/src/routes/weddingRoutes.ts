import express, { Router } from 'express';
import { catchAsync } from '../utilities/catchAsync';

import {
  createWedding,
  deleteWedding,
  getWedding,
  getWeddings,
  updateWedding,
} from '../controllers/weddingsController';

import {
  createChecklist,
  getAllChecklists,
  getChecklistById,
  updateChecklist,
  deleteChecklist,
} from '../controllers/checklistsController';

import {
  getAllTasks,
  createNewTask,
  getTaskById,
  updateTask,
  deleteTask,
} from '../controllers/tasksController';

import {
  getComments,
  getCommentById,
  createComment,
  updateComment,
  deleteComment,
} from '../controllers/commentsController';

const router: Router = express.Router();

router.get('/', catchAsync(getWeddings));
router.post('/', catchAsync(createWedding));
router.get('/:id', catchAsync(getWedding));
router.put('/:id', catchAsync(updateWedding));
router.delete('/:id', catchAsync(deleteWedding));

router.get('/:id/checklist', catchAsync(getAllChecklists));
router.post('/:id/checklist/', catchAsync(createChecklist));
router.get('/:id/checklist/:checklistId', catchAsync(getChecklistById));
router.put('/:id/checklist/:checklistId', catchAsync(updateChecklist));
router.delete('/:id/checklist/:checklistId', catchAsync(deleteChecklist));

router.get('/:id/checklist/:checklistId/tasks', catchAsync(getAllTasks));
router.post('/:id/checklist/:checklistId/tasks', catchAsync(createNewTask));
router.get(
  '/:id/checklist/:checklistId/tasks/:taskId',
  catchAsync(getTaskById)
);
router.put('/:id/checklist/:checklistId/tasks/:taskId', catchAsync(updateTask));
router.delete(
  '/:id/checklist/:checklistId/tasks/:taskId',
  catchAsync(deleteTask)
);

router.get(
  '/:id/checklist/:checklistId/tasks/:taskId/comments',
  catchAsync(getComments)
);
router.get(
  '/:id/checklist/:checklistId/tasks/:taskId/comments/:commentId',
  catchAsync(getCommentById)
);
router.post(
  '/:id/checklist/:checklistId/tasks/:taskId/comments',
  catchAsync(createComment)
);
router.put(
  '/:id/checklist/:checklistId/tasks/:taskId/comments/:commentId',
  catchAsync(updateComment)
);
router.delete(
  '/:id/checklist/:checklistId/tasks/:taskId/comments/:commentId',
  catchAsync(deleteComment)
);

export default router;
