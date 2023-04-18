"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const userModel_1 = __importDefault(require("./userModel"));
const todoSchema = new mongoose_1.default.Schema({
    todo: {
        type: String,
        required: [true, 'Please provide a name for the todo.'],
    },
    date: {
        type: Date,
        required: [true, 'Please provide a date for the todo.'],
    },
    deadline: {
        type: Date,
        required: [true, 'Please provide a deadline for the todo.'],
    },
    done: {
        type: Boolean,
        default: false,
    },
});
const TaskSchema = new mongoose_1.default.Schema({
    _id: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        default: () => new mongoose_1.Types.ObjectId(),
    },
    task: {
        type: String,
        required: [true, 'Please provide a name for the task.'],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    completed: {
        type: Boolean,
        default: false,
    },
    completedAt: {
        type: Date,
        default: null,
    },
    agent: {
        type: String,
        ref: userModel_1.default,
        default: '',
    },
    agentId: {
        type: String,
        ref: userModel_1.default,
        default: '',
    },
    deadline: {
        type: Date,
        default: null,
    },
    todos: [todoSchema],
});
const checklistSchema = new mongoose_1.default.Schema({
    type: {
        type: String,
        required: [true, 'Please provide a name for the task.'],
    },
    vendor: {
        type: String,
        required: [true, 'Please provide a vendor for the task.'],
    },
    tasks: [TaskSchema],
});
const paymentSchema = new mongoose_1.default.Schema({
    _id: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        default: () => new mongoose_1.Types.ObjectId(),
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    date: {
        type: Date,
        required: [true, 'A date is required.'],
    },
    amount: {
        type: Number,
        required: [true, 'An amount is required.'],
    },
    for: {
        type: String,
        required: [true, 'A description is required.'],
    },
    description: {
        type: String,
        default: '',
    },
    paymentMethod: {
        type: String,
        required: [true, 'A payment method is required.'],
    },
});
const weddingSchema = new mongoose_1.default.Schema({
    _id: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        default: () => new mongoose_1.Types.ObjectId(),
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    agent: {
        type: String,
        ref: userModel_1.default,
        default: '',
    },
    agentId: {
        type: String,
        ref: userModel_1.default,
        default: '',
    },
    name: {
        type: String,
        required: [true, 'Please provide a name for the wedding.'],
    },
    email: {
        type: String,
        required: [true, 'Please provide an email for the wedding.'],
    },
    budget: {
        type: Number,
        default: 0,
    },
    date: {
        type: Date,
        required: [true, 'Please provide a date for the wedding.'],
    },
    venue: {
        type: String,
        default: '',
    },
    guests: {
        type: Number,
        default: 0,
    },
    foodAndBeverage: {
        type: String,
        default: '',
    },
    decoration: {
        type: String,
        default: '',
    },
    production: {
        type: String,
        default: '',
    },
    photographer: {
        type: String,
        default: '',
    },
    videographer: {
        type: String,
        default: '',
    },
    vendorProgress: {
        type: String,
        default: '',
    },
    checklist: {
        type: [checklistSchema],
        default: [],
    },
    payments: {
        type: [paymentSchema],
        default: [],
    },
}, { collection: 'weddings' });
const Wedding = mongoose_1.default.model('Wedding', weddingSchema);
exports.default = Wedding;
