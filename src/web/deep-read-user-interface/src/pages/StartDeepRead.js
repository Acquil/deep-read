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
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import Request from 'axios-request-handler';
import Alert from '@material-ui/lab/Alert';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';




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
  labelWidth: {
    fontSize: "70px"
  },
  bottom: {
    position: "fixed",
    bottom: "0",
    width: "100%",
    background: '#f5f5f5'
  },
  bottomPadding: {
    paddingBottom: "50px",
  },
  AlertMSG:{
    position:"fixed",
    top:"20px"
  }
}));

function StartDeepRead() {

  const classes = useStyles();
  const [gDriveLinkVar, setGDriveLinkVar] = React.useState('');
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
  const [videoSizeFromAPI, setVideoSizeFromAPI] = React.useState(null);
  const [fileIDFromAPI, setFileIDFromAPI] = React.useState(null);
  const [transcriptFromAPI, setTranscriptFromAPI] = React.useState(null);
  const [model, setModel] = React.useState('');
  const [alertFlag, setAlertFlag] = React.useState(null);
  const [alertMSG, setAlertMSG] = React.useState('');
  const [openAlert, setOpenAlert] = React.useState(true);
  const [transcriptTimeFromAPI, setTranscriptTimeFromAPI] = React.useState(null);


  const baseURL = "http://127.0.0.1:5000/"

  const updateGDriveTextBox = (e) => {
    setGDriveLinkVar(e.target.value)
  }

  const handleModelChange = (event) => {
    setModel(event.target.value);
  };

  const call_POST_files_gdrive = () => {
    console.log("call_POST_files_gdrive Reached")
    if ((gDriveLinkVar !== '')) {     
      console.log("call_POST_files_gdrive Called") 
      axios.post(baseURL + 'files/g-drive/' + gDriveLinkVar, {
      }).then((responseData) => {
        console.log(responseData)
        if ((responseData.data.filename !== null) && (responseData.data.id !== null)) {
          setVideoNameFromAPI(responseData.data.filename);
          setVideoSizeFromAPI(responseData.data.size);
          showVideoInformation();
          setFileIDFromAPI(responseData.data.id);
          // console.log("Filename:"+videoNameFromAPI)
          // console.log("ID_1:"+fileIDFromAPI)
          // console.log("id in fun1:"+responseData.data.id)
          call_POST_speech_post(responseData.data.id);          
        }
      }).catch(error => {
        console.log(error)
      });
    }

    //TEST
    // setVideoNameFromAPI("Video 1");
    // setVideoSizeFromAPI("60 MB");
    // showVideoInformation();
    // call_POST_speech_post("abc"); 

  }

  const call_POST_speech_post = (id) => {
    console.log("id in fun1:"+id)
    console.log("call_POST_speech_post Reached")
    // console.log("ID_2:"+fileIDFromAPI)
    // console.log("model:"+model)
    if ((id !== null) && (model !== '')) {
      console.log("call_POST_speech_post called")
      axios.post(baseURL + 'speech/post/' + id + '&' + model, {
      }).then((responseData) => {
        console.log(responseData)       
        poll_call_GET_speech_get(responseData.data.id); 
      }).catch(error => {
        console.log(error)
      });

    }

    //TEST
    //poll_call_GET_speech_get("abc"); 

  }
   
  const poll_call_GET_speech_get = (id) => {
    var transcriptTime = null;
    console.log("poll_call_GET_speech_get reached")
    const api_call_GET_speech_get  = new Request(baseURL + 'speech/get/' + id);
    api_call_GET_speech_get.poll(3000).get((response) => {
      console.log("poll_call_GET_speech_get started")
      console.log(response.data);
      
      if(response.data.status === "Success"){
        setTranscriptFromAPI(response.data.transcript.transcript);
        // transcriptTime = JSON.parse(response.data.transcript.transcript_times);
        setTranscriptTimeFromAPI(response.data.transcript.transcript_times);
        //transcriptFromAPI = response.data.transcript.transcript;
        // console.log("Transcript before setting var: "+response.data.transcript.transcript)
        // console.log("Transcript from API: "+transcriptFromAPI)
        //showTranscripts();
        return false;
      }

      // for (var i = 0, emp; i < result.employees.length; i++) {
      //   emp = result.employees[i];
      //   employees[ emp.id ] = emp;
      // }
      // you can cancel polling by returning false
    });
    //setTranscriptFromAPI("ABCDEF");

  }

  const sendGDriveLinkAPI = () => {
    if(gDriveLinkVar === ''){
      setAlertMSG("Please enter Google Drive Link!");
      setAlert();
      return;
    }
    var urlValid = gDriveLinkVar.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
    if(urlValid == null){
      setAlertMSG("Please enter a VALID Google Drive Link!");
      setAlert();
      return;
    }
    if(model === ''){
      setAlertMSG("Please select a language!");
      setAlert();
      return;
    }
    call_POST_files_gdrive();

  }

  const displayAlert = () =>{
    if(alertFlag === null){
      return null
    }
    else{
    return (
      <Collapse in={openAlert}>
        <Alert
          severity="error"
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpenAlert(false);
                setAlertFlag(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
        >
          {alertMSG}
      </Alert>
    </Collapse>
    ) 
    }
  }

  const displayGDrivebox = () => {
    // if(!GDriveBoxFlag){
    //   return null;
    // }
    // else{
    return (<Grid item xs>
      <Paper className={classes.paper}>
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <div>
              <TextField className={classes.fullWidthElement} id="outlined-basic" label="Google Drive Link" variant="outlined" onChange={updateGDriveTextBox} />
            </div>
          </Grid>
          <Grid item xs={4}>
            <div>
              <FormControl variant="outlined" className={classes.fullWidthElement}>
                <InputLabel id="model-label">Language</InputLabel>
                <Select
                  labelId="model-label"
                  id="model-select"
                  value={model}
                  onChange={handleModelChange}
                  label="Language"
                  className={classes.fullWidthElement}
                  required={true}
                >
                  <MenuItem value={"model-generic"}>American English</MenuItem>
                  <MenuItem value={"model-indian"}>Indian English</MenuItem>
                </Select>

              </FormControl>
            </div>
          </Grid>
        </Grid>
        <div className={classes.topSpacing10}><Button color="primary" className={classes.fullWidthElement} startIcon={<ThreeSixtyIcon />} label="Process" onClick={sendGDriveLinkAPI}>Process</Button></div>
      </Paper>
    </Grid>)
    // }
  }

  const displayVideoInformation = () => {
    if (videoInformationFlag === null) {
      return null;
    }
    if (videoNameFromAPI !== null) {
      return (
          <Grid item xs>
            <Paper className={classes.paper}>
              <Grid container spacing={2}>
                <Grid item className={classes.topSpacing10}>
                <div>
                <strong>
                  Video Information
                </strong>              
                </div>
                <div className={classes.topSpacing10}>
                    Video Name: {videoNameFromAPI}
                  </div>
                <div>
                  Video Size: {videoSizeFromAPI}
                </div>
                </Grid>
                <Grid item className={classes.topSpacing10}>
                  {/* <iframe title="Video" src="https://drive.google.com/file/d/1qbDEOE5pridr2AOmRt4J1w1GokGr8SHm/preview?t=45" width="1280" height="720"></iframe> */}
                  {/* https://drive.google.com/file/d/1qbDEOE5pridr2AOmRt4J1w1GokGr8SHm/view?usp=sharing */}                  
                  <iframe title="Video" src={gDriveLinkVar.replace("/view?usp=sharing","/preview")} width="1400" height="720"></iframe>
                </Grid>
              </Grid>
            </Paper>
          </Grid>        
        
      )
    }
  }

  const displayTranscripts = () => {
    if (!transcriptFlag) {
      return null;
    }
    else {
      return (<Grid item xs>
        <Paper className={classes.paper}>
          <div>
            <strong>
              Transcript
              </strong>            
          </div>
          <div className={classes.topSpacing10}>
            {transcriptFromAPI}
          </div>
          </Paper>
      </Grid>)
    }
  }

  const displaySummary = () => {
    if (!summaryFlag) {
      return null;
    }
    else {
      return (<Grid item xs>
        <Paper className={classes.paper}>
          <div>
            <strong>
              Summary
              </strong>
          </div></Paper>
      </Grid>)
    }

  }

  const displayMCQS = () => {
    if (!mcqFlag) {
      return null;
    }
    else {
      return (<Grid item xs>
        <Paper className={classes.paper}>
          <div>
            <strong>
              MCQs
              </strong>
            
          </div></Paper>
      </Grid>)
    }
  }

  const displayIR = () => {
    if (!irFlag) {
      return null;
    }
    else {
      return (<Grid item xs>
        <Paper className={classes.paper}>
          <div>
            <strong>IR</strong>
          </div>
          <div>
            Test
          </div>
        </Paper>
      </Grid>)
    }
  }

  const displayGallery = () => {
    if (!galleryFlag) {
      return null;
    }
    else {
      return (<Grid item xs>
        <Paper className={classes.paper}>
          <div>
            <strong>
              Gallery
              </strong>
            
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

  const showGDriveBox = () => {
    setAllFalse();
    setGDriveBoxFlag(true);
  }

  const showVideoInformation = () => {
    setAllFalse();
    setVideoInformationFlag(true);
  }

  const showTranscripts = () => {
    console.log(transcriptTimeFromAPI[5].word)
    setAllFalse();
    showSummary();
    setTranscriptFlag(true)       
  }

  const showSummary = () => {
    setAllFalse();
    setSummaryFlag(true);
  }

  const showMCQ = () => {
    setAllFalse();
    setMCQFlag(true);
  }

  const showIR = () => {
    setAllFalse();
    setIRFlag(true);
  }

  const showGallery = () => {
    setAllFalse();
    setGalleryFlag(true);
  }

  const setAlert = () =>{
    setAlertFlag(true);
    setOpenAlert(true);
  }

  return (
    
    <div>
      
      <div>
        {displayAlert()}       
      </div>

      <div><h1><strong>Start deep-read</strong></h1>
      </div>

      <div className={classes.topSpacing30}>
        <Grid container spacing={3}>
          {displayGDrivebox()}
        </Grid>
      </div>

      <div className={classes.bottomPadding}>
        <Grid container spacing={3}>
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
              <BottomNavigationAction label="Notes"  icon={<ReceiptSharpIcon />} onClick={showTranscripts} />
              <BottomNavigationAction label="MCQs" icon={<QuestionAnswerSharpIcon />} onClick={showMCQ} />
              <BottomNavigationAction label="IR" icon={<SearchSharpIcon />} onClick={showIR} />
              <BottomNavigationAction label="Gallery" icon={<PhotoLibrarySharpIcon />} onClick={showGallery} />
            </BottomNavigation>
          </Grid>

        </Grid>
      </div>
   
    </div>
  );
}

export default StartDeepRead;
