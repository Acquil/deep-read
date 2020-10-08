import React from 'react';
import { makeStyles, Paper } from '@material-ui/core';
import GitHubIcon from '@material-ui/icons/GitHub';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexGrow: 1
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
    paddingTop:'20px'
  },
  paper:{
    background: '#f5f5f5'
  },
  linkWithoutStyle: {
    color: 'inherit',
    textDecoration: 'inherit'
  },
  rightBottom:{
    position:"absolute",
    paddingRight:"24px",
    right:"0"
  }
}));

function Home() {
  const classes = useStyles();

  return (
    <div>
      <div><h1><strong>Home</strong></h1></div>
      <div className={classes.topSpacing10}>
        <Paper className={classes.paper}> 
          <div className={classes.spacing10}>
            <h1><span><strong>deep-read</strong></span></h1>
            <p><span className={classes.fontSize20}>&nbsp; &nbsp; Meeting summarization and quiz generator.</span></p>
          </div>
          <div className={classes.spacing20}>
            <h1><span>Mission</span></h1>
            <p><span className={classes.fontSize20}>&nbsp; &nbsp; Make the process of online learning more effective.</span></p>
          </div>
          <div className={classes.spacing20}>
            <h1><span>Features</span></h1>
            <p><span className={classes.fontSize20}>&nbsp; &nbsp; The following functionalities will be implemented for making online classes more effective:</span></p>
            <p><span className={classes.fontSize20}>&nbsp; &nbsp; Use Artificial Intelligence (AI), to summarize the contents of video call/conference</span></p>
            <p><span className={classes.fontSize20}>&nbsp; &nbsp; &nbsp; &nbsp; <em>This will help students to focus more on the lecture.</em></span></p>
            <p><span className={classes.fontSize20}>&nbsp; &nbsp; Automatically generate Multiple Choice Questions (MCQs) from both the meeting transcript and visual media presented during the meeting</span></p>
            <p><span className={classes.fontSize20}><em> &nbsp; &nbsp; &nbsp; &nbsp; This will help both the faculties and students to evaluate the understanding of the online lecture.</em></span></p>
            <p><span className={classes.fontSize20}>&nbsp; &nbsp; Supply reverse search capability to search for a term from the video</span></p>
            <p><em><span className={classes.fontSize20}> &nbsp; &nbsp; &nbsp; &nbsp; This will help students to easily find a particular clip in the video.</span></em></p>
          </div>          
        </Paper>     
        <br/>
      </div>  
      <div className={classes.rightBottom}>
          <a href="https://github.com/Acquil/deep-read" className={classes.linkWithoutStyle}>
          <GitHubIcon />
          </a>
      </div>    
    </div>
  );
}

export default Home;
