import { WeddingsProvider } from './context/WeddingsContext';
import { useEffect, useState } from 'preact/hooks';
import { Suspense, lazy } from 'preact/compat';

import SideNav from './common/Sidenav/SideNav';
import Footer from './common/Footer/Footer';

import AddWedding from './scenes/Add Wedding/AddWedding';
import Overview from './scenes/Overview/Overview';
import WeddingModal from './scenes/WeddingModal/WeddingModal';
import PaymentTimeline from './scenes/PaymentTimeline/PaymentTimeline';
import Tasks from './scenes/Tasks/Tasks';
import Weddings from './scenes/Weddings/Weddings';

export function App() {
  return (
    <WeddingsProvider>
      <main className='flex relative bg-base-100 h-screen'>
        <SideNav />
      </main>
    </WeddingsProvider>
  );
}
