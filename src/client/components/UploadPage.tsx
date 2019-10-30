/**
 * ************************************
 *
 * @module  UploadPage.tsx
 * @author
 * @date
 * @description upload page for clusters from Google Cloud Platform
 *
 * ************************************
 */

import * as React from 'react';
import { useContext } from 'react';
import { makeStyles, useTheme, Theme, createStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

import { StoreContext } from '../../../store';
import GCPDeploy from './gcpDeploy';
import Deploying from './deploying';
require('events').EventEmitter.defaultMaxListeners = 25;

// Material-UI uses "CSS in JS" styling
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: { // currently not being used - maybe delete later
      display: 'flex',
      // flexGrow: 1
    },
    text: {
      align: 'center',
      margin: '0 0 50px 0', // will adjust later
    },
    textField: {
      width: "100%",
    },
  }),
);

/*
.uploadDiv {
  height: 100%;
  width: 300px;
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;
  margin: 0px auto;
}

.gcpImageContainer{
  box-sizing: border-box;
  width: 300px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
}

.kubUpload {
  /* transform: rotate(360deg); 
  height: 125px;
  width: 175px;
  margin: 10px auto;
  /* margin-top: 60px; 
  /* margin-left: 325px; 
  color: rgb(254, 254, 255);
  /* animation: rotation 1s infinite linear; 
}

#uploadDivForSubmitandBackButts {
  display: flex;
  flex-direction: column;
}
*/


const UploadPage = () => {
  const [Store, setStore] = useContext(StoreContext);
  
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => { // was originally React.FormEvent
    setStore({...Store, credentials:e.currentTarget.value});
  };
    
  const handleBack = () => {
    setStore({
      ...Store,
      uploadPageState:false, 
      uploadPageState2:false,
      credentials: null,
      clusterCount: 0,
      clusters: []
    });
  };

  // functionalilty for pressing 'submit' button
  const handleSubmit = () => {
    const creds = JSON.parse(Store.credentials); 
    if (typeof creds !== 'object' || !creds.hasOwnProperty("project_id")) {
      console.log('Enter a JSON object from GCP that includes the project_id key');
      console.log('locStore: ', Store.gcploc)
    }
    else setStore({...Store, gcpDeployPage: true });
  } 
    
  const classes = useStyles(); // this is showing an error but this is directly from Material-UI and is fine

  return (
    <>
      { Store.deploying ? <Deploying/> :
        Store.gcpDeployPage ? <GCPDeploy/> :
        <Grid
        container
        direction="column"
        justify="space-around"
        alignItems="center"
        >
          {/* <div className='uploadDiv'> */}
            <div className="gcpImageContainer">
              <img className='kubUpload' src={require('../assets/credsPage/google.png')}/>

              {/* <div className='kubUploadText'>Google Cloud Platform</div> */}
              <Typography className={classes.text} variant="h3">
                Google Cloud Platform
              </Typography>
            </div>

            <form noValidate autoComplete="off">
              {/* <div> */}
                <TextField
                  id="standard-helperText"
                  label="Input GCP Info"
                  className={classes.textField}
                  helperText="Enter a JSON object from GCP that includes the project_id key"
                  margin="normal"
                  onChange={handleInput}
                />
              {/* </div> */}
            </form>

            <div id="uploadDivForSubmitandBackButts">
              {/* <input id="uploadEnterClustInfo" className='uploadInput' type="text" onChange={handleInput} placeholder="Enter GCP Info" required={true}></input> */}
              
              
              <div className="buttonHolder">
                <button id="uploadSubmit" className='uploadButt' onClick={handleSubmit}> Submit </button>
                <button id="uploadBackButt" className = 'backButton' onClick={handleBack}>  Back  </button>
              </div>
            </div>
          {/* </div>  */}
        </Grid>
      }
    </>
  )
}

export default UploadPage;
