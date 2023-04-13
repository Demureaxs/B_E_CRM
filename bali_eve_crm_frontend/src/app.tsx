import { WeddingsProvider } from './context/WeddingsContext';
import { useEffect, useState } from 'preact/hooks';
import { Suspense, lazy } from 'preact/compat';

export function App() {
  return (
    <WeddingsProvider>
      <main className='flex relative bg-base-100 h-screen'>
        <div>
          <h1 className='text-5xl font-semibold'>
            Right are you ready son, we are going to smash this!
          </h1>
        </div>
      </main>
    </WeddingsProvider>
  );
}
