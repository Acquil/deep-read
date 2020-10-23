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
    left:"0",
    width: "100%",
  },
  bottom1: {
    width: "100%",
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
  const [irSearchFlag, setIRSearchFlag] = React.useState(false);
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
  const [dataSuccessRecievedFromAPI, setDataSuccessRecievedFromAPI] = React.useState(true);
  const [mcqDataFromAPI, setMcqDataFromAPI] = React.useState(null);
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
    setGDriveLinkVar(e.target.value)
  }

  const handleModelChange = (event) => {
    setModel(event.target.value);
  };

  const sendGDriveLinkAPI = () => {
    setAllFalse(true)
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
          setFileIDFromAPI(responseData.data.id);
          call_POST_speech_post(responseData.data.id);  
          call_POST_v2t_post(responseData.data.id);      
          showVideoInformation();  
        }
      }).catch(error => {
        console.log(error)
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
      });

    }
  }
   
  const poll_call_GET_speech_get = (id) => {
    console.log("poll_call_GET_speech_get reached")
    const api_call_GET_speech_get  = new Request(baseURL + 'speech/get/' + id);
    api_call_GET_speech_get.poll(3000).get((response) => {
      console.log("poll_call_GET_speech_get started")
      console.log(response.data);      
      if(response.data.status === "Success"){
        setTranscriptFromAPI(response.data.transcript.transcript);
        setTranscriptTimeFromAPI(response.data.transcript.transcript_times);
        poll_call_GET_v2t_get(id);         
        return false;
      }
    });
  }

  const call_POST_v2t_post = (id) => {
    console.log("call_POST_v2t_post Reached")

    if (id !== null) {
      console.log("call_POST_v2t_post called")
      // axios.post(baseURL + 'speech/post/' + id + '&' + model, {
      // }).then((responseData) => {
      //   console.log(responseData)       
      //   poll_call_GET_v2t_get(responseData.data.id); 
      // }).catch(error => {
      //   console.log(error)
      // });

    }

    //TEST
    // poll_call_GET_speech_get("abc"); 

  }

  const poll_call_GET_v2t_get = (id) => {
    console.log("poll_call_GET_v2t_get reached")
    call_POST_Summarize_post(id);
    call_POST_mcq_generator_post(id);
    call_POST_Gallery_post(id);
  }

  const call_POST_Summarize_post = (id) => {
    console.log("call_POST_Summarize_post Reached")
    poll_call_GET_Summarize_get(id)
  }

  const poll_call_GET_Summarize_get = (id) => {
    console.log("poll_call_GET_Summarize_get reached")
  }

  const call_POST_mcq_generator_post = (id) => {
    console.log("call_POST_mcq_generator_post Reached")
    if ((id !== null)) {
      console.log("call_POST_mcq_generator_post called")
      axios.post(baseURL + 'mcq_generator/post/' + id, {
      }).then((responseData) => {
        tmpMcqs = responseData.data.mcqs
        tmpMcqs["correctAnswer"] = 0;
        tmpMcqs["clickedAnswer"] = 0;
        tmpMcqs["step"] = 1;
        tmpMcqs["score"] = 0;
        setMcqDataFromAPI(tmpMcqs)
        console.log(tmpMcqs)
      }).catch(error => {
        console.log(error)
      });

    }
  }

  const call_POST_Gallery_post = (id) => {
    console.log("call_POST_Gallery_post Reached")
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
    if (!videoInformationFlag) {
      return null;
    }
    else {
      return (
          <Grid item xs>
            <Paper className={classes.paper}>
              {displaySearchBoxForIR()}
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
                  <iframe title="Video" src={gDriveLinkVar.replace("/view?usp=sharing","/preview")} ></iframe>
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
          </div>
          <div>
            <Quiz mcqData={mcqDataFromAPI} />
          </div>
        </Paper>
      </Grid>)
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
          </div>
          <div className={classes.fullWidthElement}>
            <SimpleReactLightbox>
              <SRLWrapper>
                {/* {list1.map(i=>(<img src={i}></img>))} */}
                <img src='https://upload.wikimedia.org/wikipedia/commons/8/89/Ropy_pahoehoe.jpg' alt="Caption" width="640" height="280"/>
                <img src='https://upload.wikimedia.org/wikipedia/commons/7/73/Pyroclastic_flows_at_Mayon_Volcano.jpg' width="640" height="280" alt="Another Caption" />
                <img src='https://upload.wikimedia.org/wikipedia/commons/f/f3/Okataina.jpg'alt="Final Caption" width="640" height="280"/>
              </SRLWrapper>
            </SimpleReactLightbox>
          </div>
        </Paper>
      </Grid>)
    }
  }

  const displaySearchBoxForIR = () =>{
      if(!irSearchFlag){
        return null;
      }
      else{
        return(
          <Autocomplete
            id="combo-box-demo"
            options={top100Films}
            getOptionLabel={(option) => option.title}
            renderInput={(params) => <TextField {...params} label="Search" variant="outlined" />}
          />
        )
      }
  }

  const setAllFalse = (processClickedFlag) => {
    setGDriveBoxFlag(true);
    setVideoInformationFlag(true);
    if(processClickedFlag == true){
      console.log("Reached here")
      setVideoInformationFlag(false);
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
    console.log("Show video info reached")
    if(dataSuccessRecievedFromAPI === true){
    setAllFalse();
    setVideoInformationFlag(true);
    }
  }

  const showTranscripts = () => {
    if(dataSuccessRecievedFromAPI === true){
      setAllFalse();
      showSummary();
      setTranscriptFlag(true) 
    }      
  }

  const showSummary = () => {
    if(dataSuccessRecievedFromAPI === true){
    setAllFalse();
    setSummaryFlag(true);
  }
  }

  const showMCQ = () => {
    if(dataSuccessRecievedFromAPI === true){
    setAllFalse();
    setMCQFlag(true);
    }
  }

  const showIR = () => {
    if(dataSuccessRecievedFromAPI === true){
    setAllFalse();
    setIRFlag(true);
    setIRSearchFlag(true);
    }
  }

  const showGallery = () => {
    if(dataSuccessRecievedFromAPI === true){
    setAllFalse();
    setGalleryFlag(true);
    }
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

      <div>
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