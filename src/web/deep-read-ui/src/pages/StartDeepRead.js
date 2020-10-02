import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CardDeck from 'react-bootstrap/CardDeck'
import { Card } from 'react-bootstrap';

import './StartDeepRead.css';

function StartDeepRead() {
  const [gDriveLinkVar, setGDriveLinkVar] = React.useState(null);
  const [dataForGDriveLinkVar, setdataForGDriveLinkVar] = React.useState(null); 


  const updateGDriveTextBox = (e) =>{
    console.log("hello1")
    setGDriveLinkVar(e.target.value)
    // console.log(e.target.value)
    // console.log(gDriveLink)
  }

  const sendGDriveLinkAPI = ()=>{
    //window.alert(gDriveLink)
    //API call
    console.log("hello2")
    // console.log(gDriveLinkVar)
    setdataForGDriveLinkVar("Data returned from API")
  }

  const displayDataForGDriveLink =()=>{
    console.log("hello5")
    if(dataForGDriveLinkVar === null){
      console.log("hello3")
      return null
    }
    else{
      console.log("hello4")
      return(        
      <CardDeck>
        <Card>
          <Card.Body>
            <Card.Title>Card title</Card.Title>
            <Card.Text>
              This is a wider card with supporting text below as a natural lead-in to
              additional content. This content is a little bit longer.
            </Card.Text>
          </Card.Body>
          <Card.Footer>
            <small className="text-muted">Last updated 3 mins ago</small>
          </Card.Footer>
        </Card>
        <Card>
          <Card.Body>
            <Card.Title>Card title</Card.Title>
            <Card.Text>
              This card has supporting text below as a natural lead-in to additional
              content.{' '}
            </Card.Text>
          </Card.Body>
          <Card.Footer>
            <small className="text-muted">Last updated 3 mins ago</small>
          </Card.Footer>
        </Card>
        <Card>
          <Card.Body>
            <Card.Title>Card title</Card.Title>
            <Card.Text>
              This is a wider card with supporting text below as a natural lead-in to
              additional content. This card has even longer content than the first to
              show that equal height action.
            </Card.Text>
          </Card.Body>
          <Card.Footer>
            <small className="text-muted">Last updated 3 mins ago</small>
          </Card.Footer>
        </Card>
      </CardDeck>
    );
    }
  }

  
  return (
    <div style={{position: "relative"}}>
      <div style={{position:"relative" , top:"25px"}}>
        <h1>Start deep-read</h1>
      </div>
      <div style={{position:"relative" , top:"50px"}}>
        <TextField style={{width:"1350px"}} id="outlined-basic" label="Google Drive Link" variant="outlined" onChange={updateGDriveTextBox} />
        <Button style={{top:"10px", left: "10px"}}  variant="outlined" label="Process" onClick={sendGDriveLinkAPI}>Process</Button>
      </div>
      <div style={{position:"relative" , top:"75px"}}>
         {displayDataForGDriveLink()}
      </div>
    </div>
  );
}

export default StartDeepRead;
