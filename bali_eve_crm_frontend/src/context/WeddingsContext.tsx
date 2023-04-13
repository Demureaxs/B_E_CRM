import { createContext } from 'preact';
import { useEffect, useState } from 'preact/hooks';

export interface ITodo {
  _id?: string;
  todo: string;
  date?: Date;
  deadline?: Date;
  done?: boolean;
}

export interface ITaskItem {
  _id?: string;
  task: string;
  completed: boolean;
  todos: ITodo[];
}

export interface IChecklistField {
  _id?: string;
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
  _id: string;
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

interface IUser {
  googleId: number;
  displayName: string;
  email: string;
  photo: string;
}

interface WeddingsContextValue {
  allWeddings: IWedding[];
  setAllWeddings: (weddings: IWedding[]) => void;
  wedding: IWedding | null;
  setWedding: (wedding: IWedding) => void;
  showModal: boolean;
  setShowModal: (showModal: boolean) => void;
  user: IUser | null;
  refetchData: (url: string) => void;
}

export const WeddingContext = createContext<WeddingsContextValue>({
  allWeddings: [],
  setAllWeddings: () => {},
  wedding: null,
  setWedding: () => {},
  showModal: false,
  setShowModal: () => {},
  user: null,
  refetchData: () => {},
});

export function WeddingsProvider(props: any) {
  const [allWeddings, setAllWeddings] = useState<IWedding[]>([]);
  const [wedding, setWedding] = useState<IWedding | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [user, setUser] = useState<IUser | null>(null);

  // useEffect(() => {
  //   async function fetchUser() {
  //     const res = await fetch('http://192.168.18.7:8000/api/v1/current_user');
  //     const user = await res.json();
  //     setUser(user);
  //   }
  //   fetchUser();
  // }, []);

  useEffect(() => {
    async function fetchWeddings() {
      const response = await fetch('http://192.168.18.7:8000/api/v1/weddings');

      const data = await response.json();
      setAllWeddings(data);
    }
    fetchWeddings();
  }, []);

  async function fetchWeddings() {
    const response = await fetch('http://192.168.18.7:8000/api/v1/weddings');
    const data = await response.json();
    setAllWeddings(data);
  }

  const contextValue: WeddingsContextValue = {
    allWeddings,
    setAllWeddings,
    wedding,
    setWedding,
    showModal,
    setShowModal,
    user,
    refetchData: fetchWeddings,
  };

  return (
    <WeddingContext.Provider value={contextValue}>
      {props.children}
    </WeddingContext.Provider>
  );
}
