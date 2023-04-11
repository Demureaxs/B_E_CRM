"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const weddingSchema = new mongoose_1.default.Schema({
    agent: String,
    name: String,
    email: String,
    date: Date,
    venue: String,
    decoration: String,
    photographer: String,
    videographer: String,
    vendorProgress: String,
    payments: [
        {
            date: Date,
            amount: Number,
        },
    ],
    todos: [
        {
            task: String,
            deadline: Date,
            done: Boolean,
            default: false,
        },
    ],
}, { collection: 'weddings' });
const Wedding = mongoose_1.default.model('Wedding', weddingSchema);
exports.default = Wedding;
