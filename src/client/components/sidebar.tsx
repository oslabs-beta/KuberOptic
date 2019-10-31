/**
 * ************************************
 *
 * @module  sidebar.tsx
 * @author
 * @date
 * @description sidebar to be used inside visualizer.tsx
 *
 * ************************************
 */

import React from 'react';
import { useState, useEffect, useContext } from 'react';
import { makeStyles, useTheme, Theme, createStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import { StoreContext } from '../../../store'
import UploadPage from './UploadPage';
import UploadPage2 from './UploadPage2';
import Box from '@material-ui/core/Box';

// Material-UI uses "CSS in JS" styling
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    text: {
      align: 'center',
      margin: '0 0 50px 0',
    }
  }),
);

const SideBar = () =>{
  const [Store, setStore] = useContext(StoreContext);
  // will render the GCP login page to input credentials
  const myFunctionG = () => {
    console.log(Store.uploadPageState);
    setStore({...Store, 
      uploadPageState: true,
    });
  }

  // will render Amazon Web Services upload page to input credentials
  const myFunctionA = () => {
    console.log(Store.uploadPageState2);
    setStore({...Store, 
      uploadPageState2: true,
    });
  }

  const classes = useStyles(); // from Material-UI and is fine
  
  // if uploadPageState is true, display UploadPage (GCP Login)
  // else if uploadPageState2 is true, display UploadPage2 (AWS Login)
  // else display LandingPage (to choose which platform to login with either GCP or AWS)
  return(
    <Box>
      { Store.uploadPageState ? <UploadPage/> :
        Store.uploadPageState2 ? <UploadPage2/> :
        <div> 
          <Grid
            container
            direction="column"
            justify="space-around"
            alignItems="center"
          >
            <img className='kubLogo' src={'https://i.gifer.com/4P4X.gif'}/>
            <Typography className={classes.text} variant="h3">KuberOptic</Typography>
            <Typography className={classes.text} variant="h5">The Kubernetes Visualizer</Typography>
            <div className= "awsAndGcpLogos">
              <img className='logo' src={require('../assets/credsPage/aws.png')} onClick={myFunctionA}/>
              <img className='logo2' src={require("../assets/credsPage/google.png")} onClick={myFunctionG}/>
            </div>
          </Grid>
        </div>
      }
    </Box>
  )
}

export default SideBar;
