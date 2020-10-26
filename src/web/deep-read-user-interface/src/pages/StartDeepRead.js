import { makeStyles, Paper, Grid, Button, TextField } from '@material-ui/core';
import React from 'react';
import ThreeSixtyIcon from '@material-ui/icons/ThreeSixty';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import ReceiptSharpIcon from '@material-ui/icons/ReceiptSharp';
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
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import LinearProgress from '@material-ui/core/LinearProgress';
import CircularProgress from '@material-ui/core/CircularProgress';

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
    borderColor: '#000000',
    margin: `${theme.spacing(1)}px auto`,
    padding: theme.spacing(2),
  },
  accordian: {
    borderColor: '#000000',
    background: '#f5f5f5',
  },
  topSpacing20: {
    marginTop: '10px'
  },
  topSpacing10: {
    marginTop: '10px'
  },
  topSpacing30: {
    marginTop: '30px',
  },
  fullWidthElement: {
    width: '100%'
  },
  bottom: {
    position: "fixed",
    bottom: "0",
    left: "0",
    width: "100%",
  },
  bottomPadding: {
    paddingBottom: "50px",
  },
  border: {
    border: '2px solid black'
  },
  fontSize20: {
    fontSize: "20px"
  }
}));

function StartDeepRead() {

  const classes = useStyles();
  const [gDriveLinkVar, setGDriveLinkVar] = React.useState('');
  const [model, setModel] = React.useState('');
  const [bottomNavValue, setBottomNavValue] = React.useState(false);
  const [videoInformationFlag, setVideoInformationFlag] = React.useState(false);
  const [transcriptFlag, setTranscriptFlag] = React.useState(false);
  const [summaryFlag, setSummaryFlag] = React.useState(false);
  const [summaryPostCalled, setSummaryPostCalled] = React.useState(false);
  const [mcqFlag, setMCQFlag] = React.useState(false);
  const [mcqPostCalled, setMcqPostCalled] = React.useState(false);
  const [irFlag, setIRFlag] = React.useState(false);
  const [galleryFlag, setGalleryFlag] = React.useState(false);
  const [galleryPostCalled, setGalleryPostCalled] = React.useState(false);
  const [videoNameFromAPI, setVideoNameFromAPI] = React.useState(null);
  const [videoSizeFromAPI, setVideoSizeFromAPI] = React.useState(null);
  const [transcriptFromAPI, setTranscriptFromAPI] = React.useState(null);
  const [summaryFromAPI, setSummaryFromAPI] = React.useState(null);
  const [alertFlag, setAlertFlag] = React.useState(false);
  const [alertMSG, setAlertMSG] = React.useState('');
  const [openAlert, setOpenAlert] = React.useState(true);
  const [transcriptTimeFromAPI, setTranscriptTimeFromAPI] = React.useState(null);
  const [processButtonClicked, setProcessButtonClicked] = React.useState(false);
  const [mcqDataFromAPI, setMcqDataFromAPI] = React.useState(null);
  const [galleryDataFromAPI, setGalleryDataFromAPI] = React.useState(null);
  const [s2tV2tDoneFlag, setS2tV2tDoneFlag] = React.useState(false);
  const [fileID, setFileID] = React.useState(null);
  const [searchGDrive, setSearchGDrive] = React.useState(null);
  const [disableProcessButton, setDisableProcessButton] = React.useState(false);
  const [videoInfoShown, setVideoInfoShown] = React.useState(false);
  const [displayMainLoadingFlag, setDisplayMainLoadingFlag] = React.useState(false);
  const notesClickRef = React.useRef(null);
  var tmpMcqs = {}


  const baseURL = "http://127.0.0.1:5000/"


  const updateGDriveTextBox = (e) => {
    setGDriveLinkVar(e.target.value);
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
    var urlValid = gDriveLinkVar.match(/(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi);
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
          setDisplayMainLoadingFlag(false);
          setSearchGDrive((gDriveLinkVar).replace("/view?usp=sharing", "/preview"));
          setVideoNameFromAPI(responseData.data.filename);
          setVideoSizeFromAPI(responseData.data.size);
          showVideoInformation();
          showNavBar();
          notesClickRef.current.click();
          setFileID(responseData.data.id);
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
    api_call_GET_speech_get.poll(7000).get((response) => {
      console.log("poll_call_GET_speech_get started")
      console.log(response);
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
    api_call_GET_v2t_get.poll(7000).get((response) => {
      console.log("poll_call_GET_v2t_get started")
      console.log(response)
      if (response.data.status === "Success") {
        setS2tV2tDoneFlag(true);
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
    api_call_GET_summarizer_get.poll(7000).get((response) => {
      console.log("poll_call_GET_Summarize_get started")
      console.log(response);
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
    api_call_GET_mcq_get.poll(7000).get((response) => {
      console.log("poll_call_GET_Mcq_get started")
      console.log(response);
      if (response.data.status === "Success") {
        tmpMcqs = response.data.mcqs
        tmpMcqs["correctAnswer"] = 0;
        tmpMcqs["clickedAnswer"] = 0;
        tmpMcqs["step"] = 1;
        tmpMcqs["score"] = 0;
        setMcqDataFromAPI(tmpMcqs)
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
    if (!alertFlag) {
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
    return (
      <Grid item xs>
        <Paper className={classes.paper} variant="outlined">
          <div>
            {displayMainLoading()}
          </div>
          <div>
            <h1><strong>Start deep-read</strong></h1>
          </div>
          <Grid container spacing={2} className={classes.topSpacing20}>
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
            <Button variant="outlined" disabled={disableProcessButton} className={classes.fullWidthElement} startIcon={<ThreeSixtyIcon />} label="Process" onClick={sendGDriveLinkAPI}>
              Process
          </Button>
          </div>
        </Paper>
      </Grid>)
  }

  const displayVideoInformation = () => {
    if (!videoInformationFlag) {
      return null;
    }
    else {
      return (
        <Accordion className={classes.accordian} variant="outlined" defaultExpanded>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
          <div><h1><strong>Video</strong></h1></div>
          </AccordionSummary>
          <AccordionDetails className={classes.fullWidthElement}>
            <div className={classes.fullWidthElement}>
              <div className={classes.fontSize20}><b>Video Name:</b> {videoNameFromAPI}</div>
              <div>
              <div className={classes.fontSize20}><b>Video Size:</b> {videoSizeFromAPI}</div>
              </div>
              <div className={classes.topSpacing10}>
              <div className={classes.fontSize20}>{displaySearchBoxForIR()}</div>
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
    if (irFlag) {
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
    if (seconds !== null) {
      setSearchGDrive(gDriveLinkVar.replace("/view?usp=sharing", "/preview?t=" + seconds.start))
    }
  }

  const displayTranscripts = () => {
    if (transcriptFlag) {
      if (transcriptFromAPI !== null) {
        return (<Grid item xs>
          <Paper className={classes.paper} variant="outlined">
          <div><h1><strong>Transcript</strong></h1></div>
            <div className={classes.topSpacing20}>
               <div className={classes.fontSize20}>{transcriptFromAPI}</div>
            </div>
          </Paper>
        </Grid>)
      }
      else {
        return (
          <Grid item xs>
            <Paper className={classes.paper} variant="outlined">
              <LinearProgress />
              <div><h1><strong>Transcript</strong></h1></div>
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
          <Paper className={classes.paper} variant="outlined">
            <div><h1><strong>Summary</strong></h1></div>
            <div className={classes.topSpacing20}>
            <div className={classes.fontSize20}>{summaryFromAPI}</div>
            </div>
          </Paper>
        </Grid>)
      }
      else {
        return (
          <Grid item xs>
            <Paper className={classes.paper} variant="outlined">
              <LinearProgress />
              <div><h1><strong>Summary</strong></h1></div>
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
          <Paper className={classes.paper} variant="outlined">
          <div><h1><strong>MCQs</strong></h1></div>
            <div className={classes.topSpacing20}>
              <Quiz mcqData={mcqDataFromAPI} />
            </div>
          </Paper>
        </Grid>)
      }
      else {
        return (
          <Grid item xs>
            <Paper className={classes.paper} variant="outlined">
              <LinearProgress />
              <div><h1><strong>MCQs</strong></h1></div>
            </Paper>
          </Grid>
        )

      }
    }
    else {
      return null;
    }
  }


  const displayGallery = () => {
    if (galleryFlag) {
      if (galleryDataFromAPI !== null) {
        return (<Grid item xs>
          <Paper className={classes.paper} variant="outlined">
          <div><h1><strong>Gallery</strong></h1></div>
            <div className={classes.topSpacing20}>
            <div className={classes.fullWidthElement}>
              <SimpleReactLightbox>
                <SRLWrapper>
                  <Grid container spacing={3}>
                    {
                      galleryDataFromAPI.map(
                        each_url => (
                          <Grid item>
                            <img src={each_url} width="640" height="280" alt="Video screenshots"></img>
                          </Grid>
                        ))
                    }
                  </Grid>
                </SRLWrapper>
              </SimpleReactLightbox>
            </div>
            </div>
          </Paper>
        </Grid>)
      }
      else {
        return (
          <Grid item xs>
            <Paper className={classes.paper} variant="outlined">
              <Grid container spacing={1}>
                <Grid item>
                  <div><h1><strong>Gallery</strong></h1></div>
                </Grid>
                <Grid item>
                  <CircularProgress></CircularProgress>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        )
      }
    }
    else {
      return null;
    }
  }

  const displayNavBar = () => {
    if (processButtonClicked) {
      if (videoInfoShown) {
        return (
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
                    <BottomNavigationAction label="Notes" icon={<ReceiptSharpIcon />} ref={notesClickRef} onClick={showNotes} />
                    <BottomNavigationAction label="MCQs" icon={<QuestionAnswerSharpIcon />} onClick={showMCQ} />
                    <BottomNavigationAction label="Search" icon={<SearchSharpIcon />} onClick={showIR} />
                    <BottomNavigationAction label="Gallery" icon={<PhotoLibrarySharpIcon />} onClick={showGallery} />
                  </BottomNavigation>
                </div>

              </Grid>

            </Grid>
          </div>
        )
      }
      else {
        return (
          <div className={classes.bottom}>
            <div>
              {displayAlert()}
            </div>
          </div>
        )
      }
    }
    else {
      return (
        <div className={classes.bottom}>
          {displayAlert()}
        </div>
      )
    }

  }

  const displayMainLoading = () => {
    if (displayMainLoadingFlag) {
      return (
        <LinearProgress></LinearProgress>
      )
    }
  }


  const setAllFalse = (reProcess = false) => {
    setVideoInformationFlag(true);
    if (reProcess === true) {
      setBottomNavValue(false);
      setVideoInformationFlag(false);
      setTranscriptFlag(false);
      setSummaryFlag(false);
      setSummaryPostCalled(false);
      setMCQFlag(false);
      setMcqPostCalled(false);
      setIRFlag(false);
      setGalleryFlag(false);
      setGalleryPostCalled(false);
      setVideoNameFromAPI(null);
      setVideoSizeFromAPI(null);
      setTranscriptFromAPI(null);
      setSummaryFromAPI(null);
      setAlertFlag(false);
      setAlertMSG('');
      setOpenAlert(false);
      setTranscriptTimeFromAPI(null);
      setProcessButtonClicked(false);
      setMcqDataFromAPI(null);
      setGalleryDataFromAPI(null);
      setS2tV2tDoneFlag(false);
      setFileID(null);
      setSearchGDrive(null);
      setDisableProcessButton(false);
      setVideoInfoShown(false);
      setDisplayMainLoadingFlag(false);
      tmpMcqs = {};
    }
    setTranscriptFlag(false)
    setSummaryFlag(false);
    setMCQFlag(false);
    setIRFlag(false);
    setGalleryFlag(false);
  }


  const showVideoInformation = () => {
    setAllFalse();
    setVideoInformationFlag(true);
  }

  const showNavBar = () => {
    setAllFalse();
    setVideoInfoShown(true);
  }

  const showNotes = () => {
    setAllFalse();
    setTranscriptFlag(true);
    setSummaryFlag(true);
    if ((s2tV2tDoneFlag) && (summaryFromAPI === null)) {
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
    if ((s2tV2tDoneFlag) && (mcqDataFromAPI === null)) {
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
  }

  const showGallery = () => {
    setAllFalse();
    setGalleryFlag(true);
    if ((s2tV2tDoneFlag) && (galleryDataFromAPI === null)) {
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
        <Grid container spacing={3}>
          {displayGDrivebox()}
        </Grid>
      </div>

      <div className={classes.topSpacing30}>
        {displayVideoInformation()}
      </div>

      <div className={classes.topSpacing30}>
      <div className={classes.bottomPadding}>
        <Grid container spacing={3}>
          {displayTranscripts()}
          {displaySummary()}
          {displayMCQS()}
          {displayGallery()}
        </Grid>
      </div>
      </div>

      {displayNavBar()}

    </div>
  );
}

export default StartDeepRead;