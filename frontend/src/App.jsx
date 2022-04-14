import InstrumentCard from './components/InstrumentCard/InstrumentCard';
import ThemeProvider from './theme/Provider';

function App() {
  return (
    <ThemeProvider>
      <InstrumentCard brand="Tektronix" model="1002B" image="/images/tektronix_1002b.webp" />
      <InstrumentCard brand="Pixelfly" model="PCO QE 120778a" image="/images/pixelfly.jpeg" />
    </ThemeProvider>
  );
}

export default App;
