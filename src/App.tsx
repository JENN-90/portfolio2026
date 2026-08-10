import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import './styles/globals.scss';
import Page from './components/Page';
import WorkDetailPage from './components/sections/WorkDetailPage';
import LoadingScreen from './components/ui/LoadingScreen';
import PageTransition from './components/ui/PageTransition';

const VISITED_KEY = 'portfolio:visited';

export default function App() {
  const [loading, setLoading] = useState(() => !sessionStorage.getItem(VISITED_KEY));

  const handleLoadingComplete = () => {
    sessionStorage.setItem(VISITED_KEY, '1');
    setLoading(false);
  };

  return (
    <>
      {loading && <LoadingScreen onComplete={handleLoadingComplete} />}
      <PageTransition />
      <Routes>
        <Route path="/" element={<Page />} />
        <Route path="/work/:slug" element={<WorkDetailPage />} />
      </Routes>
    </>
  );
}
