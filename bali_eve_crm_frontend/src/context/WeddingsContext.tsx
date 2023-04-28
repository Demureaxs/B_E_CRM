import { createContext } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import API_URL from '../env';

export interface IComments {
  _id?: string;
  parentId?: string;
  text: string;
  authorId: string;
  author?: String;
  createdAt: Date;
  updatedAt: Date;
}

export interface ITaskItem {
  _id?: string;
  createdAt: Date;
  completedAt: Date | null;
  task: string;
  completed: boolean;
  agent?: string;
  agentId?: string;
  deadline?: Date | null;
  comments: IComments[];
}

export interface IChecklistField {
  _id?: string;
  type: string;
  vendor: string;
  tasks: ITaskItem[];
}

interface IPayment {
  _id?: string;
  date: Date;
  createdAt: Date;
  amount: number;
  for: string;
  description?: string;
  paymentMethod: string;
}

export interface IWedding extends Document {
  _id: string;
  createdAt: Date;
  agent: string;
  agentId: string;
  name: string;
  email: string;
  budget: number;
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

export interface IUser {
  _id: string;
  role: string;
  googleId: number;
  displayName: string;
  email: string;
  photo: string;
}

export interface IAgentTask {
  _id: string;
  createdAt: Date;
  completedAt: Date | null;
  task: string;
  completed: boolean;
  comments: IComments[];
  agent: string;
  agentId: string;
  deadline: Date;
  weddingId: string;
  weddingName: string;
  weddingDate: Date;
  checklistId: string;
}

interface WeddingsContextValue {
  allWeddings: IWedding[];
  setAllWeddings: (weddings: IWedding[]) => void;
  wedding: IWedding | null;
  setWedding: (wedding: IWedding) => void;
  showModal: boolean;
  setShowModal: (showModal: boolean) => void;
  user: IUser | null;
  agents: IUser[];
  refetchData: () => void;
  tasks: IAgentTask[];
  fetchTasks: () => void;
}

export const WeddingContext = createContext<WeddingsContextValue>({
  allWeddings: [],
  setAllWeddings: () => {},
  wedding: null,
  setWedding: () => {},
  showModal: false,
  setShowModal: () => {},
  user: null,
  agents: [],
  refetchData: () => {},
  tasks: [],
  fetchTasks: () => {},
});

export function WeddingsProvider(props: any) {
  const [allWeddings, setAllWeddings] = useState<IWedding[]>([]);
  const [wedding, setWedding] = useState<IWedding | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [user, setUser] = useState<IUser | null>(null);
  const [agents, setAgents] = useState<IUser[]>([]);
  const [tasks, setTasks] = useState<IAgentTask[]>([]);

  async function getCurrentUser() {
    const response = await fetch(`${API_URL}/api/v1/current_user`);
    // const response = await fetch(`${API_URL}/api/v1/agents`);
    const data = await response.json();
    setUser(data);
    // setUser(data[5]);
  }

  useEffect(() => {
    getCurrentUser();
  }, []);

  useEffect(() => {
    if (user) {
      fetchWeddings();
    }
  }, [user]);

  async function fetchWeddings() {
    if (user) {
      const response = await fetch(
        `${API_URL}/api/v1/weddings?agentId=${user._id}`
      );
      const data = await response.json();
      setAllWeddings(data);
    }
  }

  async function fetchTasks() {
    if (user) {
      const response = await fetch(
        `${API_URL}/api/v1/agents/${user._id}/tasks`
      );
      const tasks = await response.json();
      setTasks(tasks);
    }
  }

  useEffect(() => {
    fetchTasks();
  }, [user]);

  async function fetchAgents() {
    const response = await fetch(`${API_URL}/api/v1/agents`);
    const data = await response.json();
    setAgents(data);
  }

  useEffect(() => {
    fetchAgents();
  }, []);

  const contextValue: WeddingsContextValue = {
    allWeddings,
    setAllWeddings,
    wedding,
    setWedding,
    showModal,
    setShowModal,
    user,
    agents,
    tasks,
    fetchTasks,
    refetchData: fetchWeddings,
  };

  return (
    <WeddingContext.Provider value={contextValue}>
      {props.children}
    </WeddingContext.Provider>
  );
}
