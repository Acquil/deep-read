import { Grid, makeStyles, Paper, Typography } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import { red, green, blue, grey, deepOrange} from '@material-ui/core/colors';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexGrow: 1
  },
  paper: {
    maxWidth: 400,
    background: '#f5f5f5',
    margin: `${theme.spacing(1)}px auto`,
    padding: theme.spacing(2),
  },
  fontSize20:{
    fontSize:"20px"
  },
  spacing20: {
    paddingTop:'20px',
    paddingLeft: '50px',
    paddingRight:'20px',
    paddingBottom:'20px'
  },
  spacing10: {
    paddingTop:'60px',
    paddingLeft: '250px',
    paddingBottom:'20px'
  },
  topSpacing10:{
    paddingTop:"45px"
  },
  red: {
    color: theme.palette.getContrastText(grey[600]),
    backgroundColor: deepOrange[200],
    width: theme.spacing(8),
    height: theme.spacing(8)
    
  },
  green: {
    color: theme.palette.getContrastText(grey[700]),
    backgroundColor: deepOrange[300],
    width: theme.spacing(8),
    height: theme.spacing(8)
  },
  blue: {
    color: theme.palette.getContrastText(grey[800]),
    backgroundColor: deepOrange[400],
    width: theme.spacing(8),
    height: theme.spacing(8)
  },
  grey: {
    color: theme.palette.getContrastText(grey[900]),
    backgroundColor: deepOrange[500],
    width: theme.spacing(8),
    height: theme.spacing(8)
  },
  centreSpacing:{
    paddingTop: "5%",
    paddingLeft: "39%"
  },
  bigLabel:{
    fontSize:"35px"
  },
  bigText:{
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
    width:"100%"
    
  },
  parentClass:{
      height:"100%",
  }
}));

function AboutUs() {
  const classes = useStyles();
  const message = "Hello there!";
  return (
    <div className={classes.parentClass}>
      <div><h1><strong>About us</strong></h1></div>
      <div className={classes.topSpacing10}>
        <Grid container spacing={3}>         
          <Grid item xs>
            <Paper className={classes.paper}>
              <Grid container wrap="nowrap" spacing={2}>
                  <Grid item className={classes.topSpacing10}>
                    <div>
                      <Avatar className={classes.red}>
                        <label className={classes.bigLabel}>A</label>
                      </Avatar>
                    </div>
                  </Grid>
                  <Grid item>
                    <div className={classes.bigText}>Akhil Hassan V S</div>
                    <div className={classes.smallText}>16PW05</div>
                    <div className={classes.smallText}>MSc Software Systems</div>
                  </Grid>
                </Grid>
            </Paper>
          </Grid>
          <Grid item xs>
            <Paper className={classes.paper}>
              <Grid container wrap="nowrap" spacing={2}>
                  <Grid item className={classes.topSpacing10}>
                    <div>
                      <Avatar className={classes.green}>
                        <label className={classes.bigLabel}>A</label>
                      </Avatar>
                    </div>
                  </Grid>
                  <Grid item>
                    <div className={classes.bigText}>Ashwin Kumar N</div>
                    <div className={classes.smallText}>16PW07</div>
                    <div className={classes.smallText}>MSc Software Systems</div>
                  </Grid>
                </Grid>
            </Paper>
          </Grid>
          <Grid item xs>
            <Paper className={classes.paper}>
              <Grid container wrap="nowrap" spacing={2}>
                <Grid item className={classes.topSpacing10}>
                  <div>
                    <Avatar className={classes.blue}>
                      <label className={classes.bigLabel}>H</label>
                    </Avatar>
                  </div>
                </Grid>
                <Grid item>
                  <div className={classes.bigText}>Harish G</div>
                  <div className={classes.smallText}>16PW13</div>
                  <div className={classes.smallText}>MSc Software Systems</div>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          <Grid item xs>
            <Paper className={classes.paper}>
             <Grid container wrap="nowrap" spacing={2}>
                <Grid item className={classes.topSpacing10}>
                  <div>
                    <Avatar className={classes.grey}>
                      <label className={classes.bigLabel}>S</label>
                    </Avatar>
                  </div>
                </Grid>
                <Grid item>
                  <div className={classes.bigText}>Sree Deepack R</div>
                  <div className={classes.smallText}>16PW35</div>
                  <div className={classes.smallText}>MSc Software Systems</div>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
    </div>       
    </div>
  );
}

export default AboutUs;
