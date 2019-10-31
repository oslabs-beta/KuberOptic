import * as React from 'react';
import { useContext } from 'react';
import { makeStyles, useTheme, Theme, createStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { StoreContext } from '../../../store';
const { ipcRenderer } = require('electron');
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
// /////////////////for drop downs
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
////////////////////////////////////

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
    },
    input: {
      display: 'none',
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 190,
    },
    formButton: {
      display: 'block',
      marginTop: theme.spacing(2),
    }
  }),
);

const AWSDeploy = () => {
  const [Store, setStore] = useContext(StoreContext);
  const [zone, setZone] = React.useState('');
  const [region, setRegion] = React.useState('');
  const [open, setOpen] = React.useState(false);
  const [regOpen, setRegOpen] = React.useState(false);

  const handleChange = event => {
    setZone(event.target.value);
    const zone = event.target.value
    setStore({
      ...Store,
      awsDisplayRegion: zone
    })
  };
  const handleRegionChange = event => {
    setRegion(event.target.value);
    const zone = event.target.value
    setStore({
      ...Store,
      awsDeployRegion: zone
    })
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  const handleRegClose = () => {
    setRegOpen(false);
  };
  const handleRegOpen = () => {
    setRegOpen(true);
  };

  // sets store to the cluster name from the input field
  const handleName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStore({...Store, awsClusterName: e.currentTarget.value.split(", ")})
  }

  // beginning of function to retrieve cluster data by name. Sets store to the 
  // cluster name and sends to 'asynchronous-message2' where fetchAWS is called. 
  const handleFetchSubmit = () => {
    let arg;
    if (!Store.awsClusterName.length && Store.awsDisplayRegion) {
      arg = {
        region: Store.awsDisplayRegion,
        accessKeyId: Store.awsKey, 
        secretAccessKey: Store.awsSecret,
      }
      ipcRenderer.send('aws-login', arg)
    } else if (Store.awsClusterName.length && Store.awsDisplayRegion) {
      arg = {
        clusters: Store.awsClusterName, 
        accessKeyId: Store.awsKey, 
        secretAccessKey: Store.awsSecret, 
        region: Store.awsDisplayRegion
      }
      ipcRenderer.send('asynchronous-message2', arg)
    }
  }
  // removes a cluster from the visualizer by name by removing it from the store array of cluster names
  const handleRemove = () => {
    let clusterArrCopy = Store.clusters.slice();
    for (let i = 0; i < clusterArrCopy.length; i++) {
      if (Store.awsClusterName.includes(clusterArrCopy[i].clusterName)) {
        clusterArrCopy.splice(i, 1)
        clusterArrCopy = clusterArrCopy;
      }
    }
    setStore({...Store,
      clusters: clusterArrCopy,
      clusterCount: clusterArrCopy.length,
      visualize: false,
      awsDeployPage: false, 
      deploying: true
    })
    const arg = {
      clusters: clusterArrCopy, 
      accessKeyId: Store.awsKey, 
      secretAccessKey: Store.awsSecret, 
      region: Store.awsDisplayRegion
    }
    ipcRenderer.send('asynchronous-message2', arg)
  }

  // sets store to the cluster name for a new cluster 
  const handleDeployName = (e: React.ChangeEvent<HTMLInputElement>) => {
      setStore({...Store, awsDeployName: e.currentTarget.value})
  }
  // sets store to AWS ARN for cluster deployment
  const handleDeployArn = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStore({...Store, awsDeployRoleArn: e.currentTarget.value})
  }
  // following 2 functions set the 2 subnets to the store for cluster deployment
  const handleSubnet1 = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStore({...Store, awsSubnet1: e.currentTarget.value})
  }
  const handleSubnet2 = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStore({...Store, awsSubnet2: e.currentTarget.value})
  }
 
  // submits name, ARN, subnets, and region for cluster deployment, and sends to 'create-aws' to invoke the createCluster method
  const handleDeploySubmit = () => {
   const arg = {
      name: Store.awsDeployName,
      accessKeyId: Store.awsKey,
      secretAccessKey: Store.awsSecret,
      region: Store.awsDeployRegion,
      version: "1.14",
      resourcesVpcConfig: {
        endpointPrivateAccess: false,
        endpointPublicAccess: true,
        subnetIds: [Store.awsSubnet1, Store.awsSubnet2]
      },
      roleArn: Store.awsDeployRoleArn,
    }
      setStore({...Store, awsDeployPage: false, deploying: true, visualize: false})
      ipcRenderer.send('create-aws', arg)
  }
  // deletes a cluster from the cloud, only needs a name
  const handleDelete = () => {
    const arg = {
      name: Store.awsDeployName,
      accessKeyId: Store.awsKey,
      secretAccessKey: Store.awsSecret,
      region: Store.awsDeployRegion,
    }
    ipcRenderer.send('delete-aws', arg);
    let clusterArrCopy = Store.clusters.slice();
    for (let i = 0; i < clusterArrCopy.length; i += 1) {
      if (clusterArrCopy[i].clusterName === arg) {
        clusterArrCopy.splice(i, 1)
        clusterArrCopy = clusterArrCopy;
      }
    }
    setStore({
      ...Store,
      clusters: clusterArrCopy,
      clusterCount: clusterArrCopy.length,
      deploying: true,
      awsDeployPage: false, 
      visualize: false
    })
  }
  // goes back to the landing page
  const handleBack = ()=>{
    return setStore({
      ...Store,
      uploadPageState2:false, 
      clusterCount:0,
      awsKey:null,
      awsSecret:null,
      awsClusterName: [],
      awsLocation:null,
      awsDeployPage: false,
      awsDeployName: null,
      awsDeployRegion: null,
      visualize: false
    });
  }

  // from main.ts, 'asynchronous-message2'
  // iterates through the clusters submitted via the name 
  // or region, and adds to the array of clusters in the store.
  ipcRenderer.on('clusterClient2', (event: any, arg: any) => {
    // this and the function below take in the cluster names from the listClusters method and sends them to 'asynchronous-message2' to be sent as arg for the describeCluster method
      if(!arg.length || !arg || arg === []) {
        event.returnValue = 'done';
        return setStore({...Store,
          deploying: false,
          awsDeployPage: true,
          visualize: false,
          clusters: [],
          clusterCount: 0
        })
      } else {
        let newClusters = Store.clusters;
        arg.forEach(el=> newClusters.push(el))
        newClusters = Object.values(newClusters.reduce((allClusts, nextClust) => Object.assign(allClusts, { [nextClust.clusterName] : nextClust}), {}))
        setStore({...Store, 
          clusters: newClusters, 
          clusterCount: newClusters.length, 
          deploying: false,
          awsDeployPage: true,
          visualize: true
        })
        console.log('clusters: ', newClusters, 'cluster count: ', Store.clusterCount, 'aws cluster names: ', Store.awsClusterName)
        console.log('arg :', arg)
        event.returnValue = 'done';
      }
    })
  
    ipcRenderer.on('awsRegionDisplayFunc', (event: any, arg: any) => {
      awsRegionDisplay(arg)
    })
  
    const awsRegionDisplay = (array) => {
      const arg = {
        clusters: array, 
        accessKeyId: Store.awsKey, 
        secretAccessKey: Store.awsSecret, 
        region: Store.awsDisplayRegion
      }
      setStore({...Store,
        uploadPageState2: false, 
        awsDeployPage: false,
        deploying: true, 
      });
      ipcRenderer.send('asynchronous-message2', arg)
    }

    ipcRenderer.on('created', (event: any, arg: any) => {
      console.log('cluster created', arg)
      setStore({
        ...Store,
        deploying: false,
        awsDeployPage: true,
        visualize: true
      })
    })

    ipcRenderer.once('deleted', (event: any, arg: any) => {
      console.log('cluster deleted', arg)
      setStore({
        ...Store,
        deploying: false,
        awsDeployPage: true,
        visualize: true
      })
    })

  const classes = useStyles(); // this is showing an error but this is directly from Material-UI and is fine
  // renders the display section (name input field) buttons to add or remove clusters from the display, and the deploy section (inputs for name, ARN, subnets, dropdown for region, and deploy/delete/back/buttons)
  return (
      <Grid
        container
        direction="column"
        justify="space-around"
        alignItems="center"
        >
        <div className="deployWrapper">
         <div className="fetchAWS">
          <Typography className={classes.text} variant="h6">AWS Cluster(s) to Visualize:</Typography>
            <TextField
              id="standard-helperText"
              label="cluster name(s)"
              className={classes.textField}
              helperText="Enter AWS cluster(s) to remove or add..."
              margin="normal"
              onChange={handleName}
            />

            <div className='loc'>
              <FormControl className={classes.formControl}>
                <InputLabel id="visualLocation">AWS Region</InputLabel>
                  <Select
                    labelId="visualLocation"
                    id="visualLocation"
                    open={open}
                    onClose={handleClose}
                    onOpen={handleOpen}
                    value={zone}
                    onChange={handleChange}
                  >
                <MenuItem value=""><em>Select Region</em></MenuItem>
                <MenuItem value={'us-east-1'}>US East 1</MenuItem>
                <MenuItem value={'us-east-2'}>US East 2</MenuItem>
                <MenuItem value={'us-west-1'}>US West 1</MenuItem>
                <MenuItem value={'us-west-2'}>US West 2</MenuItem>
              </Select>
            </FormControl>
          </div>

            <div id="awsButtons">
              <Button variant="contained" color="secondary" className={classes.button} onClick={handleFetchSubmit}>Add Cluster</Button>
              <Button variant="outlined" color="secondary" className={classes.button} onClick={handleRemove}>Remove Cluster</Button>
            </div>
          </div>
        <Divider />
          <div className="inputPageDeploy">
            <Typography className={classes.text} variant="h6">Deploy/Delete AWS Cluster(s):</Typography>
            <TextField
              id="standard-helperText"
              label="clusterName"
              className={classes.textField}
              helperText="Enter a name for the AWS cluster..."
              margin="normal"
              onChange={handleDeployName}
            />
            <TextField
              id="standard-helperText"
              label="Role ARN"
              className={classes.textField}
              helperText="Enter a role ARN for the cluster..."
              margin="normal"
              onChange={handleDeployArn}
            />
            <TextField
              id="standard-helperText"
              label="Subnet ID 1"
              className={classes.textField}
              helperText="Please provide the 1st of 2 subnets..."
              margin="normal"
              onChange={handleSubnet1}
            />
            <TextField
              id="standard-helperText"
              label="Subnet ID 2"
              className={classes.textField}
              helperText="Please provide the 2nd of 2 subnets..."
              margin="normal"
              onChange={handleSubnet2}
            />
          <div className='loc'>
            <FormControl className={classes.formControl}>
              <InputLabel id="deployLoc">AWS Deploy Region</InputLabel>
                <Select
                  labelId="deployLoc"
                  id="deployLoc"
                  open={regOpen}
                  onClose={handleRegClose}
                  onOpen={handleRegOpen}
                  value={region}
                  onChange={handleRegionChange}
                >
                <MenuItem value=""><em>Choose Region</em></MenuItem>
                <MenuItem value={'us-east-1'}>US East 1</MenuItem>
                <MenuItem value={'us-east-2'}>US East 2</MenuItem>
                <MenuItem value={'us-west-1'}>US West 1</MenuItem>
                <MenuItem value={'us-west-2'}>US West 2</MenuItem>
              </Select>
            </FormControl>
          </div>

          <div id='buttons'>
            <Button variant="contained" color="secondary" className={classes.button} onClick={handleDeploySubmit}>Deploy Cluster</Button>
            <Button variant="outlined" color="secondary" className={classes.button} onClick={handleDelete}>Delete Cluster</Button>
          </div>
          <div id='buttonToGoBack'>
            <Button variant="outlined"  className={classes.button} onClick={handleBack}>Back</Button>
          </div>
        </div>
      </div>
    </Grid>
  )
}

export default AWSDeploy;
