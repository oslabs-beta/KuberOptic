/**
 * ************************************
 *
 * @module  UploadPage2.tsx
 * @author
 * @date
 * @description upload page for clusters from Amazon Web Services
 *
 * ************************************
 */

// This page is the "login" space for AWS. It takes an AWS Key, Secret, and region, and when submitted will bring you to the AWS Display/Deploy page where all clusters in the region are displayed. 

import * as React from 'react';
import { useContext } from 'react';
import { makeStyles, useTheme, Theme, createStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { StoreContext } from '../../../store';
const { ipcRenderer } = require('electron');
import AWSDeploy from './awsDeploy';
import Deploying from './deploying';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

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
    button: {
      margin: theme.spacing(1),
    },
    input: {
      display: 'none',
    },
  }),
);

const UploadPage2 = () => {

  const [Store, setStore] = useContext(StoreContext);
  // updates the store with the AWS key entered into the input field
  const handleKey = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStore({...Store, awsKey: e.currentTarget.value})
  }
  // updates the store with the AWS secret entered into the input field
  const handleSecret = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStore({...Store, awsSecret: e.currentTarget.value})
  }
  // brings the display back to the main sidebar page
  const handleBack = ()=>{
    setStore({
      ...Store,
      uploadPageState:false, 
      uploadPageState2:false,
      credentials: null,
      clusterCount: 0,
      clusters: []
    });
  };
  // submits the AWS key, secret, and region to main.ts where the loginAWS function is invoked
  function handleSubmit() {
    if(typeof Store.awsSecret !== 'string' || typeof Store.awsKey !== 'string'){
      console.log('Enter a AWS key/secret to access AWS');
    } else {
      setStore({...Store,
        awsDeployPage: true,
      })
    }
  }

  const classes = useStyles(); // this is showing an error but this is directly from Material-UI and is fine

  // renders the login page, with input fields for AWS key, secret, and a drop down menu for US regions.     
  return (
    <>
      { Store.deploying ? <Deploying/> :
        Store.awsDeployPage ? <AWSDeploy/> :
        <Grid
        container
        direction="column"
        justify="space-around"
        alignItems="center"
        >
        <div className="awsImageContainer">
          <img className='kubUpload' src={require('../assets/credsPage/aws.png')}/>
          <Typography className={classes.text} variant="h3">Amazon Web Services</Typography>
        </div>
        <form noValidate autoComplete="off">
          <TextField
            id="standard-helperText"
            label="Access Key"
            className={classes.textField}
            helperText="Enter an AWS Access Key..."
            margin="normal"
            onChange={handleKey}
          />
          <TextField
            id="standard-helperText"
            label="Secret Key"
            className={classes.textField}
            helperText="Enter an AWS Secret Key..."
            margin="normal"
            onChange={handleSecret}
          />
        </form>

        <div>
          <Button variant="contained" color="secondary" className={classes.button} onClick={handleSubmit}>Submit</Button>
          <Button variant="outlined" color="secondary" className={classes.button} onClick={handleBack}>Back</Button>
        </div>
      </Grid>
      }   
  </>
  )
}

export default UploadPage2;