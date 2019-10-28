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
import Container from '@material-ui/core/Container';
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
      // flexGrow: 1
    },
    text: {
      align: 'center',
      margin: '0 0 50px 0', // will adjust this later
    }
  }),
);

// the below styling rules are from styles.css but are no longer being used
// will delete here and in styles.css later

/* #leSidebar{ // not being used anymore
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-content: center;
  height:99.5%;
  width: 26%;
  float:left;
  background-color: rgb(0, 26, 255);
  border: rgba(67, 84, 105, 1) 3px;
  min-width: 216px;
  min-height: 280px;
  border-style: inset;
  z-index: 1000;
} */

/* #displays { // not being used anymore
  width: 100%;
  height: 100%;
} */

/* .mainDiv { // not being used anymore
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-content: center;
  padding-top: 50px;
} */

/*
.title { // not being used anymore
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;
  margin-bottom: -10px;
  margin-top: -40px;
  text-align: center;
  font-family: 'Amatic SC', cursive;
  font-size: 80px;
}
*/

/* .landingTitle { // not being used anymore
  display: flex;
  flex-direction: column;
  color: aqua;
  width: 100%;
} */

const SideBar = () =>{
  const [Store, setStore] = useContext(StoreContext);

  const myFunctionG = () => {
    console.log(Store.uploadPageState);
    setStore({...Store, 
      uploadPageState: true,
    });
  }

  // function to get to the Amazon Web Services upload page
  const myFunctionA = () => {
    console.log(Store.uploadPageState2);
    setStore({...Store, 
      uploadPageState2: true,
    });
  }

//rendering of summary of deployed clusters might need to move into gcp deploy page
  // if(Store.clusterCount && Store.uploadPageState2) {
  //   clusters = Store.clusters.map(clust => {
  //     return (
  //     <div className ="cluster">
  //       <center className="clusterTitle"><h4><em>{clust.clusterName}</em></h4></center>
  //       <center className="clusterInformation"><p>
  //           Status: <em>{clust.clusterStatus}</em>
  //           <br></br>
  //           Nodes: <em>{clust.nodeCount}</em>
  //           <br></br>
  //           Location: <em>{clust.location}</em>
  //       </p></center>
  //     </div>
  //     )
  //   })
  // }

  
  const classes = useStyles(); // this is showing an error but this is directly from Material-UI and is fine
  
  // if uploadPageState is true, display UploadPage
  // else if uploadPageState2 is true, display UploadPage2
  // else display LandingPage
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
          
            <Typography className={classes.text} variant="h3">
              KuberOptic
            </Typography>
          
            <Typography className={classes.text} variant="h5">
              The Kubernetes Visualizer
            </Typography>
        
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
