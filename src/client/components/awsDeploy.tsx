import * as React from 'react';
import { useContext } from 'react';
import {StoreContext} from '../../../store'
const { ipcRenderer } = require('electron');

import Divider from '@material-ui/core/Divider';
import fs from 'fs'
const AWS = require('aws-sdk')
let input = {};

const awsDeploy = () =>{
  const [Store, setStore] = useContext(StoreContext);
  
  // sets store to the cluster name from the input field
  const handleName = (e: React.FormEvent<HTMLInputElement>) => {
    setStore({...Store, awsClusterName: e.currentTarget.value.split(", ")})
  }
  
  // beginning of function to retrieve cluster data by name. Sets store to the cluster name and sends to 'asynchronous-message2' where fetchAWS is called. 
  const handleFetchSubmit = () => {
    if (Store.awsClusterName.length === 0) {
      const arg = {
      region: Store.awsDisplayRegion
      }
      ipcRenderer.send('list-aws', arg)
    }
    const arg = {
      name: Store.awsClusterName, 
      accessKeyId: Store.awsKey, 
      secretAccessKey: Store.awsSecret, 
      region: Store.awsDeployRegion
    }
    ipcRenderer.send('asynchronous-message2', arg)
  }

  // removes a cluster from the visualizer by name by removing it from the store array of cluster names
  const handleRemove = () => {
    let clusterArrCopy = Store.clusters.slice();
    for (let i = 0; i < clusterArrCopy.length; i++) {
      if (clusterArrCopy[i].clusterName === Store.awsClusterName) {
        clusterArrCopy.splice(i, 1)
        clusterArrCopy = clusterArrCopy;
      }
    }
    setStore({...Store, clusters: clusterArrCopy, awsDeployPage: true})
  }

  // sets store to the cluster name for a new cluster 
  const handleDeployName = (e) => {
      setStore({...Store, awsDeployName: e.currentTarget.value})
  }

  // sets store to AWS ARN for cluster deployment
  const handleDeployArn = (e) => {
    setStore({...Store, awsDeployRoleArn: e.currentTarget.value})
  }

  // following 2 functions set the 2 subnets to the store for cluster deployment
  const handleSubnet1 = (e) => {
    setStore({...Store, awsSubnet1: e.currentTarget.value})
  }

  const handleSubnet2 = (e) => {
    setStore({...Store, awsSubnet2: e.currentTarget.value})
  }

  // sets store to location for cluster deployment
  const handleLoc = (e) => {
    setStore({...Store, awsDeployRegion: e.currentTarget.value})
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
      setStore({...Store, awsDeployPage: true})
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
      awsDeployRegion: null
    });
  }
  
  // renders the display section (name input field) buttons to add or remove clusters from the display, and the deploy section (inputs for name, ARN, subnets, dropdown for region, and deploy/delete/back/buttons)
  return (
  <div className="deployWrapper">
    <div className="fetchAWS">
      <h3 className="deployTitle">Add/Remove AWS Clusters by Name:</h3> 
      <input className='awsGetClusterName' type="text" onChange={handleName} placeholder="clusterName"></input>

      <div id="uploadPage2SubmitandBackButts">
        <button id="uploadPage2Submit" className='uploadButt' onClick={handleFetchSubmit}>Add Cluster</button>
        <button id="uploadPage2BackButt" className='uploadButt' onClick={handleRemove}>Remove Cluster</button>
      </div>
    </div>
    <Divider />

      <div className="inputPageDeploy">
      <h3 className="deployTitle">Deploy New AWS Cluster:</h3>
      <input className='awsDeployClusterName' type="text" onChange={handleDeployName} placeholder="Cluster Name"/>
      <input className='awsDeployClusterName' type="text" onChange={handleDeployArn} placeholder="Role ARN" />
      <input className='awsDeployClusterName' type="text" onChange={handleSubnet1} placeholder="Subnet ID 1" />
      <input className='awsDeployClusterName' type="text" onChange={handleSubnet2} placeholder="Subnet ID 2" />

      <div>
      <select id='deployLoc' className='loc' onChange={handleLoc}>
      <option selected>Choose a location to host</option>
      <option value='us-east-1'>us-east-1</option>
      <option value='us-east-2'>us-east-2</option>
      <option value='us-west-1'>us-west-1</option>
      <option value='us-west-2'>us-west-2</option>
      </select>
      </div>

      <div id='buts'>
      <button id="uploadPage2Submit" className='uploadButt' onClick={handleDeploySubmit}>Deploy Cluster</button>
      <button id="uploadPage2Submit" className="uploadButt" onClick={handleDelete}>Delete Cluster</button>
      </div>
      <div id='buttonToGoBack'>
      <button id="uploadPage2BackButt" className = 'backButton' onClick={handleBack}>  Back  </button>
      </div>
    </div>
  </div>
      )
}

export default awsDeploy;
