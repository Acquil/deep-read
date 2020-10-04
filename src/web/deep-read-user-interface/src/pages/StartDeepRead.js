import { makeStyles, Paper, Grid } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import clsx from 'clsx';
import ThreeSixtyIcon from '@material-ui/icons/ThreeSixty';



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
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
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
  margin: {
    margin: theme.spacing(1),
  },
  textField: {
    width: '25ch',
  },
  labelWidth:{
    fontSize:"70px"
  }
}));

function StartDeepRead() {
  const classes = useStyles();
  const [gDriveLinkVar, setGDriveLinkVar] = React.useState(null);
  const [dataForGDriveLinkVar, setdataForGDriveLinkVar] = React.useState(null);

  const updateGDriveTextBox = (e) => {
    setGDriveLinkVar(e.target.value)
  }

  const sendGDriveLinkAPI = () => {
    //window.alert(gDriveLink)
    //API call
    // console.log(gDriveLinkVar)
    setdataForGDriveLinkVar("Data returned from API")
  }

  const displayDataForGDriveLink = () => {
    if (dataForGDriveLinkVar === null) {
      return null
    }
    else {
      return (
        <div>
          <Grid container spacing={3}>
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

  return (
    <div>
      <div><h1><strong>Start deep-read</strong></h1></div>
      <div className={classes.topSpacing30}>
        {/* <div><TextField className={classes.fullWidthElement} id="outlined-basic" label="Google Drive Link" variant="outlined" onChange={updateGDriveTextBox} /></div> */}
        {/* <OutlinedInput
            id="outlined-adornment-password"
            onChange={updateGDriveTextBox}
            label="Google Drive Link"
            endAdornment={
              <InputAdornment position="end">
                <BackupSharpIcon
                  aria-label="toggle password visibility"
                  onClick={sendGDriveLinkAPI}
                  edge="end"
                >
                </BackupSharpIcon>
              </InputAdornment>
            }
          /> */}
        {/* <div className={classes.topSpacing10}><Button className={classes.fullWidthElement} variant="outlined" label="Process" onClick={sendGDriveLinkAPI}>Process</Button></div> */}
        <div>
          <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password"><div>Google Drive Link</div></InputLabel>
            <OutlinedInput
              className={classes.fullWidthElement}
              id="outlined-adornment-password"
              onChange={updateGDriveTextBox}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    onClick={sendGDriveLinkAPI}
                    onMouseDown={sendGDriveLinkAPI}
                    edge="end"
                  >
                  <ThreeSixtyIcon></ThreeSixtyIcon>
                  </IconButton>
                </InputAdornment>
              }
              labelWidth={130}
            />
          </FormControl>
        </div>
      </div>
      <div className={classes.topSpacing30}>
        {displayDataForGDriveLink()}
      </div>
    </div>
  );
}

export default StartDeepRead;
