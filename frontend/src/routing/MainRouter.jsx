import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import NavBar from '../components/NavBar/NavBar';
import { useServerConnectionStatusUpdate } from '../hooks/useServerConnectionStatusUpdate';
import InstrumentDetailPage from '../pages/InstrumentDetailPage/InstrumentDetailPage';
import InstrumentsPage from '../pages/InstrumentsPage/InstrumentsPage';
import SettingsPage from '../pages/SettingsPage/SettingsPage';
import { ROUTES } from './routes';

export default function MainRouter() {
  useServerConnectionStatusUpdate();
  return (
    <>
      <NavBar />
      <Routes>
        <Route path={ROUTES.INSTRUMENTS} element={<InstrumentsPage />}></Route>
        <Route path={ROUTES.INTRUMENT_DETAIL} element={<InstrumentDetailPage />}></Route>
        <Route path={ROUTES.SETTINGS} element={<SettingsPage />}></Route>
        <Route path="*" element={<Navigate to={ROUTES.INSTRUMENTS} replace />} />
      </Routes>
    </>
  );
}
