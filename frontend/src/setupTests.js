// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import ThemeProvider from './theme/Provider';

const AllTheProviders = ({ children }) => {
  return (
    <ThemeProvider>
      <BrowserRouter>{children}</BrowserRouter>
    </ThemeProvider>
  );
};

const renderProviders = (Wrapper, children, allTheProvidersProps) => {
  if (!Wrapper) {
    return <AllTheProviders {...allTheProvidersProps}>{children}</AllTheProviders>;
  }
  return (
    <AllTheProviders {...allTheProvidersProps}>
      <Wrapper>{children}</Wrapper>
    </AllTheProviders>
  );
};

global.renderApp = (ui, options = {}) => {
  const { wrapper, ...rest } = options;
  return render(ui, {
    wrapper: ({ children }) => renderProviders(wrapper, children, { ...rest }),
    ...rest,
  });
};
