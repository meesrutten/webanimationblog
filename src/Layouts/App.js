import React from 'react';
import { AnimatePresence } from 'framer-motion';
import { ThemeProvider } from '../components/ThemeContext';
import GlobalStyles from '../components/GlobalStyles';

function App({ children }) {
  return (
    <ThemeProvider>
      <GlobalStyles />
      <AnimatePresence exitBeforeEnter>{children}</AnimatePresence>
    </ThemeProvider>
  );
}

export default App;
