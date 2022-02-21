import React from 'react';
import Route from './source/routes/systemroutes';
import { ThemeProvider} from './source/theme/themeProvider';

export default function App() {


  return (
     <ThemeProvider>
       <Route />
     </ThemeProvider>
  );
}