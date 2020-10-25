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
import Autocomplete from '@material-ui/lab/Autocomplete';
import SimpleReactLightbox from "simple-react-lightbox";
import { SRLWrapper } from "simple-react-lightbox";
import Quiz from '../components/QuizMain';
import CircularProgress from '@material-ui/core/CircularProgress';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import LinearProgress from '@material-ui/core/LinearProgress';




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
  accordian:{
    background: '#f5f5f5',
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
    left: "0",
    width: "100%",
  },
  bottom1: {
    position: "fixed",
    right:"0",
    bottom: "0",
    left: "0",
    width: "100%",
  },
  bottomPadding: {
    paddingBottom: "50px",
  },
  AlertMSG: {
    position: "fixed",
    top: "20px"
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
  const [transcriptLoadingFlag, setTranscriptLoadingFlag] = React.useState(false);
  const [summaryFlag, setSummaryFlag] = React.useState(false);
  const [summaryPostCalled, setSummaryPostCalled] = React.useState(false);
  const [mcqFlag, setMCQFlag] = React.useState(false);
  const [mcqPostCalled, setMcqPostCalled] = React.useState(false);
  const [irFlag, setIRFlag] = React.useState(false);
  const [irSearchFlag, setIRSearchFlag] = React.useState(false);
  const [GDriveBoxFlag, setGDriveBoxFlag] = React.useState(false);
  const [galleryFlag, setGalleryFlag] = React.useState(false);
  const [galleryPostCalled, setGalleryPostCalled] = React.useState(false);
  const [videoNameFromAPI, setVideoNameFromAPI] = React.useState(null);
  const [videoSizeFromAPI, setVideoSizeFromAPI] = React.useState(null);
  const [fileIDFromAPI, setFileIDFromAPI] = React.useState(null);
  const [transcriptFromAPI, setTranscriptFromAPI] = React.useState(null);
  const [summaryFromAPI, setSummaryFromAPI] = React.useState(null);
  const [model, setModel] = React.useState('');
  const [alertFlag, setAlertFlag] = React.useState(null);
  const [alertMSG, setAlertMSG] = React.useState('');
  const [openAlert, setOpenAlert] = React.useState(true);
  const [transcriptTimeFromAPI, setTranscriptTimeFromAPI] = React.useState(null);
  const [processButtonClicked, setProcessButtonClicked] = React.useState(false);
  const [mcqDataFromAPI, setMcqDataFromAPI] = React.useState(null);
  const [galleryDataFromAPI, setGalleryDataFromAPI] = React.useState(null);
  const [s2t_v2t_done_flag, set_s2t_v2t_done_flag] = React.useState(false);
  const [fileID, setFileID] = React.useState(null);
  const [searchGDrive, setSearchGDrive] = React.useState(null);
  const [disableProcessButton, setDisableProcessButton] = React.useState(false);
  const [videoInfoShown, setVideoInfoShown] = React.useState(false);
  const [displayMainLoadingFlag, setDisplayMainLoadingFlag] = React.useState(false);
  // const [videoInfoExpanded, setVideoInfoExpandedFlag] = React.useState(false); 
  // const expandVideoInfo = React.useRef(null)
  const notesClickRef = React.useRef(null);
  const top100Films = [
    { title: 'The Shawshank Redemption', year: 1994 },
    { title: 'The Godfather', year: 1972 },
    { title: 'The Godfather: Part II', year: 1974 },
    { title: 'The Dark Knight', year: 2008 },
    { title: '12 Angry Men', year: 1957 }
  ];
  var tmpMcqs = {}


  const baseURL = "http://127.0.0.1:5000/"


  const updateGDriveTextBox = (e) => {
    setGDriveLinkVar(e.target.value);
    setSearchGDrive((e.target.value).replace("/view?usp=sharing", "/preview"));
  }

  const handleModelChange = (event) => {
    setModel(event.target.value);
  };

  const sendGDriveLinkAPI = () => {
    setAllFalse(true)
    if (gDriveLinkVar === '') {
      setAlertMSG("Please enter Google Drive Link!");
      setAlert();
      return;
    }
    var urlValid = gDriveLinkVar.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
    if (urlValid == null) {
      setAlertMSG("Please enter a VALID Google Drive Link!");
      setAlert();
      return;
    }
    if (model === '') {
      setAlertMSG("Please select a language!");
      setAlert();
      return;
    }
    setProcessButtonClicked(true);
    setDisableProcessButton(true);
    setDisplayMainLoadingFlag(true);
    call_POST_files_gdrive();

  }

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
          // setVideoInfoExpandedFlag(true);
          showNavBar();
          notesClickRef.current.click();
          setDisplayMainLoadingFlag(false);
          setFileID(responseData.data.id);
          setFileIDFromAPI(responseData.data.id);
          call_POST_speech_post(responseData.data.id);
          call_POST_v2t_post(responseData.data.id);
        }
      }).catch(error => {
        console.log(error)
        setAlertMSG("Error when posting gDrive data check console logs!")
        setAlert();
        setDisplayMainLoadingFlag(false);
      });
    }
  }

  const call_POST_speech_post = (id) => {
    console.log("call_POST_speech_post Reached")
    if ((id !== null) && (model !== '')) {
      console.log("call_POST_speech_post called")
      axios.post(baseURL + 'speech/post/' + id + '&' + model, {
      }).then((responseData) => {
        console.log(responseData)
        poll_call_GET_speech_get(responseData.data.id);
      }).catch(error => {
        console.log(error)
        setAlertMSG("Error when posting Speech2text data check console logs!")
        setAlert();
      });

    }
  }

  const poll_call_GET_speech_get = (id) => {
    console.log("poll_call_GET_speech_get reached")
    const api_call_GET_speech_get = new Request(baseURL + 'speech/get/' + id);
    api_call_GET_speech_get.poll(3000).get((response) => {
      console.log("poll_call_GET_speech_get started")
      console.log(response.data);
      if (response.data.status === "Success") {
        setTranscriptFromAPI(response.data.transcript.transcript);
        setTranscriptTimeFromAPI(response.data.transcript.transcript_times);
        poll_call_GET_v2t_get(id);
        return false;
      }
    }).catch(error => {
      setAlertMSG("Error when polling Speech2text data check console logs!")
      setAlert();
      console.log(error);
    });
  }

  const call_POST_v2t_post = (id) => {
    console.log("call_POST_v2t_post Reached")

    if (id !== null) {
      console.log("call_POST_v2t_post called")
      axios.post(baseURL + 'VideotoTextConverter/post/' + id, {
      }).then((responseData) => {
        console.log(responseData)
      }).catch(error => {
        console.log(error)
        setAlertMSG("Error when posting video2text data check console logs!")
        setAlert();
      });

    }

  }

  const poll_call_GET_v2t_get = (id) => {
    console.log("poll_call_GET_v2t_get reached")
    const api_call_GET_v2t_get = new Request(baseURL + 'VideotoTextConverter/get/' + id);
    api_call_GET_v2t_get.poll(3000).get((response) => {
      console.log("poll_call_GET_v2t_get started")
      //console.log(response.data);      
      console.log(response)
      if (response.data.status === "Success") {
        set_s2t_v2t_done_flag(true);
        setDisableProcessButton(false);
        call_POST_Summarize_post(id);
        setSummaryPostCalled(true);
        call_POST_mcq_generator_post(id);
        setMcqPostCalled(true);
        call_POST_Gallery_post(id);
        setGalleryPostCalled(true);
        return false;
      }
    }).catch(error => {
      console.log(error);
      setAlertMSG("Error when polling video2text data check console logs!")
      setAlert();
    });

  }

  const call_POST_Summarize_post = (id) => {
    console.log("call_POST_Summarize_post Reached")
    if (id !== null) {
      console.log("call_POST_Summarize_post called")
      axios.post(baseURL + 'summarizer/post/' + id, {
      }).then((responseData) => {
        console.log(responseData)
        poll_call_GET_Summarize_get(id);
      }).catch(error => {
        setSummaryPostCalled(false);
        console.log(error)
        setAlertMSG("Error when posting Summary data check console logs!")
        setAlert();
      });
    }
  }

  const poll_call_GET_Summarize_get = (id) => {
    console.log("poll_call_GET_Summarize_get reached")
    const api_call_GET_summarizer_get = new Request(baseURL + 'summarizer/get/' + id);
    api_call_GET_summarizer_get.poll(3000).get((response) => {
      console.log("poll_call_GET_Summarize_get started")
      if (response.data.status === "Success") {
        setSummaryFromAPI(response.data.summary)
        return false;
      }
    }).catch(error => {
      console.log(error);
      setAlertMSG("Error when polling Summary data check console logs!")
      setAlert();
    });
  }

  const call_POST_mcq_generator_post = (id) => {
    console.log("call_POST_mcq_generator_post Reached")
    if ((id !== null)) {
      console.log("call_POST_mcq_generator_post called")
      axios.post(baseURL + 'mcq_generator/post/' + id, {
      }).then((responseData) => {
        console.log(responseData);
        poll_call_GET_Mcq_get(id)
      }).catch(error => {
        setMcqPostCalled(false);
        console.log(error)
        setAlertMSG("Error when posting MCQ data check console logs!")
        setAlert();
      });
    }
  }

  const poll_call_GET_Mcq_get = (id) => {
    console.log("poll_call_GET_Mcq_get reached")
    const api_call_GET_mcq_get = new Request(baseURL + 'mcq_generator/get/' + id);
    api_call_GET_mcq_get.poll(3000).get((response) => {
      console.log("poll_call_GET_Mcq_get started")
      //console.log(response.data);      
      if (response.data.status === "Success") {
        tmpMcqs = response.data.mcqs
        tmpMcqs["correctAnswer"] = 0;
        tmpMcqs["clickedAnswer"] = 0;
        tmpMcqs["step"] = 1;
        tmpMcqs["score"] = 0;
        setMcqDataFromAPI(tmpMcqs)
        console.log(tmpMcqs)
        return false;
      }
    }).catch(error => {
      console.log(error);
      setAlertMSG("Error when polling MCQ data check console logs!")
      setAlert();
    });
  }

  const call_POST_Gallery_post = (id) => {
    console.log("call_POST_Gallery_post Reached")
    if ((id !== null)) {
      console.log("call_POST_Gallery_post called")
      axios.post(baseURL + 'gallery/post/' + id, {
      }).then((responseData) => {
        console.log(responseData);
        setGalleryDataFromAPI(responseData.data)
      }).catch(error => {
        setGalleryPostCalled(false);
        console.log(error)
        setAlertMSG("Error when posting Gallery data check console logs!")
        setAlert();
      });

    }
  }

  const displayAlert = () => {
    if (alertFlag === null) {
      return null
    }
    else {
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
    return (
    <Grid item xs>
      <Paper className={classes.paper}>
        <div>
          {displayMainLoading()}
        </div>
        <Grid container spacing={2} className={classes.topSpacing10}>
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
        <div className={classes.topSpacing10}>
          <Button variant="outlined" color="default" disabled={disableProcessButton} className={classes.fullWidthElement} startIcon={<ThreeSixtyIcon />} label="Process" onClick={sendGDriveLinkAPI}>
            Process
          </Button>
        </div>
      </Paper>
    </Grid>)
    // }
  }

  const displayVideoInformation = () => {
    if (!videoInformationFlag) {
      return null;
    }
    else {
          console.log("NO irFlag")
          return(  
            <Accordion className={classes.accordian} defaultExpanded>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <div>
                  <strong>
                    Video Information
                </strong>
                </div>
              </AccordionSummary>
            <AccordionDetails className={classes.fullWidthElement}>
              <div className={classes.fullWidthElement}>
                 <div className={classes.topSpacing10}>
                    Video Name: {videoNameFromAPI}
                  </div>
                  <div>
                    Video Size: {videoSizeFromAPI}
                  </div>
                  <div className={classes.topSpacing10}>
                    {displaySearchBoxForIR()}            
                  </div>
                 <div item className={classes.topSpacing10}>
                  <iframe title="Video" src={searchGDrive} width="1280" height="720"></iframe>
                </div>
              </div>
             
            </AccordionDetails>
          </Accordion>
          )
             
      
  }
}


  const displaySearchBoxForIR = () => {
    if (irSearchFlag) {
      if (transcriptTimeFromAPI !== null) {
        return (<Autocomplete
          id="combo-box-demo"
          options={transcriptTimeFromAPI}
          getOptionLabel={(option) => option.word}
          onChange={(event, value) => setSearchGDriveValue(value)}
          renderInput={(params) => <TextField {...params} label="Search" variant="outlined" />}
        />)
      }
      else {
        return (
          <LinearProgress />
        )
      }
    }
    else {
      return null;
    }
  }

  const setSearchGDriveValue = (seconds) => {
    console.log(seconds)
    if(seconds !== null){
      setSearchGDrive(gDriveLinkVar.replace("/view?usp=sharing", "/preview?t=" + seconds.start))
    }
    console.log(searchGDrive);
  }

  const displayTranscripts = () => {
    if (transcriptFlag) {
      if (transcriptFromAPI !== null) {
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
      else {
        return (
          <Grid item xs>
            <Paper className={classes.paper}>
            <LinearProgress />
              <div className={classes.topSpacing10}>
              <strong>
                  Transcript
                </strong>
              </div>
            </Paper>
          </Grid>
        )
      }
    }
    else {
      return null;
    }
  }

  const displaySummary = () => {
    if (summaryFlag) {
      if (summaryFromAPI !== null) {
        return (<Grid item xs>
          <Paper className={classes.paper}>
            <div>
              <strong>
                Summary
                  </strong>
            </div>
            <div className={classes.topSpacing10}>
              {summaryFromAPI}
            </div>
          </Paper>
        </Grid>)
      }
      else {
        return (
          <Grid item xs>
            <Paper className={classes.paper}>
            <LinearProgress />
              <div className={classes.topSpacing10}>
              <strong>
                  Summary
                  </strong>
              </div>
            </Paper>
          </Grid>
        )
      }

    }
    else {
      return null;
    }
  }

  const displayMCQS = () => {
    if (mcqFlag) {
      if (mcqDataFromAPI !== null) {
        return (<Grid item xs>
          <Paper className={classes.paper}>
            <div>
              <strong>
                MCQs
                </strong>
            </div>
            <div>
              <Quiz mcqData={mcqDataFromAPI} />
            </div>
          </Paper>
        </Grid>)
      }
      else {
        return (
          <Grid item xs>
            <Paper className={classes.paper}>
            <LinearProgress />
              <div className={classes.topSpacing10}>
              <strong>
                  MCQS
                  </strong>
              </div>
            </Paper>
          </Grid>
        )

      }
    }
    else {
      return null;
    }
  }

  const displayIR = () => {
    if (!irFlag) {
      return null;
    }
    else {
    }
  }

  const displayGallery = () => {
    if (galleryFlag) {
      if (galleryDataFromAPI !== null) {
        return (<Grid item xs>
          <Paper className={classes.paper}>
            <div>
              <strong>
                Gallery
              </strong>
            </div>
            <div className={classes.fullWidthElement}>
              <SimpleReactLightbox>
                <SRLWrapper>
                <Grid container>     
                {
                  galleryDataFromAPI.map(
                      each_url => (    
                  <Grid item>
                    <img src={each_url} width="640" height="280" ></img>
                  </Grid>
                  ))
                }
                </Grid>
                </SRLWrapper>
              </SimpleReactLightbox>
            </div>
          </Paper>
        </Grid>)
      }
      else {
        return (
          <Grid item xs>
            <Paper className={classes.paper}>
              <LinearProgress />
              <div>
                
              </div>
              <div className={classes.topSpacing10}>
              <strong>
                  Gallery
                </strong>
              </div>
            </Paper>
          </Grid>
        )
      }
    }
    else {
      return null;
    }
  }

  const displayNavBar = () =>{
    if(processButtonClicked){
      if(videoInfoShown){
        return(
          <div >
          <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justify="center"
          >
            <Grid item className={classes.bottom}>
              <div>
                {displayAlert()}
              </div>
              <div>
                <BottomNavigation
                  disabled={disableProcessButton} 
                  value={bottomNavValue}
                  onChange={(event, newValue) => {
                    setBottomNavValue(newValue);
                  }}
                  showLabels
                  className={classes.root}
                >
                  <BottomNavigationAction label="Notes" icon={<ReceiptSharpIcon />}  ref={notesClickRef} onClick={showNotes} />
                  <BottomNavigationAction label="MCQs" icon={<QuestionAnswerSharpIcon />} onClick={showMCQ} />
                  <BottomNavigationAction label="IR" icon={<SearchSharpIcon />} onClick={showIR} />
                  <BottomNavigationAction label="Gallery" icon={<PhotoLibrarySharpIcon />} onClick={showGallery} />
                </BottomNavigation>
              </div>
  
            </Grid>
  
          </Grid>
        </div>
        )
      }
      else
      {
        return(
           <div className={classes.bottom1}>
             <div>
                {displayAlert()}
              </div>
            </div>
          )
      }
    }
    else{
      return(
        <div className={classes.bottom}>
          {displayAlert()}
        </div>
      )
    }
 
  }

  const displayMainLoading = () =>{
    if(displayMainLoadingFlag){
      return (
        <LinearProgress></LinearProgress>
      )
    }
  }


  const setAllFalse = (reProcess = false) => {
    setGDriveBoxFlag(true);
    setVideoInformationFlag(true);
    if (reProcess === true) {
      setVideoInformationFlag(false);
      setVideoInfoShown(false);
    }
    setTranscriptFlag(false)
    setSummaryFlag(false);
    setMCQFlag(false);
    setIRFlag(false);
    setIRSearchFlag(false);
    setGalleryFlag(false);
  }

  const showGDriveBox = () => {
    setAllFalse();
    setGDriveBoxFlag(true);
  }

  const showVideoInformation = () => {
    //if(processButtonClicked === true){
    console.log("Show video info reached")
    setAllFalse();
    setVideoInformationFlag(true);
    //}
  }

  const showNavBar = () => {
    setAllFalse();
    setVideoInfoShown(true);
  }

  const showNotes = () => {
      setAllFalse();
      setTranscriptFlag(true);
      setSummaryFlag(true);
      if ((s2t_v2t_done_flag) && (summaryFromAPI === null)) {
        if (summaryPostCalled === false) {
          call_POST_Summarize_post(fileID);
          setSummaryPostCalled(true);
        }
        else {
          poll_call_GET_Summarize_get(fileID);
        }
      }
    
  }


  const showMCQ = () => {
    
      setAllFalse();
      setMCQFlag(true);
      if ((s2t_v2t_done_flag) && (mcqDataFromAPI === null)) {
        if (mcqPostCalled === false) {
          call_POST_mcq_generator_post(fileID);
          setMcqPostCalled(true);
        }
        else {
          poll_call_GET_Mcq_get(fileID);
        }
      }
  
  }

  const showIR = () => {  
      setAllFalse();
      setIRFlag(true);
      setIRSearchFlag(true);
      // if(!videoInfoExpanded){
      //   expandVideoInfo.current.click();
      // }
      //showVideoInformation();
    
  }

  const showGallery = () => {    
      setAllFalse();
      setGalleryFlag(true);
      if ((s2t_v2t_done_flag) && (galleryDataFromAPI === null)) {
        if (galleryPostCalled === false) {
          call_POST_Gallery_post(fileID);
          setGalleryPostCalled(true);
        }
      }

  }

  const setAlert = () => {
    setAlertFlag(true);
    setOpenAlert(true);
  }

  return (
    <div>
      <div>
        <h1><strong>Start deep-read</strong></h1>
      </div>

      <div className={classes.topSpacing30}>
        <Grid container spacing={3}>
          {displayGDrivebox()}
        </Grid>
      </div>

      <div>
        {displayVideoInformation()}
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

      {displayNavBar()}

    </div>
  );
}

export default StartDeepRead;