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
import Button from '@material-ui/core/Button';

import { StoreContext } from '../../../store';
import GCPDeploy from './gcpDeploy';
import Deploying from './deploying';
require('events').EventEmitter.defaultMaxListeners = 25;

// Material-UI uses "CSS in JS" styling
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    text: {
      align: 'center',
      margin: '0 0 50px 0', 
    },
    textField: {
      width: "100%",
    },
    button: {
      margin: theme.spacing(1),
    },
    // input: {
    //   display: 'none',
    // },
  }),
);


const UploadPage = () => {
  const [Store, setStore] = useContext(StoreContext);
  // stores the GCP JSON data for login in the store for future 
  // use when deploying or fetching updates on any input changes
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStore({...Store, credentials:e.currentTarget.value});
  };
  // closes component and takes you back to launch page
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
  // ensures that the credentials you provided include the project Id key
  // will eventually render the GCP Deploy page
  const handleSubmit = () => {
    const creds = JSON.parse(Store.credentials); 
    if (typeof creds !== 'object' || !creds.hasOwnProperty("project_id")) {
      console.log('Enter a JSON object from GCP that includes the project_id key');
      console.log('locStore: ', Store.gcploc)
    }
    else setStore({...Store, gcpDeployPage: true });
  } 
    
  const classes = useStyles(); // directly from Material-UI and is fine

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
          <div className="gcpImageContainer">
            <img className='kubUpload' src={require('../assets/credsPage/google.png')}/>
            <Typography className={classes.text} variant="h3">Google Cloud Platform</Typography>
          </div>

          <form noValidate autoComplete="off">
              <TextField
                id="input-gcp-info"
                label="Input GCP Info"
                className={classes.textField}
                helperText="Enter a JSON object from GCP that includes the project_id key"
                margin="normal"
                onChange={handleInput}
              />
          </form>

          <div>
            <Button variant="contained" color="primary" className={classes.button} onClick={handleSubmit}>Submit</Button>
            <Button variant="outlined" color="primary" className={classes.button} onClick={handleBack}>Back</Button>
          </div>
        </Grid>
      }
    </>
  )
}

export default UploadPage;
