/**
 * ************************************
 *
 * @module  gcpDeploy.tsx
 * @author
 * @date
 * @description page to determine deployment settings? Possibly making a post-style request to GCP to create a cluster
 *
 * ************************************
 */

import * as React from 'react';
import { useContext } from 'react';
import {StoreContext} from '../../../store'
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { makeStyles, useTheme, Theme, createStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
const [quickstart, create] = require('../../main/gcp/getGCPdata').default
const { ipcRenderer } = require('electron');

require('events').EventEmitter.defaultMaxListeners = 25;
import GetGCP from './GcpGetClusters';

// Material-UI uses "CSS in JS" styling
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: { 
      display: 'flex',
    },
    text: { 
      align: 'center',
      margin: '0 0 0 0', 
    },
    textField: {
      width: "90%",
      marginTop: 8,
    },
    button: {
      margin: theme.spacing(1),
      width: 120,
    },
    input: {
      display: 'none',
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 150,
    },
    formButton: {
      display: 'block',
      marginTop: theme.spacing(2),
    }
  }),
);


// various inputs will be stored in this object and will be submitted when you call handleSubmit
let deployVals = {};

const gcpDeploy = () =>{
  const [Store, setStore] = useContext(StoreContext);
  const [open, setOpen] = React.useState(false);
  const [openCount, setOpenCount] = React.useState(false);
  const [type, setType] = React.useState('');
  const [name, setName] = React.useState('');
  const [count, setCount] = React.useState('');

  //saves the input value for the name of the cluster you will create in the deployVals object
  const handleName = (event) => {
    setName(event.target.value)
    const name = event.target.value
    deployVals['name'] = name;
  }
  const handleTypeClose = () => {
    setOpen(false);
  };
  const handleTypeOpen = () => {
    setOpen(true);
  };
  const handleCountClose = () => {
    setOpenCount(false);
  };
  const handleCountOpen = () => {
    setOpenCount(true);
  };
  //saves the deploy zone for the cluster you will create in the deployVals object
  const handleLoc = (event) => {
    const zone = event.target.value
    deployVals['zone'] = zone;
    setStore({...Store, gcpdeploylocation: zone})
  };

  //saves the cluster type for the cluster you will create in the deployVals object
  const handleType = (event) => {
    setType(event.target.value);
    const type = event.target.value
    deployVals['clusterType'] = type;
  };

  //saves the node count for the cluster you will create in the deployVals object
  const handleCount = (event) => {
    setCount(event.target.value)
    const count = event.target.value;
    deployVals['count'] = count;
  }
  
  //clears credentials, clusters, and other values and takes you to the main login page
  const handleBack = () => {
    return setStore({
      ...Store,
      uploadPageState:false, 
      gcpDeployPage:false,
      credentials: null,
      clusterCount: 0,
      clusters: [],
      visualize: false
    });
  }

  const handleDeploy = () =>{
    //sends to the GetGCPData file to create a cluster and sends the deployVals object with it
    create(Store.credentials, deployVals['zone'], deployVals)
    const creds = JSON.parse(Store.credentials)
    //calls to main to have it fetch clusters from the zone you just deployed to -- currently, 
    //comes back without the newly created cluster 
    ipcRenderer.send('getNewClusters', creds, deployVals['zone']);
    //initializes the "Deploying/Fetching" page to show and allow input fields to be reset,
    //also closes the Visualizer component to have it initialize a new one when coming back with response
    setStore({...Store,
      gcpDeployPage:false,
      deploying: true,
      clusters: [],
      clusterCount: 0,
      visualize: false
    })
  }

  ipcRenderer.on('newClusters', (event: any, singleArr: any) => {
    //logic in case we have more than one cluster already rendered
    if(Store.clusterCount) {
      let newClusters = Store.clusters.concat(singleArr);
      //ensures that we do not display the same cluster more than once
      newClusters = Object.values(newClusters.reduce((allClusts, nextClust) => Object.assign(allClusts, { [nextClust.clusterName] : nextClust}), {}))
      //sets store with the clusters that were returned and tells React to render Visualizer component
      setStore({...Store,
        clusters: newClusters,
        clusterCount: newClusters.length,
        deploying: false, 
        gcpDeployPage: true,
        visualize: true
       })
       event.returnValue = 'done';
    } else {
      //sets the store with clusters assuming there previously were no clusters
      setStore({...Store,
        clusters: singleArr,
        clusterCount: singleArr.length,
        deploying: false, 
        gcpDeployPage: true,
        visualize: true
       })
    }
    event.returnValue = 'done';
  })

  const classes = useStyles(); // this is showing an error but this is directly from Material-UI and is fine

  return (
    <Grid
        container
        direction="column"
        justify="space-around"
        alignItems="center"
        >
    <div className="deployWrapper">
      <GetGCP/>
      <br/>
      <Divider />
      <div className="inputPageDeploy">
      <Typography className={classes.text} variant="h6">Deploy New GCP Cluster:</Typography>
        <TextField
          id="standard-helperText"
          label="cluster name"
          className={classes.textField}
          helperText="Enter a GCP cluster name..."
          margin="normal"
          onChange={handleName}
          value={name}
          />

        <div id="deployDropDowns">
        <FormControl className={classes.formControl}>
          <InputLabel id="clusterType">Cluster Type</InputLabel>
            <Select
              labelId="clusterType"
              id="clusterType"
              open={open}
              onClose={handleTypeClose}
              onOpen={handleTypeOpen}
              value={type}
              onChange={handleType}
            >
          <MenuItem value=""><em>Cluster Type</em></MenuItem>
          <MenuItem value={'affordable'}>affordable</MenuItem>
          <MenuItem value={'standard'}>standard</MenuItem>
          <MenuItem value={'cpuIntensive'}>cpuIntensive</MenuItem>
          <MenuItem value={'memoryIntensive'}>memoryIntensive</MenuItem>
          <MenuItem value={'gpuAcceleratedComputing'}>gpuAcceleratedComputing</MenuItem>
          <MenuItem value={'highly available'}>highly available</MenuItem>
        </Select>
      </FormControl>
      <FormControl className={classes.formControl}>
          <InputLabel id="nodeCount">Node Count</InputLabel>
            <Select
              labelId="nodeCount"
              id="nodeCount"
              open={openCount}
              onClose={handleCountClose}
              onOpen={handleCountOpen}
              value={count}
              onChange={handleCount}
            >
          <MenuItem value=""><em>Node Total</em></MenuItem>
          <MenuItem value={'1'}>1</MenuItem>
          <MenuItem value={'2'}>2</MenuItem>
          <MenuItem value={'3'}>3</MenuItem>
          <MenuItem value={'4'}>4</MenuItem>
          <MenuItem value={'5'}>5</MenuItem>
        </Select>
      </FormControl>
        </div>

          <div className="deployLocTitle">
          <Typography className={classes.text} variant="h6">Deploy Location</Typography>
            <form className="nodeLocationRadios">
              <div className="div1">
                <label>  
                <input type="radio" name="location" value="us-central1-a" onChange={handleLoc}></input>
                  US Central (1A)
                </label>
              </div>
              <div className="div2">
                <label>  
                <input type="radio" name="location" value="us-central1-b" onChange={handleLoc}></input>
                  US Central (1B)
                </label>
              </div>
              <div className="div3">
                <label>  
                <input type="radio" name="location" value="us-central1-c" onChange={handleLoc}></input>
                  US Central (1C)
                </label>  
              </div>
              <div className="div4">
                <label>  
                <input type="radio" name="location" value="us-west1-a" onChange={handleLoc}></input>
                  US West (1A)
                </label>
              </div>
              <div className="div5">
                <label>  
                <input type="radio" name="location" value="southamerica-east1-a" onChange={handleLoc}></input>
                  S.America East (1A)
                </label>
              </div>
              <div className="div6">
                <label>  
                <input type="radio" name="location" value="southamerica-east1-b" onChange={handleLoc}></input>
                  S.America East (1B)
                </label>
              </div>
              <div className="div7">
                <label>  
                <input type="radio" name="location" value="southamerica-east1-c" onChange={handleLoc}></input>
                  S.America East (1C)
                </label>
              </div>
              <div className="div8">
                <label>  
                <input type="radio" name="location" value="europe-west2-a" onChange={handleLoc}></input>
                  Europe West (2A)
                </label>
              </div>
            </form> 
          </div>


          <div id='buts'>
            <Button variant="contained" color="primary" className={classes.button} onClick={handleDeploy}>Deploy</Button>
            <Button variant="outlined" color="primary" className={classes.button} onClick={handleBack}>Back</Button>
          </div>
        </div>
      </div>
    </Grid>
  )
}

export default gcpDeploy;
