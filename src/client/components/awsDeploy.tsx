import * as React from 'react';
import { useContext } from 'react';
import {StoreContext} from '../../../store'
const [fetchAWS] = require('../../main/aws/getAWSData').default
import 'tachyons'
const { ipcRenderer } = require('electron');
import fs from 'fs'
const AWS = require('aws-sdk')
let input = {};

const awsDeploy = () =>{
  const [Store, setStore] = useContext(StoreContext);
  
  const handleDeployName = (e) => {
      // input['name'] = event.currentTarget.value;
      setStore({...Store, awsDeployName: e.currentTarget.value})
  }

  const handleName = (e: React.FormEvent<HTMLInputElement>) => {
    console.log('handleName', e.currentTarget.value)  
    setStore({...Store, awsClusterName: e.currentTarget.value.split(", ")})
  }
  
  const handleDeployArn = (e) => {
    setStore({...Store, awsDeployRoleArn: e.currentTarget.value})
  }

  const handleLoc = (e) => {
    setStore({...Store, awsDeployRegion: e.currentTarget.value})
    //  input['zone'] = event.currentTarget.value;
  }

  // const handleRegion = (e) => {
  //   setStore({...Store, awsDisplayRegion: e.currentTarget.value})
  //   console.log('region is', Store.awsDisplayRegion)
  // }

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
      // subnetIds: ['subnet-06197f57dh38dlas8', 'subnet-dj48djs0k4e2ca240']
    }
      // create(Store.credentials, input['zone'], input)
      setStore({...Store, awsDeployPage: true})
      ipcRenderer.send('create-aws', arg)
  }

  const handleFetchSubmit = () => {
    console.log('ClusterName array is', Store.awsClusterName)
    if (Store.awsClusterName.length === 0) {
      const arg = {
      region: Store.awsDisplayRegion
      }
      console.log('no name, moving to main list-aws')
      ipcRenderer.send('list-aws', arg)
    }
    
    const arg = {
      name: Store.awsClusterName, 
      accessKeyId: Store.awsKey, 
      secretAccessKey: Store.awsSecret, 
      region: Store.awsDeployRegion
    }
    console.log('handleFetchSubmit function')
    ipcRenderer.send('asynchronous-message2', arg)
  }

  // const awsRegionDisplay = (array) => {
  //   setStore({...Store, awsClusterName: array})
  //   const arg = {
  //     name: Store.awsClusterName, 
  //     accessKeyId: Store.awsKey, 
  //     secretAccessKey: Store.awsSecret, 
  //     region: Store.awsDeployRegion
  //   }
    
  //   ipcRenderer.send('asynchronous-message2', arg)
  // }

  // ipcRenderer.on('awsRegionDisplay', (event: any, arg: any) => {
  //   console.log('running awsRegionDisplay in awsDeploy.tsx')
  //   awsRegionDisplay(arg)
  // })

  const handleSubnet1 = (e) => {
    setStore({...Store, awsSubnet1: e.currentTarget.value})
  }

  const handleSubnet2 = (e) => {
    setStore({...Store, awsSubnet2: e.currentTarget.value})
  }


  const handleRemove = () => {
    //make copy of clusters array via slice
    console.log('clusters: ', Store.clusters)
    let clusterArrCopy = Store.clusters.slice();
    //go through all elements of copy clusters array
    for (let i = 0; i < clusterArrCopy.length; i++) {
        //if you find one where the name matches, splice out from copied array
      if (clusterArrCopy[i].clusterName === Store.awsClusterName) {
        clusterArrCopy.splice(i, 1)
        clusterArrCopy = clusterArrCopy;
      }
    }
    //set store of clusters to copied array 
    console.log('clusterArrCopy: ', clusterArrCopy)
    setStore({...Store, clusters: clusterArrCopy, awsDeployPage: true})
    console.log('clusters: ', Store.clusters)
  }

  const handleDelete = () => {
    console.log('in handleDelete')
    const arg = {
      name: Store.awsDeployName,
      accessKeyId: Store.awsKey,
      secretAccessKey: Store.awsSecret,
      region: Store.awsDeployRegion,
    }

    ipcRenderer.send('delete-aws', arg);
  }

  return (
  <div className="deployWrapper">
    <div className="fetchAWS">
      <h3 className="deployTitle">Add/Remove AWS Clusters by Name:</h3> 
      <input className='awsGetClusterName' type="text" onChange={handleName} placeholder="clusterName"></input>
      {/* <div>
      <select id='deployLoc' className='loc' onChange={handleRegion}>
      <option selected>Choose a location to display</option>
      <option value='us-east-1'>us-east-1</option>
      <option value='us-east-2'>us-east-2</option>
      <option value='us-west-1'>us-west-1</option>
      <option value='us-west-2'>us-west-2</option>
      </select>
      </div> */}
      <div id="uploadPage2SubmitandBackButts">
        <button id="uploadPage2Submit" className='uploadButt' onClick={handleFetchSubmit}>Add Cluster</button>
        <button id="uploadPage2BackButt" className = 'backButton' onClick={handleRemove}>Remove Cluster</button>
      </div>
    </div>
    <br/><br/><br/><br/>
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
      <div>
      <button id="uploadPage2BackButt" className = 'backButton' onClick={handleBack}>  Back  </button>
      </div>
    </div>
  </div>
      )
}

export default awsDeploy;
