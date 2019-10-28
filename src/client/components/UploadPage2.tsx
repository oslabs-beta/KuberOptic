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

import * as React from 'react';
import { useContext } from 'react';
// import DisplayContainer from './DisplayContainer';
import {StoreContext} from '../../../store';
const { ipcRenderer } = require('electron');
import AWSDeploy from './awsDeploy'

const UploadPage2 = () => {
  const [Store, setStore] = useContext(StoreContext);

  ipcRenderer.on('clusterClient2', (event: any, arg: any) => {
    console.log('event on upload ',event);
    // if(Store.clusterCount){
      let newClusters = Store.clusters.slice();
      arg.forEach(el=> newClusters.push(el))
      setStore({...Store, clusters: newClusters, clusterCount: newClusters.length })
      console.log('clusters: ', newClusters, 'cluster count: ', Store.clusterCount, 'aws cluster names: ', Store.awsClusterName)
    // }
    // else setStore({...Store, clusters: arg, clusterCount: arg.length });
    console.log('arg :', arg)
    // console.log('clusters: ', Store.clusters, 'cluster count: ', Store.clusterCount, 'aws cluster names: ', Store.awsClusterName)
    event.returnValue = 'done';
  })

  ipcRenderer.on('createCluster2', (event: any, arg: any) => {

  })


  ipcRenderer.on('awsRegionDisplayFunc', (event: any, arg: any) => {
    console.log('running awsRegionDisplay')
    awsRegionDisplay(arg)
  })

    const awsRegionDisplay = (array) => {
    setStore({...Store, awsClusterName: array})
    const arg = {
      name: array, 
      accessKeyId: Store.awsKey, 
      secretAccessKey: Store.awsSecret, 
      region: Store.awsDisplayRegion
    }
    console.log('awsRegionDisplay arg: ', arg)
    ipcRenderer.send('asynchronous-message2', arg)
    setStore({...Store, uploadPageState2: true, awsDeployPage: true});

  }

  const handleKey = (e: React.FormEvent<HTMLInputElement>) => {
    console.log(e.currentTarget.value)  
    setStore({...Store, awsKey: e.currentTarget.value})
  }

  const handleSecret = (e: React.FormEvent<HTMLInputElement>) => {
    console.log(e.currentTarget.value)  
    setStore({...Store, awsSecret: e.currentTarget.value})
  }

  const handleRegion = (e) => {
    setStore({...Store, awsDisplayRegion: e.currentTarget.value})
    console.log('region is', Store.awsDisplayRegion)
  }

  // const handleName = (e: React.FormEvent<HTMLInputElement>) => {
  //   console.log(e.currentTarget.value)  
  //   setStore({...Store, awsClusterName: e.currentTarget.value})
  // }

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

  function handleSubmit() {
    console.log('handleSubmit region is', Store.awsDisplayRegion)
    if(typeof Store.awsSecret !== 'string' || typeof Store.awsKey !== 'string'){
      console.log('Enter a AWS key/secret to access AWS');
    }
    else {
      const arg = {
        // name: Store.awsClusterName, 
        accessKeyId: Store.awsKey, 
        secretAccessKey: Store.awsSecret, 
        region: Store.awsDisplayRegion
      }
      ipcRenderer.send('aws-login', arg)
      // setStore({...Store, uploadPageState2: true, awsDeployPage: true});
    }
  }

  return (
    // <>
    //   {Store.uploadPageState2 ? <DisplayContainer /> :
    <>
        { Store.awsDeployPage ? <AWSDeploy/> :
      <div className='uploadDiv'>
        <div className="awsImageContainer">
          <img className='kubUpload' src={require('../assets/credsPage/aws.png')}/>
          <div className='kubUploadText'>Amazon Web Services</div>
        </div>
        <input className='uploadInput' type="text" onChange={handleKey}  placeholder="awsKey" required={true}></input>
        <input className='uploadInput' type="text" onChange={handleSecret} placeholder="awsSecret" required={true}></input>
        {/* <input className='uploadInput' type="text" onChange={handleName} placeholder="clusterName"></input> */}
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
