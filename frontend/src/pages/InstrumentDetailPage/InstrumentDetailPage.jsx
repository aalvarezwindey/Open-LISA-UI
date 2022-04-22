import React from 'react';
import PageBody from '../../components/Layout/PageBody/PageBody';
import InstrumentDetail from './components/InstrumentDetail';

export default function InstrumentDetailPage() {
  return (
    <PageBody>
      <InstrumentDetail
        brand="Tektronix"
        model="TDS1002B"
        image="http://localhost:5000/static/oscilloscope.png"
        physicalAddress="USB0::0x0699::0x0363::C107676::INSTR"
        description="Osciloscopio principal para medir tensión en los individuos de la experiencia"
      />
    </PageBody>
  );
}
