import InstrumentList from './components/InstrumentsList/InstrumentsList';
import useInstruments from './hooks/useInstruments';
import ThemeProvider from './theme/Provider';

function App() {
  const { instruments } = useInstruments();

  return (
    <ThemeProvider>
      <InstrumentList instruments={instruments} />
    </ThemeProvider>
  );
}

export default App;
