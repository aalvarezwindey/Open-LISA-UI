import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import NavBar from '../components/NavBar/NavBar';
import InstrumentDetailPage from '../pages/InstrumentDetailPage/InstrumentDetailPage';
import InstrumentsPage from '../pages/InstrumentsPage/InstrumentsPage';
import { ROUTES } from './routes';

export default function MainRouter() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path={ROUTES.INSTRUMENTS} element={<InstrumentsPage />}></Route>
        <Route path={ROUTES.INTRUMENT_DETAIL} element={<InstrumentDetailPage />}></Route>
        <Route path="*" element={<Navigate to={ROUTES.INSTRUMENTS} replace />} />
      </Routes>
    </>
  );
}
