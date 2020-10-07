import { makeStyles, Paper, Grid, Button, TextField } from '@material-ui/core';
import React from 'react';
import ThreeSixtyIcon from '@material-ui/icons/ThreeSixty';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import ReceiptSharpIcon from '@material-ui/icons/ReceiptSharp';
import PhotoSizeSelectSmallSharpIcon from '@material-ui/icons/PhotoSizeSelectSmallSharp';
import QuestionAnswerSharpIcon from '@material-ui/icons/QuestionAnswerSharp';
import SearchSharpIcon from '@material-ui/icons/SearchSharp';
import PhotoLibrarySharpIcon from '@material-ui/icons/PhotoLibrarySharp';
import axios from 'axios'


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexGrow: 1,
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
    position:"fixed",
    bottom:"0",
    width:"100%"
  },
  bottomPadding:{
    paddingBottom:"50px",
  }
}));

function StartDeepRead() {
  const classes = useStyles();
  const [gDriveLinkVar, setGDriveLinkVar] = React.useState(false);
  const [dataForGDriveLinkVar, setdataForGDriveLinkVar] = React.useState(false);
  const [bottomNavValue, setBottomNavValue] = React.useState(false);
  const [processFlag, setProcessFlag] = React.useState(false);
  const [videoInformationFlag, setVideoInformationFlag] = React.useState(false);
  const [transcriptFlag, setTranscriptFlag] = React.useState(false);
  const [summaryFlag, setSummaryFlag] = React.useState(false);
  const [mcqFlag, setMCQFlag] = React.useState(false);
  const [irFlag, setIRFlag] = React.useState(false);
  const [GDriveBoxFlag, setGDriveBoxFlag] = React.useState(false);
  const [galleryFlag, setGalleryFlag] = React.useState(false);

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

  const displayGDrivebox = () =>{
    // if(!GDriveBoxFlag){
    //   return null;
    // }
    // else{
      return( <Grid item xs>
        <Paper className={classes.paper}>
          <div><TextField className={classes.fullWidthElement} id="outlined-basic" label="Google Drive Link" variant="outlined" onChange={updateGDriveTextBox} /></div>
          <div className={classes.topSpacing10}><Button className={classes.fullWidthElement} startIcon={<ThreeSixtyIcon />} variant="outlined"  label="Process" onClick={sendGDriveLinkAPI}>Process</Button></div>
        </Paper>
      </Grid>)
    // }
  }

  const displayVideoInformation = () =>{
    if(!videoInformationFlag){
      return null;
    }
    return(     
          <Grid item xs>
            <Paper className={classes.paper}>Video information</Paper>
          </Grid>
      )     
  }

  const displayTranscripts = () =>{
    if(!transcriptFlag){
      return null;
    }
    else{
      axios.post('http://127.0.0.1:5000/files/g-drive/', {
        link: 'https://drive.google.com/file/d/1qbDEOE5pridr2AOmRt4J1w1GokGr8SHm/view?usp=sharing'
      }).then((responseData) => {
        console.log(responseData)
      }).catch(error=> {
        console.log(error)
      })
      return( <Grid item xs>
        <Paper className={classes.paper}>Transcripts</Paper>
      </Grid>)
    }
  }

  const displaySummary = () =>{
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
    if(!irFlag){
      return null;
    }
    else{
      return( <Grid item xs>
        <Paper className={classes.paper}>IR</Paper>
      </Grid>)
    }
  }

  const displayGallery = () =>{
    if(!galleryFlag){
      return null;
    }
    else{
      return( <Grid item xs>
        <Paper className={classes.paper}>Gallery</Paper>
      </Grid>)
    }
  }

  const setAllFalse = () => {
    setGDriveBoxFlag(true);
    setVideoInformationFlag(true);
    setTranscriptFlag(false)
    setSummaryFlag(false);
    setMCQFlag(false);
    setIRFlag(false);
    setGalleryFlag(false);
  }

  const showGDriveBox = ()=>{
    setAllFalse();
    setGDriveBoxFlag(true);
   }

  const showVideoInformation = ()=>{
    setAllFalse();
    setVideoInformationFlag(true);
  }

  const showTranscripts = ()=>{
  
    setAllFalse();
    showSummary();
    setTranscriptFlag(true)   
   }

   const showSummary = ()=>{
    setAllFalse();
    setSummaryFlag(true);
   }

   const showMCQ = ()=>{
    setAllFalse();
    setMCQFlag(true);
   }

   const showIR = ()=>{
    setAllFalse();
    setIRFlag(true);
   }

   const showGallery = ()=>{
    setAllFalse();
    setGalleryFlag(true);
   }

  return (
    <div>
      <div><h1><strong>Start deep-read</strong></h1>
      </div>

      <div className={classes.topSpacing30}>
        <Grid container spacing={3}>     
          {displayGDrivebox()}
          {displayVideoInformation()}          
        </Grid>
      </div>

      <div className={classes.bottomPadding}>
        <Grid container spacing={3}>          
            {displayTranscripts()}        
            {displaySummary()}
            {displayMCQS()}
            {displayIR()}        
            {displayGallery()}                                              
        </Grid> 
      </div>
      
      <div >
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justify="center"  
        >
          <Grid item className={classes.bottom}>
            <BottomNavigation
              value={bottomNavValue}
              onChange={(event, newValue) => {
                setBottomNavValue(newValue);
              }}
              showLabels
              className={classes.root}
            >
              <BottomNavigationAction label="Notes" icon={<ReceiptSharpIcon/>}  onClick={showTranscripts} />
              <BottomNavigationAction label="MCQs" icon={<QuestionAnswerSharpIcon />} onClick={showMCQ}/>
              <BottomNavigationAction label="IR" icon={<SearchSharpIcon />} onClick={showIR}/>
              <BottomNavigationAction label="Gallery" icon={<PhotoLibrarySharpIcon />} onClick={showGallery}/>
            </BottomNavigation>
          </Grid>   

        </Grid>         
      </div>
  
    </div>
  );
}

export default StartDeepRead;
