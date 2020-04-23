import React from 'react';
import './App.css';
import BaseComponent from './components/base-component/baseComponent';
import { ThemeProvider } from '@material-ui/core/styles';
import {Theme} from './utils/baseStyles'
const App: React.FC = () => {
  
  return (
    <div className="App">
    
      <ThemeProvider theme={Theme}>
      <BaseComponent/> 
      </ThemeProvider>
    </div>
  );
}

export default App;
