import { Grid, makeStyles, Paper } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import GitHubIcon from '@material-ui/icons/GitHub';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  
  root: {
    display: 'flex',
    flexGrow: 1
  },
  mainPaper:{
    background: '#f5f5f5',
    borderColor: '#000000',
    margin: `${theme.spacing(1)}px auto`,
    padding: theme.spacing(2),
    paddingBottom:"60px",
  },
  paper: {
    background: '#f5f5f5',
    borderColor: '#000000',
    margin: `${theme.spacing(1)}px auto`,
    padding: theme.spacing(2),
    maxWidth: "400px"
  },
  topSpacing10:{
    paddingTop:"45px"
  },
  orange1: {
    backgroundColor: "#ff9533",
    width: theme.spacing(8),
    height: theme.spacing(8)
    
  },
  orange2: {
    backgroundColor: "#ff9533",
    width: theme.spacing(8),
    height: theme.spacing(8)
  },
  orange3: {
    backgroundColor: "#ff871a",
    width: theme.spacing(8),
    height: theme.spacing(8)
  },
  orange4: {
    backgroundColor: "#ff7a00",
    width: theme.spacing(8),
    height: theme.spacing(8)
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
  parentClass:{
      height:"100%",
  },
  linkWithoutStyle: {
    color: 'inherit',
    textDecoration: 'inherit'
  },
  rightBottom:{
    position:"relative",
    paddingTop:"20px",
    float:"right",
  }
}));

function AboutUs() {
  const classes = useStyles();
  return (
    <div className={classes.parentClass}>
      <Paper className={classes.mainPaper} variant="outlined">
      <div><h1><strong>About us</strong></h1></div>
      <div className={classes.topSpacing10}>
        <Grid container spacing={3}>         
          <Grid item xs>
            <Paper className={classes.paper} variant="outlined">
              <Grid container wrap="nowrap" spacing={2}>
                  <Grid item className={classes.topSpacing10}>
                    <div>
                      <Avatar className={classes.orange1}>
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
            <Paper className={classes.paper} variant="outlined">
              <Grid container wrap="nowrap" spacing={2}>
                  <Grid item className={classes.topSpacing10}>
                    <div>
                      <Avatar className={classes.orange2}>
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
            <Paper className={classes.paper} variant="outlined">
              <Grid container wrap="nowrap" spacing={2}>
                <Grid item className={classes.topSpacing10}>
                  <div>
                    <Avatar className={classes.orange3}>
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
            <Paper className={classes.paper} variant="outlined">
             <Grid container wrap="nowrap" spacing={2}>
                <Grid item className={classes.topSpacing10}>
                  <div>
                    <Avatar className={classes.orange4}>
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
    <div className={classes.rightBottom}>
          <a href="https://github.com/Acquil/deep-read" className={classes.linkWithoutStyle}>
          <GitHubIcon />
          </a>
      </div>    
    </Paper>
    </div>
  );
}

export default AboutUs;
