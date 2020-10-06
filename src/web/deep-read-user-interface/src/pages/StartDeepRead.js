import { makeStyles, Paper, Grid, Button, TextField } from '@material-ui/core';
import React from 'react';
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
        <Paper className={classes.paper}>
        <div><TextField className={classes.fullWidthElement} id="outlined-basic" label="Google Drive Link" variant="outlined" onChange={updateGDriveTextBox} /></div>
        <div className={classes.topSpacing10}><Button className={classes.fullWidthElement} startIcon={<ThreeSixtyIcon />} variant="outlined"  label="Process" onClick={sendGDriveLinkAPI}>Process</Button></div>
        </Paper>
        
      </div>
      <div className={classes.topSpacing30}>
        {displayDataForGDriveLink()}
      </div>
    </div>
  );
}

export default StartDeepRead;
