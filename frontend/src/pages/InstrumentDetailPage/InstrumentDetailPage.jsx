import React from 'react';
import { useParams } from 'react-router-dom';
import PageBody from '../../components/Layout/PageBody/PageBody';
import useInstrumentDetail from '../../hooks/useInstrumentDetail';
import InstrumentDetail from './components/InstrumentDetail';

export default function InstrumentDetailPage() {
  const { instrumentId } = useParams();
  const { data: instrument } = useInstrumentDetail(instrumentId);
  return (
    <PageBody>
      <InstrumentDetail {...instrument} />
    </PageBody>
  );
}
