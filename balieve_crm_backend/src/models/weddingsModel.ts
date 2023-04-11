import mongoose, { Document, Model, mongo, Schema, Types } from 'mongoose';

export interface ITodo {
  _id?: Types.ObjectId;
  todo: string;
  date?: Date;
  deadline?: Date;
  done?: boolean;
}

export interface ITaskItem {
  _id?: Types.ObjectId;
  task: string;
  completed: boolean;
  todos: ITodo[];
}

export interface IChecklistField {
  _id?: Types.ObjectId;
  type: string;
  vendor: string;
  tasks: ITaskItem[];
}

interface IPayment {
  date: Date;
  amount: number;
  for: string;
  description?: string;
  paymentMethod: string;
}

export interface IWedding extends Document {
  agent: string;
  name: string;
  email: string;
  date: Date;
  venue: string;
  guests: number;
  foodAndBeverage: string;
  decoration: string;
  production: string;
  photographer: string;
  videographer: string;
  vendorProgress: string;
  checklist: IChecklistField[];
  payments: IPayment[];
}

const todoSchema: Schema = new mongoose.Schema({
  todo: {
    type: String,
    required: [true, "Please provide a name for the todo."],
  },
  date: {
    type: Date,
    required: [true, "Please provide a date for the todo."],
  },
  deadline: {
    type: Date,
    required: [true, "Please provide a deadline for the todo."],
  },
  done: {
    type: Boolean,
    default: false,
  },
})

const TaskSchema: Schema = new mongoose.Schema({
  task: {
    type: String,
    required: [true, "Please provide a name for the task."],
  },
  completed: {
    type: Boolean,
    default: false,
  },
  todos: [todoSchema]
});

const checklistSchema: Schema = new mongoose.Schema({
  type: {
    type: String,
    required: [true, "Please provide a name for the task."],
  },
  vendor: {
    type: String,
    required: [true, "Please provide a vendor for the task."],
  },
  tasks: [TaskSchema]
});

const paymentSchema: Schema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    default: () => new Types.ObjectId(),
  },
  date: {
    type: Date,
    required: [true, "A date is required."],
  },
  amount: {
    type: Number,
    required: [true, "An amount is required."],
  },
  for: {
    type: String,
    required: [true, "A description is required."],
  },
  description: {
    type: String,
    default: '',
  },
  paymentMethod: {
    type: String,
    required: [true, "A payment method is required."],
  },
});

const weddingSchema: Schema = new mongoose.Schema(
  {
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    agent: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      required: [true, "Please provide a name for the wedding."],
    },
    email: {
      type: String,
      required: [true, "Please provide an email for the wedding."],
    },
    date: {
      type: Date,
      required: [true, "Please provide a date for the wedding."],
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
  },
  { collection: 'weddings' }
);

const Wedding = mongoose.model<IWedding>('Wedding', weddingSchema);

export default Wedding;
