import { SpeedInsights } from '@vercel/speed-insights/react';
import { AppProviders } from './providers';
import './styles/global.css';

export const App = () => {
  return (
    <>
      <AppProviders />
      <SpeedInsights />
    </>
  );
};
