import React from 'react';

const ThemeContext = React.createContext({
  theme: 'light',
  setTheme: (theme: string) => {},
});

export default ThemeContext;
