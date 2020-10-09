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
    background: '#f5f5f5',
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
    width:"100%",
    background:'#f5f5f5'
  },
  bottomPadding:{
    paddingBottom:"50px",
  }
}));

function StartDeepRead() {
  const classes = useStyles();
  const [gDriveLinkVar, setGDriveLinkVar] = React.useState(null);
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
  const [videoNameFromAPI, setVideoNameFromAPI] = React.useState(null);
  const [fileIDFromAPI, setFileIDFromAPI] = React.useState(null);
  const baseURL = "http://127.0.0.1:5000/"

  const updateGDriveTextBox = (e) => {
    setGDriveLinkVar(e.target.value)
  }

  const sendGDriveLinkAPI = () => {
    //window.alert(gDriveLink)
    //API call
    // console.log(gDriveLinkVar)
    if(gDriveLinkVar !== null){
      axios.post(baseURL+'files/g-drive/'+gDriveLinkVar, {          
      }).then((responseData) => {
        console.log(responseData)
        if((responseData.data.filename !== null) && (responseData.data.id !== null)){
          setVideoNameFromAPI(responseData.data.filename);
          setFileIDFromAPI(responseData.data.id);
          showVideoInformation();
        }
      }).catch(error=> {
        console.log(error)
      });
    }  
    // setdataForGDriveLinkVar("Data returned from API")
  }

  const displayGDrivebox = () =>{
    // if(!GDriveBoxFlag){
    //   return null;
    // }
    // else{
      return( <Grid item xs>
        <Paper className={classes.paper}>
           <div>
              <h1><strong>
              Enter

              </strong>
              </h1>
            </div>
          <div><TextField className={classes.fullWidthElement} id="outlined-basic" label="Google Drive Link" variant="outlined" onChange={updateGDriveTextBox} /></div>
          <div className={classes.topSpacing10}><Button color="primary" className={classes.fullWidthElement} startIcon={<ThreeSixtyIcon />}   label="Process" onClick={sendGDriveLinkAPI}>Process</Button></div>
        </Paper>
      </Grid>)
    // }
  }

  const displayVideoInformation = () =>{
    if(videoInformationFlag === null){
      return null;
    }
    if(videoNameFromAPI !== null){
      return(      
        <Grid item xs>
          <Paper className={classes.paper}>
            <div>
              <h1><strong>
              Video Information
              </strong>
              </h1>
            </div>
            <Grid container spacing={2}>
              <Grid item>
                <div>
                  <b>Video Name:</b> {videoNameFromAPI}
                </div>
              </Grid>             
            </Grid>
          </Paper>
        </Grid>
    )     
    }   
  }

  const displayTranscripts = () =>{
    if(!transcriptFlag){
      return null;
    }
    else{
      return( <Grid item xs>
        <Paper className={classes.paper}>
          <div>
              <h1><strong>
              Transcript
              </strong>
              </h1>
            </div></Paper>
      </Grid>)
    }
  }

  const displaySummary = () =>{
    if(!summaryFlag){
      return null;
    }
    else{
      return( <Grid item xs>
        <Paper className={classes.paper}>
          <div>
              <h1><strong>
              Summary
              </strong>
              </h1>
            </div></Paper>
      </Grid>)
    }

  }

  const displayMCQS = () =>{
    if(!mcqFlag){
      return null;
    }
    else{
      return( <Grid item xs>
        <Paper className={classes.paper}>
          <div>
              <h1><strong>
              MCQs
              </strong>
              </h1>
            </div></Paper>
      </Grid>)
    }    
  }

  const displayIR = () =>{
    if(!irFlag){
      return null;
    }
    else{
      return( <Grid item xs>
        <Paper className={classes.paper}>
          <div>
              <h1><strong>IR</strong></h1>
          </div>
          <div>
            Test
          </div>
        </Paper>
      </Grid>)
    }
  }

  const displayGallery = () =>{
    if(!galleryFlag){
      return null;
    }
    else{
      return( <Grid item xs>
        <Paper className={classes.paper}>
          <div>
              <h1><strong>
              Gallery
              </strong>
              </h1>
            </div></Paper>
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
    if(fileIDFromAPI !== null){
      axios.get(baseURL+'speech/get/'+fileIDFromAPI, {       
      }).then((responseData) => {
        console.log(responseData)
        setAllFalse();
        showSummary();
        setTranscriptFlag(true) 
      }).catch(error=> {
        console.log(error)
      });
      
    }    
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
