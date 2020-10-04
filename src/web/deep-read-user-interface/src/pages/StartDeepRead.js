import { Button, TextField, makeStyles, Paper, Grid } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexGrow: 1
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
        <div><TextField className={classes.fullWidthElement} id="outlined-basic" label="Google Drive Link" variant="outlined" onChange={updateGDriveTextBox} /></div>
        <div className={classes.topSpacing10}><Button className={classes.fullWidthElement} variant="outlined" label="Process" onClick={sendGDriveLinkAPI}>Process</Button></div>
      </div>
      <div className={classes.topSpacing30}>
        {displayDataForGDriveLink()}
      </div>
    </div>
  );
}

export default StartDeepRead;
