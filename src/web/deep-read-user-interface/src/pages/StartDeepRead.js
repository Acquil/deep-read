import { makeStyles, Paper, Grid, Button, TextField } from '@material-ui/core';
import React from 'react';
import ThreeSixtyIcon from '@material-ui/icons/ThreeSixty';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import ReceiptSharpIcon from '@material-ui/icons/ReceiptSharp';
import PhotoSizeSelectSmallSharpIcon from '@material-ui/icons/PhotoSizeSelectSmallSharp';
import QuestionAnswerSharpIcon from '@material-ui/icons/QuestionAnswerSharp';
import SearchSharpIcon from '@material-ui/icons/SearchSharp';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexGrow: 1,
    flexWrap: 'wrap'
  },
  margin: {
    margin: theme.spacing(1),
  },
  withoutLabel: {
    marginTop: theme.spacing(3),
  },
  textField: {
    width: '25ch',
  },
  paper: {
    background: '#eeeeee',
    margin: `${theme.spacing(1)}px auto`,
    padding: theme.spacing(2),

  },
  topSpacing10: {
    marginTop: '10px'
  },
  topSpacing30: {
    marginTop: '30px',
  },
  fullDisplay: {
  },
  fullWidthElement: {
    width: '100%'
  },
  labelWidth:{
    fontSize:"70px"
  },
  bottom:{
    width:"100%",
    position:"fixed",
    bottom:"0"
  },
  defaultFont:{
    fontFamily:'sans-serif',
    fontSize:"250px"
  }
}));

function StartDeepRead() {
  const classes = useStyles();
  const [gDriveLinkVar, setGDriveLinkVar] = React.useState(false);
  const [dataForGDriveLinkVar, setdataForGDriveLinkVar] = React.useState(false);
  const [bottomNavValue, setBottomNavValue] = React.useState(false);
  const [videoInformationFlag, setVideoInformationFlag] = React.useState(false);
  const [transcriptFlag, setTranscriptFlag] = React.useState(false);
  const [summaryFlag, setSummaryFlag] = React.useState(false);
  const [mcqFlag, setMCQFlag] = React.useState(false);
  const [irFlag, setIRFlag] = React.useState(false);

  const setAllFalse = () =>{
    // setVideoInformationFlag(false);
    // setTranscriptFlag(false);
    // setSummaryFlag(false);
    // setMCQFlag(false);
    // setIRFlag(false);
  }

  const updateGDriveTextBox = (e) => {
    setGDriveLinkVar(e.target.value)
  }

  const sendGDriveLinkAPI = () => {
    //window.alert(gDriveLink)
    //API call
    // console.log(gDriveLinkVar)
    setdataForGDriveLinkVar("Data returned from API")
    showVideoInformation();
  }

  const displayDataForGDriveLink = () => {
    if (!false) {
      return null
    }
    else {
      return (
        <div>
          <Grid container alignItems="center" spacing={3}>
            <Grid item xs={6}>
              <Paper className={classes.paper}>Transcript</Paper>
            </Grid>
            <Grid item xs={6}>
              <Paper className={classes.paper}>Summary</Paper>
            </Grid>
          </Grid>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <Paper className={classes.paper}>MCQs</Paper>
            </Grid>
            <Grid item xs={6}>
              <Paper className={classes.paper}>IR</Paper>
            </Grid>
          </Grid>
        </div>
      );
    }
  }

  const displayVideoInformation = () =>{
    setAllFalse();
    if(!videoInformationFlag){
      return null;
    }
    return(     
          <Grid item>
            <Paper className={classes.paper}>Video information</Paper>
          </Grid>
      )     
  }

  const displayTranscripts = () =>{
    setAllFalse();
    if(!transcriptFlag){
      return null;
    }
    else{
      return( <Grid item xs>
        <Paper className={classes.paper}>Transcripts</Paper>
      </Grid>)
    }
  }

  const displaySummary = () =>{
    setAllFalse();
    if(!summaryFlag){
      return null;
    }
    else{
      return( <Grid item xs>
        <Paper className={classes.paper}>Summary</Paper>
      </Grid>)
    }

  }

  const displayMCQS = () =>{
    setAllFalse();
    if(!mcqFlag){
      return null;
    }
    else{
      return( <Grid item xs>
        <Paper className={classes.paper}>MCQs</Paper>
      </Grid>)
    }    
  }

  const displayIR = () =>{
    setAllFalse();
    if(!irFlag){
      return null;
    }
    else{
      return( <Grid item xs>
        <Paper className={classes.paper}>IR</Paper>
      </Grid>)
    }
  }

  const showVideoInformation = ()=>{
   setVideoInformationFlag(true);
   setTranscriptFlag(false)
   setSummaryFlag(false);
   setMCQFlag(false);
   setIRFlag(false);
  }

  const showTranscripts = ()=>{
    setVideoInformationFlag(true);
    setTranscriptFlag(true)
    setSummaryFlag(false);
    setMCQFlag(false);
    setIRFlag(false);
   }

   const showSummary = ()=>{
    setVideoInformationFlag(true);
    setTranscriptFlag(false)
    setSummaryFlag(true);
    setMCQFlag(false);
    setIRFlag(false);
   }

   const showMCQ = ()=>{
    setVideoInformationFlag(true);
    setTranscriptFlag(false)
    setSummaryFlag(false);
    setMCQFlag(true);
    setIRFlag(false);
   }

   const showIR = ()=>{
    setVideoInformationFlag(true);
    setTranscriptFlag(false)
    setSummaryFlag(false);
    setMCQFlag(false);
    setIRFlag(true);
   }

  return (
    <div>
      <div><h1><strong>Start deep-read</strong></h1>
      </div>

      <div className={classes.topSpacing30}>
        <Paper className={classes.paper}>
        <div><TextField className={classes.fullWidthElement} id="outlined-basic" label="Google Drive Link" variant="outlined" onChange={updateGDriveTextBox} /></div>
        <div className={classes.topSpacing10}><Button className={classes.fullWidthElement} startIcon={<ThreeSixtyIcon />} variant="outlined"  label="Process" onClick={sendGDriveLinkAPI}>Process</Button></div>
        </Paper>        
      </div>

      <div className={classes.bottom}>
        <BottomNavigation
          value={bottomNavValue}
          onChange={(event, newValue) => {
            setBottomNavValue(newValue);
          }}
          showLabels
          className={classes.root}
        >
          <BottomNavigationAction label="Transcript" icon={<ReceiptSharpIcon/>}  onClick={showTranscripts} />
          <BottomNavigationAction label="Summary" icon={<PhotoSizeSelectSmallSharpIcon />} onClick={showSummary} />
          <BottomNavigationAction label="MCQs" icon={<QuestionAnswerSharpIcon />} onClick={showMCQ}/>
          <BottomNavigationAction label="IR" icon={<SearchSharpIcon />} onClick={showIR}/>
        </BottomNavigation>
      </div>
  
      <div>
        <Grid container spacing={3}>          
            {displayVideoInformation()}          
            {displayTranscripts()}        
            {displaySummary()}
            {displayMCQS()}
            {displayIR()}                       
        </Grid> 
      </div>
    </div>
  );
}

export default StartDeepRead;
