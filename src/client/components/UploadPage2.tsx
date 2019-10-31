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
// import DisplayContainer from './DisplayContainer';
import {StoreContext} from '../../../store';
const { ipcRenderer } = require('electron');
import AWSDeploy from './awsDeploy'

const UploadPage2 = () => {
  const [Store, setStore] = useContext(StoreContext);

  // 
 

  // iterates through the clusters submitted via the name or region, and adds to the array of clusters in the store. 
  ipcRenderer.on('clusterClient2', (event: any, arg: any) => {
    console.log('clusterClient2 and arg is', arg)
    let newClusters = Store.clusters.slice();
    arg.forEach(el=> newClusters.push(el))
    setStore({...Store, clusters: newClusters, clusterCount: newClusters.length })
    console.log('done')
    event.returnValue = 'done';
  })

  // this and the function below take in the cluster names from the listClusters method and sends them to 'asynchronous-message2' to be sent as arg for the describeCluster method
  ipcRenderer.on('awsRegionDisplayFunc', (event: any, arg: any) => {
    console.log('in uploadpage2 awsRegionDisplayFunc and arg is', arg)
    awsRegionDisplay(arg)
  })

  const awsRegionDisplay = (array) => {
    console.log('up2 awsRegionDisplay function and array is', array)
    setStore({...Store, awsClusterName: array})
    const arg = {
      name: array, 
      accessKeyId: Store.awsKey, 
      secretAccessKey: Store.awsSecret, 
      region: Store.awsDisplayRegion
    }
    ipcRenderer.send('asynchronous-message2', arg)
    setStore({...Store, uploadPageState2: true, awsDeployPage: true});
  }

  

  // updates the store with the AWS key entered into the input field
  const handleKey = (e: React.FormEvent<HTMLInputElement>) => {
    setStore({...Store, awsKey: e.currentTarget.value})
  }

  // updates the store with the AWS secret entered into the input field
  const handleSecret = (e: React.FormEvent<HTMLInputElement>) => {
    setStore({...Store, awsSecret: e.currentTarget.value})
  }

  // updates the store with the AWS region entered into the input field
  const handleRegion = (e) => {
    setStore({...Store, awsDisplayRegion: e.currentTarget.value})
  }

  // brings the display back to the landing page
  const handleBack = ()=>{
    setStore({
      ...Store,
      uploadPageState:false, 
      uploadPageState2:false,
      landingPageState: false,
      landingPageState2: false,
      credentials: null,
      clusterCount: 0,
      clusters: null
    });
  };

  // submits the AWS key, secret, and region to main.ts where the loginAWS function is invoked
  function handleSubmit() {
    if(typeof Store.awsSecret !== 'string' || typeof Store.awsKey !== 'string'){
      console.log('Enter a AWS key/secret to access AWS');
    }
    else {
      console.log('click')
      const arg = {
        accessKeyId: Store.awsKey, 
        secretAccessKey: Store.awsSecret, 
        region: Store.awsDisplayRegion
      }
      setStore({...Store, uploadPageState2: true, awsDeployPage: true})
      // ipcRenderer.send('aws-login', arg)
    }
  }

  // renders the login page, with input fields for AWS key, secret, and a drop down menu for US regions. 
  return (
    <>
        { Store.awsDeployPage ? <AWSDeploy/> :
      <div className='uploadDiv'>
        <div className="awsImageContainer">
          <img className='kubUpload' src={require('../assets/credsPage/aws.png')}/>
          <div className='kubUploadText'>Amazon Web Services</div>
        </div>
        <input className='uploadInput' type="text" onChange={handleKey}  placeholder="awsKey" required={true}></input>
        <input className='uploadInput' type="text" onChange={handleSecret} placeholder="awsSecret" required={true}></input>
      <div>
      <select id='deployLoc' className='loc' onChange={handleRegion}>
      <option selected>Choose a location to display</option>
      <option value='us-east-1'>us-east-1</option>
      <option value='us-east-2'>us-east-2</option>
      <option value='us-west-1'>us-west-1</option>
      <option value='us-west-2'>us-west-2</option>
      </select>
      </div>
        <div id="uploadPage2SubmitandBackButts">
          <button id="uploadPage2Submit" className='uploadButt' onClick={handleSubmit}>Submit</button>
          <button id="uploadPage2BackButt" className = 'backButton' onClick={handleBack}>Back</button>
        </div>
      </div>
      }   
    </>
  )
}

export default UploadPage2;
