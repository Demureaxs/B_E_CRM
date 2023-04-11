import { createContext } from 'preact';
import { useEffect, useState } from 'preact/hooks';

export interface IWedding {
  _id: string;
  agent: string;
  name: string;
  email: string;
  date: string;
  venue: string;
  guests: string;
  foodAndBeverage: string;
  decoration: string;
  production: string;
  photographer: string;
  videographer: string;
  vendorProgress: string;
  checklist: {
    type: string;
    vendor: string;
    tasks: {
      task: string;
      completed: boolean;
      vendor?: string; // optional vendor property for some checklist items
    }[];
  }[];
  payments: {
    date: string;
    amount: number;
  }[];
  todos: {
    task: string;
    dateAdded: string;
    deadline: string;
    done: boolean;
    default: boolean;
  }[];
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
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function fetchUser() {
      const response = await fetch('http://localhost:8000/api/v1/current_user');
      const data = await response.json();
      setUser(data);
    }
    fetchUser();
  }, []);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('/data/mockData.json');
      const data = await response.json();
      setAllWeddings(data);
    }
    fetchData();
  }, []);

  async function refetchData() {
    const response = await fetch('/data/mockData.json');
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
    refetchData,
  };

  return (
    <WeddingContext.Provider value={contextValue}>
      {props.children}
    </WeddingContext.Provider>
  );
}
