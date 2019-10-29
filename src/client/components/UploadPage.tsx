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
    }
  }),
);

const UploadPage = () => {
  const [Store, setStore] = useContext(StoreContext);
  
  const handleInput = (e: React.FormEvent<HTMLInputElement>) => {
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
      console.log('Enter a JSON object from GCP that includes the project ID');
      console.log('locStore: ', Store.gcploc)
    }
    else setStore({...Store, gcpDeployPage: true });
  } 
    
  const classes = useStyles(); // this is showing an error but this is directly from Material-UI and is fine

  return (
    <>
      { Store.deploying ? <Deploying/> :
        Store.gcpDeployPage ? <GCPDeploy/> :
      <div className='uploadDiv'>
        <div className="gcpImageContainer">
          <img className='kubUpload' src={require('../assets/credsPage/google.png')}/>
          <Typography className={classes.text} variant="h3">Google Cloud Platform</Typography>
        </div>

        <div id="uploadDivForSubmitandBackButts">
          <input id="uploadEnterClustInfo" className='uploadInput' type="text" onChange={handleInput} placeholder="Enter GCP Info" required={true}></input>
          <div className="buttonHolder">
            <button id="uploadSubmit" className='uploadButt' onClick={handleSubmit}> Submit </button>
            <button id="uploadBackButt" className = 'uploadButt' onClick={handleBack}>  Back  </button>
          </div>
        </div>
      </div> 
      }
    </>
  )
}

export default UploadPage;
