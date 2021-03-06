import React from 'react';
import './App.css';
import BaseComponent from './components/base-component/baseComponent';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import {Theme} from './utils/baseStyles';
import Spinner from "./components/loader/spinner";

const App: React.FC = () => {
  const theme = createMuiTheme({
    typography: {
      fontFamily: "Nunito Sans, Roboto, sans-serif",
    }
  });
  return (
    <div className="App">
      <Spinner />
      <ThemeProvider theme={Theme}>
      <BaseComponent/> 
      </ThemeProvider>
    </div>
  );
}

export default App;
