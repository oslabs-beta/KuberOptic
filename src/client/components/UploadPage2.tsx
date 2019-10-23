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

  const handleKey = (e: React.FormEvent<HTMLInputElement>) => {
    console.log(e.currentTarget.value)  
    setStore({...Store, awsKey: e.currentTarget.value})
  }

  const handleSecret = (e: React.FormEvent<HTMLInputElement>) => {
    console.log(e.currentTarget.value)  
    setStore({...Store, awsSecret: e.currentTarget.value})
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

  const handleSubmit = () => {
    if(typeof Store.awsSecret !== 'string' || typeof Store.awsKey !== 'string'){
      console.log('Enter a AWS key/secret to access AWS');
    }
    else {
      const arg = {
        // name: Store.awsClusterName, 
        accessKeyId: Store.awsKey, 
        secretAccessKey: Store.awsSecret, 
        region: "us-east-2"
      }
      // ipcRenderer.send('asynchronous-message2', arg)
      ipcRenderer.send('aws-login')
      setStore({...Store, uploadPageState2: true, awsDeployPage: true});
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
