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
import CircularProgress from '@material-ui/core/CircularProgress';
import config from '../config.json'


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
  paper1: {
    position:"fixed",
    bottom:0,
    width:"100%",
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
    marginTop: '15px'
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
  fontSize20: {
    fontSize: "20px"
  },
  rightTop:{
    position:"relative",
    float:"right",
  },
  parentClass:{
    height:"100%"
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
  var tmpMcqs = {};


  const baseURL = config.baseURL;


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
    if ((gDriveLinkVar !== '')) {
      console.log(baseURL + "files/gdrive/"+gDriveLinkVar+" POST Called");
      axios.post(baseURL + 'files/g-drive/' + gDriveLinkVar, {
      }).then((responseData) => {
        console.log(baseURL + "files/gdrive/"+gDriveLinkVar+" POST Success");
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
        console.log(baseURL + "files/gdrive/"+gDriveLinkVar+" POST Error");
        console.log(error)
        setAlertMSG(baseURL + "files/gdrive/"+gDriveLinkVar+" POST Error")
        setAlert();
        setDisplayMainLoadingFlag(false);
        setDisableProcessButton(false);
      });
    }
  }

  const call_POST_speech_post = (id) => {
    if ((id !== null) && (model !== '')) {
      console.log(baseURL + 'speech/post/' + id + '&' + model + " POST Called");
      axios.post(baseURL + 'speech/post/' + id + '&' + model, {
      }).then((responseData) => {
        console.log(baseURL + 'speech/post/' + id + '&' + model + " POST Success");
        console.log(responseData)
        poll_call_GET_speech_get(responseData.data.id);
      }).catch(error => {
        console.log(baseURL + 'speech/post/' + id + '&' + model + " POST Error");
        console.log(error)
        setAlertMSG(baseURL + 'speech/post/' + id + '&' + model + " POST Error")
        setAlert();
        setDisplayMainLoadingFlag(false);
        setDisableProcessButton(false);
      });

    }
  }

  const poll_call_GET_speech_get = (id) => {
    const api_call_GET_speech_get = new Request(baseURL + 'speech/get/' + id);
    console.log(baseURL + 'speech/get/' + id + ' GET poll Called')
    api_call_GET_speech_get.poll(7000).get((response) => {
      if (response.data.status === "Success") {
        console.log('speech/get/' + id + ' GET Success')
        console.log(response);
        setTranscriptFromAPI(response.data.transcript.transcript);
        setTranscriptTimeFromAPI(response.data.transcript.transcript_times);
        poll_call_GET_v2t_get(id);
        return false;
      }
    }).catch(error => {
      console.log(baseURL + 'speech/get/' + id + ' GET Error')
      console.log(error);
      setAlertMSG(baseURL + 'speech/get/' + id + ' GET Error')
      setAlert();
      setDisplayMainLoadingFlag(false);
      setDisableProcessButton(false);
    });
  }

  const call_POST_v2t_post = (id) => {
    if (id !== null) {
      console.log(baseURL + 'VideotoTextConverter/post/' + id + ' POST Called')
      axios.post(baseURL + 'VideotoTextConverter/post/' + id, {
      }).then((responseData) => {
        console.log(baseURL + 'VideotoTextConverter/post/' + id + ' POST Success')
        console.log(responseData)
      }).catch(error => {
        console.log(baseURL + 'VideotoTextConverter/post/' + id + ' POST Error')
        console.log(error)
        setAlertMSG(baseURL + 'VideotoTextConverter/post/' + id + ' POST Error')
        setAlert();
        setDisplayMainLoadingFlag(false);
        setDisableProcessButton(false);
      });

    }

  }

  const poll_call_GET_v2t_get = (id) => {
    const api_call_GET_v2t_get = new Request(baseURL + 'VideotoTextConverter/get/' + id);
    console.log(baseURL + 'VideotoTextConverter/get/' + id + ' GET poll Called')
    api_call_GET_v2t_get.poll(7000).get((response) => {
      if (response.data.status === "Success") {
        console.log(baseURL + 'VideotoTextConverter/get/' + id + ' GET poll Success')
        console.log(response)
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
      console.log(baseURL + 'VideotoTextConverter/get/' + id + ' GET poll Error')
      console.log(error);
      setAlertMSG(baseURL + 'VideotoTextConverter/get/' + id + ' GET poll Error')
      setAlert();
      setDisplayMainLoadingFlag(false);
      setDisableProcessButton(false);
    });

  }

  const call_POST_Summarize_post = (id) => {
    if (id !== null) {
      console.log(baseURL + 'summarizer/post/' + id + ' POST Called')
      axios.post(baseURL + 'summarizer/post/' + id, {
      }).then((responseData) => {
        console.log(baseURL + 'summarizer/post/' + id + ' POST Success')
        console.log(responseData)
        poll_call_GET_Summarize_get(id);
      }).catch(error => {
        setSummaryPostCalled(false);
        console.log(baseURL + 'summarizer/post/' + id + ' POST Error')
        console.log(error)
        setAlertMSG(baseURL + 'summarizer/post/' + id + ' POST Error')
        setAlert();
      });
    }
  }

  const poll_call_GET_Summarize_get = (id) => {
    const api_call_GET_summarizer_get = new Request(baseURL + 'summarizer/get/' + id);
    console.log(baseURL + 'summarizer/get/' + id + ' GET poll Called')
    api_call_GET_summarizer_get.poll(7000).get((response) => {
      if (response.data.status === "Success") {
        console.log(baseURL + 'summarizer/get/' + id + ' GET poll Success')
        console.log(response)
        setSummaryFromAPI(response.data.summary)
        return false;
      }
    }).catch(error => {
      console.log(baseURL + 'summarizer/get/' + id + ' GET poll Error')
      console.log(error);
      setAlertMSG(baseURL + 'summarizer/get/' + id + ' GET poll Error')
      setAlert();
    });
  }

  const call_POST_mcq_generator_post = (id) => {
    if ((id !== null)) {
      console.log(baseURL + 'mcq_generator/post/' + id + ' POST Called')
      axios.post(baseURL + 'mcq_generator/post/' + id, {
      }).then((responseData) => {
        console.log(baseURL + 'mcq_generator/post/' + id + ' POST Success')
        console.log(responseData);
        poll_call_GET_Mcq_get(id)
      }).catch(error => {
        setMcqPostCalled(false);
        console.log(baseURL + 'mcq_generator/post/' + id + ' POST Error')
        console.log(error)
        setAlertMSG(baseURL + 'mcq_generator/post/' + id + ' POST Error')
        setAlert();
      });
    }
  }

  const poll_call_GET_Mcq_get = (id) => {
    const api_call_GET_mcq_get = new Request(baseURL + 'mcq_generator/get/' + id);
    console.log(baseURL + 'mcq_generator/get/' + id + ' GET poll Called')
    api_call_GET_mcq_get.poll(7000).get((response) => {
      if (response.data.status === "Success") {
        console.log(baseURL + 'mcq_generator/get/' + id + ' GET poll Success')
        console.log(response)
        tmpMcqs = response.data.mcqs
        tmpMcqs["correctAnswer"] = 0;
        tmpMcqs["clickedAnswer"] = 0;
        tmpMcqs["step"] = 1;
        tmpMcqs["score"] = 0;
        setMcqDataFromAPI(tmpMcqs)
        return false;
      }
    }).catch(error => {
      console.log(baseURL + 'mcq_generator/get/' + id + ' GET poll Error')
      console.log(error);
      setAlertMSG(baseURL + 'mcq_generator/get/' + id + ' GET poll Error')
      setAlert();
    });
  }

  const call_POST_Gallery_post = (id) => {
    if ((id !== null)) {
      console.log(baseURL + 'gallery/post/' + id + ' POST Called')
      axios.post(baseURL + 'gallery/post/' + id, {
      }).then((responseData) => {
        console.log(baseURL + 'gallery/post/' + id + ' POST Success')
        console.log(responseData);
        setGalleryDataFromAPI(responseData.data)
      }).catch(error => {
        setGalleryPostCalled(false);
        console.log(baseURL + 'gallery/post/' + id + ' POST Error')
        console.log(error)
        setAlertMSG(baseURL + 'gallery/post/' + id + ' POST Error')
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
          <Grid container spacing={1}>
            <Grid item>
              <div><h1><strong>Start deep-read</strong></h1></div>
            </Grid>
            <Grid item xs>
              {displayMainLoading()}
            </Grid>
          </Grid>
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
      if(!irFlag){
      return (
        <Accordion className={classes.accordian} variant="outlined">
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
           <Grid container spacing={1}>
            <Grid item>
              <div><h1><strong>Video Information</strong></h1></div>
            </Grid>
            <Grid item>
            </Grid>
          </Grid>
          </AccordionSummary>
          <AccordionDetails className={classes.fullWidthElement}>
            <Grid container spacing={2}>
              <Grid item xs="8">
                <div>
                  <iframe title="Video" height="600px" width="100%" src={searchGDrive}></iframe>
                </div>
              </Grid>
              <Grid item  xs="4">
                <div> 
                  <div className={classes.fontSize20}><b>Video Name:</b> {videoNameFromAPI}</div>
                  <div>
                  <div className={classes.topSpacing20}></div>
                  <div className={classes.fontSize20}><b>Video Size:</b> {videoSizeFromAPI}</div>
                  </div>
                </div>               
              </Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>
      )
      }
      else{
        return(
          <Paper className={classes.paper} variant="outlined">
            <Grid container spacing={1}>
              <Grid item>
                <div><h1><strong>Search</strong></h1></div>
              </Grid>
              <Grid item>
                {displayVideoInfoLoading()}
              </Grid>
            </Grid>
            <div className={classes.topSpacing20}>
            <Grid container spacing={2} className={classes.fullWidthElement}>
              <Grid item xs="8">
                <div>
                  {displaySearchBoxForIR()}
                  <iframe title="Video" height="600px" width="100%" src={searchGDrive}></iframe>
                </div>
              </Grid>
              <Grid item  xs="4">
                <div> 
                  <div className={classes.fontSize20}><b>Video Name:</b> {videoNameFromAPI}</div>
                  <div>
                  <div className={classes.topSpacing20}></div>
                  <div className={classes.fontSize20}><b>Video Size:</b> {videoSizeFromAPI}</div>
                  </div>
                </div>               
              </Grid>
            </Grid>
            </div>
          </Paper>
        )
      }
    }
  }

  const displayVideoInfoLoading = () => {
    if(irFlag){
      if(transcriptTimeFromAPI === null){
        return(
          <CircularProgress></CircularProgress>
        )
      }
    }
  }


  const displaySearchBoxForIR = () => {
    if (irFlag) {
      if (transcriptTimeFromAPI !== null) {
        return (<div>
          <Autocomplete
          id="combo-box-demo"
          options={transcriptTimeFromAPI}
          getOptionLabel={(option) => option.word}
          onChange={(event, value) => setSearchGDriveValue(value)}
          renderInput={(params) => <TextField {...params} label="Search" variant="outlined" />}
        />
        <div className={classes.topSpacing20}></div>
        </div>)
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
            <Grid container spacing={1}>
              <Grid item>
                <div><h1><strong>Transcript</strong></h1></div>
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
              <Grid container spacing={1}>
                <Grid item>
                  <div><h1><strong>Summary</strong></h1></div>
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

  const displayMCQS = () => {
    if (mcqFlag) {
      if (mcqDataFromAPI !== null) {
        return (<Grid item xs>
          <Paper className={classes.paper} variant="outlined">
          <div><h1><strong>Quiz</strong></h1></div>
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
            <Grid container spacing={1}>
              <Grid item>
                <div><h1><strong>MCQs</strong></h1></div>
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
                  <Grid container spacing={2}>
                    {
                      galleryDataFromAPI.map(
                        each_url => (
                          <Grid item>
                            <img src={each_url} width="300" height="250" alt="Video screenshots"></img>
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
        <Paper className={classes.paper1}>
        <Grid container>
          <Grid item xs>
            {displayAlert()}
          </Grid>
        </Grid>
        </Paper>
      )
    }

  }

  const displayMainLoading = () => {
    if (displayMainLoadingFlag) {
      return (
        <CircularProgress></CircularProgress>
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
    <div className={classes.parentClass}>
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