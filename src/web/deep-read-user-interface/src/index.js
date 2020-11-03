import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';


const mainTheme = createMuiTheme({
  palette: {
    primary: {
      main: '#FF6611'
    },
    secondary:{
      main: "#FFFFFF"
    },
    white:{
      main: "#FFFFFF"
    }
  },
  // overrides: {
  //   MuiCssBaseline: {
  //     '@global': {
  //       '*::-webkit-scrollbar': {
  //         width: '0.4em'
  //       },
  //       '*::-webkit-scrollbar-track': {
  //         '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.00)'
  //       },
  //       '*::-webkit-scrollbar-thumb': {
  //         backgroundColor: '#FF6611',
  //         outline: '1px solid slategrey'
  //       }
  //     }
  //   }
  // }
});

// const styles = theme => ({
//   '@global': {
//     '*::-webkit-scrollbar': {
//       width: '0.4em'
//     },
//     '*::-webkit-scrollbar-track': {
//       '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.00)'
//     },
//     '*::-webkit-scrollbar-thumb': {
//       backgroundColor: 'rgba(0,0,0,.1)',
//       outline: '1px solid slategrey'
//     }
//   }
// });

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={mainTheme}>
        <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();