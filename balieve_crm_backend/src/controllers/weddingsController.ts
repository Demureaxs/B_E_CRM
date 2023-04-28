import { Request, Response, NextFunction } from 'express';
import { IWedding } from '../models/weddingsModel';
import Wedding from '../models/weddingsModel';
import User from '../models/userModel';

export async function getWeddings(req: Request, res: Response) {
  const agentId = req.query.agentId;
  const user = await User.findById(agentId);

  if (user?.role === 'admin') {
    const weddings = await Wedding.find({});
    res.status(200).json(weddings);
  } else if (user?.role === 'agent') {
    const weddings = await Wedding.find({
      agentId,
    });
    res.status(200).json(weddings);
  } else {
    res.status(400).send('Sorry you are not authorized to access this');
  }
}

export async function getWedding(req: Request, res: Response) {
  const id = req.params.id;

  const wedding = await Wedding.findById(id);
  res.status(200).json(wedding);
}

export async function createWedding(req: Request, res: Response) {
  const {
    agent,
    agentId,
    name,
    email,
    date,
    budget,
    venue,
    guests,
    foodAndBeverage,
    decoration,
    production,
    photographer,
    videographer,
    vendorProgress,
    checklist,
    payments,
  }: Partial<IWedding> = req.body;

  const newWedding = new Wedding({
    agent,
    agentId,
    name,
    email,
    date,
    budget,
    venue,
    guests,
    foodAndBeverage,
    decoration,
    production,
    photographer,
    videographer,
    vendorProgress,
    checklist,
    payments,
    createdAt: new Date(),
  });

  await newWedding.save();
  res.json(newWedding);
}

export async function updateWedding(req: Request, res: Response) {
  const id = req.params.id;
  const {
    agent,
    agentId,
    name,
    email,
    date,
    budget,
    venue,
    guests,
    foodAndBeverage,
    decoration,
    production,
    photographer,
    videographer,
    vendorProgress,
    checklist,
    payments,
  }: Partial<IWedding> = req.body;

  const wedding = await Wedding.findByIdAndUpdate(id);
  if (!wedding) {
    return res.status(400).json({ error: 'Wedding not found' });
  }

  if (agent) wedding.agent = agent;
  if (agentId) wedding.agentId = agentId;
  if (name) wedding.name = name;
  if (email) wedding.email = email;
  if (date) wedding.date = date;
  if (budget) wedding.budget = budget;
  if (venue) wedding.venue = venue;
  if (guests) wedding.guests = guests;
  if (foodAndBeverage) wedding.foodAndBeverage = foodAndBeverage;
  if (decoration) wedding.decoration = decoration;
  if (production) wedding.production = production;
  if (photographer) wedding.photographer = photographer;
  if (videographer) wedding.videographer = videographer;
  if (vendorProgress) wedding.vendorProgress = vendorProgress;
  if (checklist) wedding.checklist = checklist;
  if (payments) wedding.payments = payments;

  await wedding.save();
  res.status(200).json(wedding);
}

export async function deleteWedding(req: Request, res: Response) {
  const id = req.params.id;

  const wedding = await Wedding.findByIdAndDelete(id);

  if (!wedding) {
    return res.status(400).json({ error: 'Wedding not found' });
  }

  res.status(200).json({ message: 'Successfully Deleted' });
}
