import { Grid, makeStyles, Paper } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import { red, green, blue, grey} from '@material-ui/core/colors';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexGrow: 1
  },
  paper:{
    background: '#eeeeee',
    paddingBottom:"10px"
  },
  fontSize20:{
    fontSize:"20px"
  },
  spacing20: {
    paddingTop:'20px',
    paddingLeft: '20px',
    paddingRight:'20px',
    paddingBottom:'20px'
  },
  spacing10: {
    paddingTop:'10px',
    paddingLeft: '20px',
    paddingRight:'20px',
    paddingBottom:'20px'
  },
  topSpacing10:{
   position:"fixed",
   top:"50%",
   left:"50%",

  },
  red: {
    color: theme.palette.getContrastText(red[900]),
    backgroundColor: red[900],
    width: theme.spacing(10),
    height: theme.spacing(10)
    
  },
  green: {
    color: theme.palette.getContrastText(green[900]),
    backgroundColor: green[900],
    width: theme.spacing(10),
    height: theme.spacing(10)
  },
  blue: {
    color: theme.palette.getContrastText(blue[900]),
    backgroundColor: blue[900],
    width: theme.spacing(10),
    height: theme.spacing(10)
  },
  grey: {
    color: theme.palette.getContrastText(grey[900]),
    backgroundColor: grey[900],
    width: theme.spacing(10),
    height: theme.spacing(10)
  },
  centreSpacing:{
    paddingTop: "5%",
    paddingLeft: "39%"
  },
  bigLabel:{
    fontSize:"45px"
  },
  bigText:{
    paddingTop:"10px",
    textAlign: 'center',
    fontSize:"25px",
    fontWeight:"bold"
  },
  smallText:{
    textAlign: 'center',
    fontSize:"20px",
  },
  centrePosition:{
    // position:"absolute",
    // left:"350px",
    // top:"25px"
    background:"green",
    
  },
  parentClass:{
      background:"yellow",
      height:"100%",
      textAlign:"centre"
  }
}));

function AboutUs() {
  const classes = useStyles();

  return (
    <div className={classes.parentClass}>
      <div><h1><strong>About us</strong></h1></div>
      <div className={classes.centrePosition}>
          <Grid container spacing={3}>
            <Grid item xs={3}>
              <Paper className={classes.paper} >
               <div className={classes.centreSpacing}>
                <Avatar className={classes.red}>
                  <label className={classes.bigLabel}>A</label>
                </Avatar>   
               </div>
               <div className={classes.bigText}>Akhil Hassan V S</div>
               <div className={classes.smallText}>16PW05</div>
               <div className={classes.smallText}>MSc Software Systems</div>
              </Paper>
            </Grid>
            <Grid item xs={3}>
              <Paper className={classes.paper}>
               <div className={classes.centreSpacing}>
                <Avatar className={classes.green}>
                  <label className={classes.bigLabel}>A</label>
                </Avatar>   
               </div>
               <div className={classes.bigText}>Ashwin Kumar N</div>
               <div className={classes.smallText}>16PW07</div>
               <div className={classes.smallText}>MSc Software Systems</div>
              </Paper>
            </Grid>            
          </Grid>
          <Grid container spacing={3}>
            <Grid item xs={3}>
                <Paper className={classes.paper}>
                <div className={classes.centreSpacing}>
                  <Avatar className={classes.blue}>
                    <label className={classes.bigLabel}>H</label>
                  </Avatar>   
                </div>
                <div className={classes.bigText}>Harish G</div>
                <div className={classes.smallText}>16PW13</div>
                <div className={classes.smallText}>MSc Software Systems</div>
                </Paper>
              </Grid>
              <Grid item xs={3} >
                <Paper className={classes.paper}>
                <div className={classes.centreSpacing}>
                  <Avatar className={classes.grey}>
                    <label className={classes.bigLabel}>S</label>
                  </Avatar>   
                </div>
                <div className={classes.bigText}>Sree Deepack R</div>
                <div className={classes.smallText}>16PW35</div>
                <div className={classes.smallText}>MSc Software Systems</div>
                </Paper>
              </Grid>
            </Grid>
      </div>
    </div>
  );
}

export default AboutUs;
