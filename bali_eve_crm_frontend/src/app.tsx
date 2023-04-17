import { WeddingsProvider } from './context/WeddingsContext';
import { useState } from 'preact/hooks';
import { Suspense, lazy } from 'preact/compat';

import InlineNav from './common/InlineNav/InlineNav';
import SideNav from './common/Sidenav/SideNav';
import Footer from './common/Footer/Footer';

import AddWedding from './scenes/Add Wedding/AddWedding';
import Overview from './scenes/Overview/Overview';
import WeddingModal from './scenes/WeddingModal/WeddingModal';
import PaymentTimeline from './scenes/PaymentTimeline/PaymentTimeline';
import Tasks from './scenes/Tasks/Tasks';
import WeddingsDashboard from './scenes/WeddingsDashboard/WeddingsDashboard';
import EditWedding from './scenes/Edit Wedding/EditWedding';

export function App() {
  const [navTarget, setNavTarget] = useState('Overview');

  return (
    <WeddingsProvider>
      <main className='h-screen flex flex-col'>
        <div className='flex-1 flex overflow-hidden'>
          {/* Sidenav */}

          <SideNav setNavTarget={setNavTarget} />

          {/* Main app window */}
          <div className='flex-1 flex flex-col'>
            <Suspense fallback={<div>Loading...</div>}>
              <InlineNav name={navTarget} imageLink='/img/BaliEveLogo.webp' />
              <div className='h-full p-6 bg-base-200 overflow-hidden overflow-y-scroll scrollbar-none'>
                {navTarget === 'Overview' && <Overview />}
                {navTarget === 'Weddings' && <WeddingsDashboard />}
                {navTarget === 'Tasks' && <Tasks />}
                {navTarget === 'Payments' && <PaymentTimeline />}
                {navTarget === 'Add_Wedding' && <AddWedding />}
                {navTarget === 'Edit_Wedding' && <EditWedding />}
              </div>
            </Suspense>
          </div>
        </div>

        {/* Footer */}
        <Footer />
      </main>
    </WeddingsProvider>
  );
}
