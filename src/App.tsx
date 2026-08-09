import { useState } from 'react';
import './styles/globals.scss';
import Page from './components/Page';
import LoadingScreen from './components/ui/LoadingScreen';

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
      <Page />
    </>
  );
}
