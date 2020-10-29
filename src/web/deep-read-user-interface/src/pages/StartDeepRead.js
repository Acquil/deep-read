import { makeStyles, Paper, Grid, Button, TextField } from '@material-ui/core';
import React from 'react';
import ThreeSixtyIcon from '@material-ui/icons/ThreeSixty';
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
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Skeleton from '@material-ui/lab/Skeleton';
import Backdrop from '@material-ui/core/Backdrop';
import SpeedDial from '@material-ui/lab/SpeedDial';
import KeyboardArrowUpSharpIcon from '@material-ui/icons/KeyboardArrowUpSharp';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import Tooltip from '@material-ui/core/Tooltip';
import DehazeSharpIcon from '@material-ui/icons/DehazeSharp';


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexGrow: 1,
    background:"black"

  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
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
    marginTop: '15px'
  },
  topSpacing10: {
    marginTop: '10px'
  },
  topSpacing5: {
    marginTop: '5px'
  },
  topSpacing30: {
    marginTop: '30px',
  },
  fullWidthElement: {
    width: '100%'
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
    height:"100%",
  },
  speedDial: {
    position: "fixed",
    bottom: "0",
    right: "10px",
    margin: `${theme.spacing(1)}px auto`,
    padding: theme.spacing(2),
  },
  scrollIcon:{
    position: "fixed",
    bottom: "0",
    left: "0",
    margin: `${theme.spacing(1)}px auto`,
    padding: theme.spacing(2),
  }

}));


function StartDeepRead() {

  const classes = useStyles();
  const [gDriveLinkVar, setGDriveLinkVar] = React.useState('');
  const [model, setModel] = React.useState('');
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
  const [alertMSG, setAlertMSG] = React.useState('');
  const [transcriptTimeFromAPI, setTranscriptTimeFromAPI] = React.useState(null);
  const [mcqDataFromAPI, setMcqDataFromAPI] = React.useState(null);
  const [galleryDataFromAPI, setGalleryDataFromAPI] = React.useState(null);
  const [s2tV2tDoneFlag, setS2tV2tDoneFlag] = React.useState(false);
  const [fileID, setFileID] = React.useState(null);
  const [searchGDrive, setSearchGDrive] = React.useState(null);
  const [disableProcessButton, setDisableProcessButton] = React.useState(false);
  const [displayMainLoadingFlag, setDisplayMainLoadingFlag] = React.useState(false);
  var tmpMcqs = {};
  const [errorSnackBarOpen, setErrorSnackBarOpen] = React.useState(false);
  const [searchLoadingFlag, setSearchLoadingFlag] = React.useState(false);
  const [transcriptLoadingFlag, setTranscriptLoadingFlag] = React.useState(false);
  const [summaryLoadingFlag, setSummaryLoadingFlag] = React.useState(false);
  const [mcqLoadingFlag, setMcqLoadingFlag] = React.useState(false);
  const [galleryLoadingFlag, setGalleryLoadingFlag] = React.useState(false);
  const [successSnackBarOpen, setSuccessSnackBarOpen] = React.useState(false);
  const [openSpeedDial, setOpenSpeedDial] = React.useState(false);
  const [hiddenSpeedDial, setHiddenSpeedDial] = React.useState(true);
  const [successAlertMSG, setSuccessAlertMSG] = React.useState('');

  const baseURL = config.baseURL;

  const scrollToTop = () => {
    document.documentElement.scrollTop = 0;
  }

  const updateGDriveTextBox = (e) => {
    setGDriveLinkVar(e.target.value);
  }

  const handleModelChange = (event) => {
    setModel(event.target.value);
  };

  const sendGDriveLinkAPI = () => {
    setAllFalse(true)
    if (gDriveLinkVar === '') {
      displayErrorSnackBar("Please enter Google Drive Link!");
      return;
    }
    var urlValid = gDriveLinkVar.match(/(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi);
    if (urlValid == null) {
      displayErrorSnackBar("Please enter a VALID Google Drive Link!");
      return;
    }
    if (model === '') {
      displayErrorSnackBar("Please select a language!");
      return;
    }
    setDisableProcessButton(true);
    setDisplayMainLoadingFlag(true);
    setSearchLoadingFlag(true);
    setTranscriptLoadingFlag(true);
    setSummaryLoadingFlag(true);
    setMcqLoadingFlag(true);
    setGalleryLoadingFlag(true);
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
          displaySuccessSnackBar("Process Started");
          setHiddenSpeedDial(false);
          setDisplayMainLoadingFlag(false);
          setSearchGDrive((gDriveLinkVar).replace("/view?usp=sharing", "/preview"));
          setVideoNameFromAPI(responseData.data.filename);
          setVideoSizeFromAPI(responseData.data.size);
          showVideoInformation();
          showNotes();
          setFileID(responseData.data.id);
          call_POST_speech_post(responseData.data.id);
          call_POST_v2t_post(responseData.data.id);
        }
      }).catch(error => {
        console.log(baseURL + "files/gdrive/"+gDriveLinkVar+" POST Error");
        console.log(error)
        displayErrorSnackBar(baseURL + "files/gdrive/"+gDriveLinkVar+" POST Error")
        setDisplayMainLoadingFlag(false);
        setDisableProcessButton(false);
        setSearchLoadingFlag(false);
        setTranscriptLoadingFlag(false);
        setSummaryLoadingFlag(false);
        setMcqLoadingFlag(false);
        setGalleryLoadingFlag(false);
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
        displayErrorSnackBar(baseURL + 'speech/post/' + id + '&' + model + " POST Error")
        setDisableProcessButton(false);
        setSearchLoadingFlag(false);
        setTranscriptLoadingFlag(false);
        setSummaryLoadingFlag(false);
        setMcqLoadingFlag(false);
        setGalleryLoadingFlag(false);
      });

    }
  }

  const poll_call_GET_speech_get = (id) => {
    const api_call_GET_speech_get = new Request(baseURL + 'speech/get/' + id);
    console.log(baseURL + 'speech/get/' + id + ' GET poll Called')
    api_call_GET_speech_get.poll(7000).get((response) => {
      if (response.data.status === "Success") {
        displaySuccessSnackBar("Transcript recieved!")
        console.log('speech/get/' + id + ' GET Success')
        console.log(response);
        setTranscriptFromAPI(response.data.transcript.transcript);
        setTranscriptTimeFromAPI(response.data.transcript.transcript_times);
        setSearchLoadingFlag(false);
        setTranscriptLoadingFlag(false);
        poll_call_GET_v2t_get(id);
        return false;
      }
    }).catch(error => {
      console.log(baseURL + 'speech/get/' + id + ' GET Error')
      console.log(error);
      displayErrorSnackBar(baseURL + 'speech/get/' + id + ' GET Error')
      setDisableProcessButton(false);
      setSearchLoadingFlag(false);
      setTranscriptLoadingFlag(false);
      setSummaryLoadingFlag(false);
      setMcqLoadingFlag(false);
      setGalleryLoadingFlag(false);
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
        displayErrorSnackBar(baseURL + 'VideotoTextConverter/post/' + id + ' POST Error')
        setDisableProcessButton(false);
        setSummaryLoadingFlag(false);
        setMcqLoadingFlag(false);
        setGalleryLoadingFlag(false);
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
      displayErrorSnackBar(baseURL + 'VideotoTextConverter/get/' + id + ' GET poll Error')
      setDisableProcessButton(false);
      setSummaryLoadingFlag(false);
      setMcqLoadingFlag(false);
      setGalleryLoadingFlag(false);
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
        displayErrorSnackBar(baseURL + 'summarizer/post/' + id + ' POST Error')
        setSummaryLoadingFlag(false);
      });
    }
  }

  const poll_call_GET_Summarize_get = (id) => {
    const api_call_GET_summarizer_get = new Request(baseURL + 'summarizer/get/' + id);
    console.log(baseURL + 'summarizer/get/' + id + ' GET poll Called')
    api_call_GET_summarizer_get.poll(7000).get((response) => {
      if (response.data.status === "Success") {
        displaySuccessSnackBar("Summary recieved!")
        console.log(baseURL + 'summarizer/get/' + id + ' GET poll Success')
        console.log(response)
        setSummaryFromAPI(response.data.summary)
        setSummaryLoadingFlag(false);
        return false;
      }
    }).catch(error => {
      console.log(baseURL + 'summarizer/get/' + id + ' GET poll Error')
      console.log(error);
      displayErrorSnackBar(baseURL + 'summarizer/get/' + id + ' GET poll Error')
      setSummaryLoadingFlag(false);
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
        displayErrorSnackBar(baseURL + 'mcq_generator/post/' + id + ' POST Error')
        setMcqLoadingFlag(false);
      });
    }
  }

  const poll_call_GET_Mcq_get = (id) => {
    const api_call_GET_mcq_get = new Request(baseURL + 'mcq_generator/get/' + id);
    console.log(baseURL + 'mcq_generator/get/' + id + ' GET poll Called')
    api_call_GET_mcq_get.poll(7000).get((response) => {
      if (response.data.status === "Success") {
        displaySuccessSnackBar("MCQs recieved!")
        console.log(baseURL + 'mcq_generator/get/' + id + ' GET poll Success')
        console.log(response)
        tmpMcqs = response.data.mcqs
        tmpMcqs["correctAnswer"] = 0;
        tmpMcqs["clickedAnswer"] = 0;
        tmpMcqs["step"] = 1;
        tmpMcqs["score"] = 0;
        setMcqDataFromAPI(tmpMcqs)
        setMcqLoadingFlag(false);
        return false;
      }
    }).catch(error => {
      console.log(baseURL + 'mcq_generator/get/' + id + ' GET poll Error')
      console.log(error);
      displayErrorSnackBar(baseURL + 'mcq_generator/get/' + id + ' GET poll Error')
      setMcqLoadingFlag(false);
    });
  }

  const call_POST_Gallery_post = (id) => {
    if ((id !== null)) {
      console.log(baseURL + 'gallery/post/' + id + ' POST Called')
      axios.post(baseURL + 'gallery/post/' + id, {
      }).then((responseData) => {
        displaySuccessSnackBar("Screenshots recieved!")
        console.log(baseURL + 'gallery/post/' + id + ' POST Success')
        console.log(responseData);
        setGalleryDataFromAPI(responseData.data)
        setGalleryLoadingFlag(false);
      }).catch(error => {
        setGalleryPostCalled(false);
        console.log(baseURL + 'gallery/post/' + id + ' POST Error')
        console.log(error)
        displayErrorSnackBar(baseURL + 'gallery/post/' + id + ' POST Error')
        setGalleryLoadingFlag(false);
      });

    }
  }

  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  const displayErrorSnackBar = (msg) => {
    setAlertMSG(msg);
    setErrorSnackBarOpen(true);
  }

  const displaySuccessSnackBar = (msg)=> {
    setSuccessAlertMSG(msg);
    setSuccessSnackBarOpen(true);
  }

  const closeErrorSnackBar= (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setErrorSnackBarOpen(false);
  };

  const closeSuccessSnackBar= (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSuccessSnackBarOpen(false);
  };  

  const displayGDrivebox = () => {
    return (
      <Grid item xs>
          <Paper className={classes.paper} variant="outlined">
          <Grid container spacing={1}> 
            <Grid item>
                <div><h1><strong>Start deep-read</strong></h1></div>
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
          {showToolTipForDisabledProcessButton()}
        </Paper>
      </Grid>)
  }

  const showToolTipForDisabledProcessButton = () =>{
    if(disableProcessButton){
      return(
          <div className={classes.topSpacing10}>
            <Tooltip title="Processing Video">
              <span>
                <Button variant="outlined" disabled="true" className={classes.fullWidthElement} startIcon={<ThreeSixtyIcon color="primary"/>}  onClick={sendGDriveLinkAPI}>
                  Start Process
                </Button>
              </span>
            </Tooltip>               
          </div>
      )
    }
    else{
      return(
        <div className={classes.topSpacing10}>
        <Button variant="outlined" className={classes.fullWidthElement} startIcon={<ThreeSixtyIcon color="primary"/>}  onClick={sendGDriveLinkAPI}>
          Start Process
        </Button>
        </div>
      )
    }
  }


  const displayVideoInformation = () => {
    if (!videoInformationFlag) {
      return null;
    }
    else {
      if(!irFlag){
      return (
        <Accordion className={classes.accordian} variant="outlined" >
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
                {displaySearchLoading()}
              </Grid>
            </Grid>
            {displaySkeletonForSearch()}
            <div className={classes.topSpacing20}>
            <Grid container spacing={2}>
              <Grid item xs="8">
                <div>
                  {displaySearchBoxForIR()}
                  <div className={classes.topSpacing5}></div><iframe title="Video" height="600px" width="100%" src={searchGDrive}></iframe>
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


  const displaySkeletonForSearch = () => {
    if(irFlag){
      if((transcriptTimeFromAPI === null) && (searchLoadingFlag)){
        return(
          <Grid container spacing={2}>
            <Grid item xs="8">
              <div>
                <Skeleton></Skeleton>
                <Skeleton></Skeleton>
              </div>
          </Grid>
          </Grid>
        )
      }
    }
  }

  const displaySearchLoading = () => {
    if(irFlag){
      if((transcriptTimeFromAPI === null) && (searchLoadingFlag)){
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
        </div>)
      }
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
                {displayTranscriptLoading()}
              </Grid>
            </Grid>
            {displaySkeletonForTranscript()}
          </Paper>
        </Grid>
        )
      }
    }
    else {
      return null;
    }
  }

  const displaySkeletonForTranscript = () =>{
    if(transcriptLoadingFlag){
      return(
        <div className={classes.topSpacing20}>
                <Skeleton />
                <Skeleton />
                <Skeleton />
                <Skeleton />
                <Skeleton />
        </div>
      )
    }
  }

  const displayTranscriptLoading = () =>{
    if(transcriptLoadingFlag){
      return(
        <CircularProgress></CircularProgress>
      )
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
                  {displaySummaryLoading()}
                </Grid>
              </Grid>
              {displaySkeletonForSummary()}
            </Paper>
          </Grid>
        )
      }

    }
    else {
      return null;
    }
  }

  const displaySkeletonForSummary = () =>{
    if(summaryLoadingFlag){
      return(
        <div className={classes.topSpacing20}>
                <Skeleton />
                <Skeleton />
                <Skeleton />
                <Skeleton />
                <Skeleton />
        </div>
      )
    }
  }

  const displaySummaryLoading = () =>{
    if(summaryLoadingFlag){
      return(
        <CircularProgress></CircularProgress>
      )
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
                <div><h1><strong>Quiz</strong></h1></div>
              </Grid>
              <Grid item>
              {displayMcqLoading()}
              </Grid>
            </Grid>
            {displaySkeletonForMcqs()}
          </Paper>
        </Grid>
        )
      }
    }
    else {
      return null;
    }
  }

  const displaySkeletonForMcqs= () =>{
    if(mcqLoadingFlag){
      return(
        <div className={classes.topSpacing20}>
                <Skeleton />
                <Skeleton />
                <Skeleton />
                <Skeleton />
                <Skeleton />
        </div>
      )
    }
  }

  const displayMcqLoading = () =>{
    if(mcqLoadingFlag){
      return(
        <CircularProgress></CircularProgress>
      )
    }
  }


  const displayGallery = () => {
    if (galleryFlag) {
      if (galleryDataFromAPI !== null) {
        return (<Grid item xs>
          <Paper className={classes.paper} variant="outlined">
          <div><h1><strong>Screenshots</strong></h1></div>
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
                  <div><h1><strong>Screenshots</strong></h1></div>
                </Grid>
                <Grid item>
                  {displayGalleryLoading()}
                </Grid>
              </Grid>
              {displaySkeletonForGallery()}
            </Paper>
          </Grid>
        )
      }
    }
    else {
      return null;
    }
  }

  const displaySkeletonForGallery = () =>{
    if(galleryLoadingFlag){
      return(<div className={classes.topSpacing20}>
        <Grid container spacing={2}>
          <Grid item>
            <Skeleton variant="rect" width={210} height={118}/>
          </Grid>
          <Grid item>
            <Skeleton variant="rect" width={210} height={118}/>
          </Grid>
          <Grid item>
            <Skeleton variant="rect" width={210} height={118}/>
          </Grid>
          <Grid item>
            <Skeleton variant="rect" width={210} height={118}/>
          </Grid>
          <Grid item>
            <Skeleton variant="rect" width={210} height={118}/>
          </Grid>
          <Grid item>
            <Skeleton variant="rect" width={210} height={118}/>
          </Grid>
          <Grid item>
            <Skeleton variant="rect" width={210} height={118}/>
          </Grid>
          <Grid item>
            <Skeleton variant="rect" width={210} height={118}/>
          </Grid>
          <Grid item>
            <Skeleton variant="rect" width={210} height={118}/>
          </Grid>
          <Grid item>
            <Skeleton variant="rect" width={210} height={118}/>
          </Grid>
          <Grid item>
            <Skeleton variant="rect" width={210} height={118}/>
          </Grid>
          <Grid item>
            <Skeleton variant="rect" width={210} height={118}/>
          </Grid>
          <Grid item>
            <Skeleton variant="rect" width={210} height={118}/>
          </Grid>
          <Grid item>
            <Skeleton variant="rect" width={210} height={118}/>
          </Grid>
        </Grid>
      </div>
      )
    }
  }

  const displayGalleryLoading = () =>{
    if(galleryLoadingFlag){
      return(
        <CircularProgress></CircularProgress>
      )
    }
  }



  const setAllFalse = (reProcess = false) => {
    setVideoInformationFlag(true);
    if (reProcess === true) {
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
      setAlertMSG('');
      setMcqDataFromAPI(null);
      setGalleryDataFromAPI(null);
      setS2tV2tDoneFlag(false);
      setFileID(null);
      setSearchGDrive(null);
      setDisableProcessButton(false);
      setDisplayMainLoadingFlag(false);
      tmpMcqs = {};
      setErrorSnackBarOpen(false);
      setSearchLoadingFlag(false);
      setTranscriptLoadingFlag(false);
      setSummaryLoadingFlag(false);
      setMcqLoadingFlag(false);
      setGalleryLoadingFlag(false);
      setOpenSpeedDial(false);
      setHiddenSpeedDial(true);
      setSuccessAlertMSG('');
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

  const showNotes = () => {
    setAllFalse();
    handleSpeedDialClose()
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
    handleSpeedDialClose()
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
    handleSpeedDialClose()
    setIRFlag(true);
  }

  const showGallery = () => {
    setAllFalse();
    handleSpeedDialClose()
    setGalleryFlag(true);
    if ((s2tV2tDoneFlag) && (galleryDataFromAPI === null)) {
      if (galleryPostCalled === false) {
        call_POST_Gallery_post(fileID);
        setGalleryPostCalled(true);
      }
    }

  }

  const handleSpeedDialOpen = () => {
    setOpenSpeedDial(true);
  };

  const handleSpeedDialClose = () => {
    setOpenSpeedDial(false);
  };



  const actions = [
    { icon: <KeyboardArrowUpSharpIcon color="primary"/>, name: 'Up', actions: scrollToTop},
    { icon: <ReceiptSharpIcon color="primary"/>, name: 'Notes', actions: showNotes },
    { icon: <QuestionAnswerSharpIcon color="primary"/>, name: 'Quiz', actions: showMCQ },
    { icon: <SearchSharpIcon color="primary"/>, name: 'Search', actions: showIR },
    { icon: <PhotoLibrarySharpIcon color="primary"/>, name: 'Screenshots', actions: showGallery},
  ];


  return (
    <div className={classes.parentClass}>
      
      <Backdrop className={classes.backdrop} open={displayMainLoadingFlag}>
        <CircularProgress></CircularProgress>
      </Backdrop>

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

      {/* {displayNavBar()} */}

      <Snackbar open={errorSnackBarOpen} autoHideDuration={6000} onClose={closeErrorSnackBar}>
        <Alert onClose={closeErrorSnackBar} severity="error">
          {alertMSG}
        </Alert>
      </Snackbar>

      <Snackbar open={successSnackBarOpen} autoHideDuration={3000} onClose={closeSuccessSnackBar}>
        <Alert onClose={closeSuccessSnackBar} severity="success">
          {successAlertMSG}
        </Alert>
      </Snackbar>
      
      <div className={classes.speedDial}>
          <SpeedDial
            ariaLabel="SpeedDial openIcon example"
            hidden={hiddenSpeedDial}
            icon={<DehazeSharpIcon color="secondary"/>}
            onClose={handleSpeedDialClose}
            onOpen={handleSpeedDialOpen}
            open={openSpeedDial}
          >
            {actions.map((action) => (
              <SpeedDialAction
                key={action.name}
                icon={action.icon}
                tooltipTitle={action.name}
                tooltipOpen
                onClick={action.actions}
              />
            ))}
          </SpeedDial>
      </div>    
    
      </div>
  );
}

export default StartDeepRead;