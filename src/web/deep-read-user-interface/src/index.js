import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createMuiTheme , ThemeProvider} from '@material-ui/core/styles';
import deepOrange from '@material-ui/core/colors/deepOrange';
import indigo from '@material-ui/core/colors/indigo';


const theme_1 = createMuiTheme({
  palette: {
    primary: {
      main: deepOrange[700]
    }
  },
});


ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme_1}>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
