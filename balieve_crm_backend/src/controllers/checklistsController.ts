import { Request, Response, NextFunction } from 'express';
import Wedding from '../models/weddingsModel';
import { IChecklistField } from '../models/weddingsModel';

export async function getAllChecklists(req: Request, res: Response) {
  const wedding = await Wedding.findById(req.params.id);

  if (!wedding) {
    return res.status(404).json({ error: 'Wedding not found' });
  }

  const checklist = wedding.checklist;

  res.status(200).json(checklist);
}

export async function createChecklist(req: Request, res: Response) {
  const weddingId = req.params.id;

  const { type, vendor, tasks }: Partial<IChecklistField> = req.body;
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
}

export async function getChecklistById(req: Request, res: Response) {
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
}

export async function updateChecklist(req: Request, res: Response) {
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
}

export async function deleteChecklist(req: Request, res: Response) {
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
}
