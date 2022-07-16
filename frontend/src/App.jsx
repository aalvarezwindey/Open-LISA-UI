import { BrowserRouter } from 'react-router-dom';
import MainRouter from './routing/MainRouter';
import { AppProvider } from './state/provider';
import ThemeProvider from './theme/Provider';

function App() {
  return (
    <AppProvider>
      <ThemeProvider>
        <BrowserRouter>
          <MainRouter />
        </BrowserRouter>
      </ThemeProvider>
    </AppProvider>
  );
}

export default App;
