import { WeddingsProvider } from './utilities/weddingsContext';
import { useEffect, useState } from 'preact/hooks';
import { Suspense, lazy } from 'preact/compat';

import Header from './components/Header';
const Overview = lazy(() => import('./components/Overview'));
const WeddingsDashboard = lazy(() => import('./components/WeddingsDashboard'));

export function App() {
  const [navTarget, setNavTarget] = useState('Overview');

  function handleNavClick(event: any): void {
    setNavTarget(event.target.id);
  }

  useEffect(() => {
    console.log(navTarget);
  }, [navTarget]);

  return (
    <WeddingsProvider>
      <main className="flex max-w-screen-2xl mx-auto relative">
        <Header handleNavClick={handleNavClick} />
        <section className=" flex-1 h-screen p-4 text-gray-700 overflow-y-scroll">
          <Suspense fallback={<div>Loading...</div>}>
            {navTarget === 'Overview' && <Overview navTarget={navTarget} />}
            {navTarget === 'Weddings' && (
              <WeddingsDashboard navTarget={navTarget} />
            )}
          </Suspense>
        </section>
      </main>
    </WeddingsProvider>
  );
}
