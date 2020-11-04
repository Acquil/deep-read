import React from 'react';
import './App.css';
import NavigationBar from './components/NavigationBar'
import Backdrop from '@material-ui/core/Backdrop';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
    backgroundColor: 'white',
  },
}));

export default function App() {
  const classes = useStyles();
  const [showIntroFlag, setShowIntroFlag] = React.useState(true);
  const [showNav, setShowNavFlag] = React.useState(false);

  // const disableScrolling = () => {
  //   setTimeout(function() { 
  //     document.body.style.overflow = 'hidden'; 
  // }, 1000); 
  // }

  // const enableScrolling = () => {
  //   document.body.style.overflow = ''; 
  // }

  // window.addEventListener("scroll", disableScrolling);
  // window.addEventListener("mousewheel", enableScrolling);
  // window.addEventListener("click", enableScrolling);
  // window.addEventListener("mousemove", enableScrolling);


  const showIntro = () => {
    if(showIntroFlag){
      console.log("Reached")
      return(
        <Backdrop className={classes.backdrop} open={true}>
          <div>
            <img src="../logo.svg" width="125px" alt="Logo" height="125px"></img>
          </div>
        </Backdrop>
      )
    }
  }


  const delayIntro = () => {
    setTimeout(() => { setShowIntroFlag(false); setShowNavFlag(true); }, 3500);
  }

  const showNavBar = () => {
    if(showNav){
      return(<NavigationBar />)
    }
  }

  return (
    <div>
      {showIntro()}
      {delayIntro()}
      {showNavBar()} 
    </div>
  );
}
