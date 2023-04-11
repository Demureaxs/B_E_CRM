"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteWedding = exports.updateWedding = exports.createWedding = exports.getWedding = exports.getWeddings = void 0;
const weddingsModel_1 = __importDefault(require("../models/weddingsModel"));
async function getWeddings(req, res) {
    const weddings = await weddingsModel_1.default.find({});
    res.status(200).json(weddings);
}
exports.getWeddings = getWeddings;
async function getWedding(req, res, next) {
    const id = req.params.id;
    const wedding = await weddingsModel_1.default.findById(id);
    res.status(200).json(wedding);
}
exports.getWedding = getWedding;
async function createWedding(req, res, next) {
    const { agent, name, email, date, venue, guests, foodAndBeverage, decoration, production, photographer, videographer, vendorProgress, checklist, payments, } = req.body;
    const newWedding = new weddingsModel_1.default({
        agent,
        name,
        email,
        date,
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
    });
    await newWedding.save();
    res.json(newWedding);
}
exports.createWedding = createWedding;
async function updateWedding(req, res, next) {
    const id = req.params.id;
    const { agent, name, email, date, venue, guests, foodAndBeverage, decoration, production, photographer, videographer, vendorProgress, checklist, payments, } = req.body;
    const wedding = await weddingsModel_1.default.findByIdAndUpdate(id);
    if (!wedding) {
        return res.status(400).json({ error: 'Wedding not found' });
    }
    if (agent)
        wedding.agent = agent;
    if (name)
        wedding.name = name;
    if (email)
        wedding.email = email;
    if (date)
        wedding.date = date;
    if (venue)
        wedding.venue = venue;
    if (guests)
        wedding.guests = guests;
    if (foodAndBeverage)
        wedding.foodAndBeverage = foodAndBeverage;
    if (decoration)
        wedding.decoration = decoration;
    if (production)
        wedding.production = production;
    if (photographer)
        wedding.photographer = photographer;
    if (videographer)
        wedding.videographer = videographer;
    if (vendorProgress)
        wedding.vendorProgress = vendorProgress;
    if (checklist)
        wedding.checklist = checklist;
    if (payments)
        wedding.payments = payments;
    await wedding.save();
    res.status(200).json(wedding);
}
exports.updateWedding = updateWedding;
async function deleteWedding(req, res) {
    const id = req.params.id;
    const wedding = await weddingsModel_1.default.findByIdAndDelete(id);
    if (!wedding) {
        return res.status(400).json({ error: 'Wedding not found' });
    }
    res.status(200).json({ message: 'Successfully Deleted' });
}
exports.deleteWedding = deleteWedding;
