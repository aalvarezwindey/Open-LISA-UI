import { BrowserRouter } from 'react-router-dom';
import MainRouter from './routing/MainRouter';
import ThemeProvider from './theme/Provider';

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <MainRouter />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
