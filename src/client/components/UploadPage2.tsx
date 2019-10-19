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
import DisplayContainer from './DisplayContainer';
import {StoreContext} from '../../../store';
const { ipcRenderer } = require('electron');

const UploadPage2 = () => {
  const [Store, setStore] = useContext(StoreContext);

  ipcRenderer.on('clusterClient2', (event: any, arg: any) => {
    if(Store.clusterCount){
      let newClusters = Store.clusters;
      arg.forEach(el=> newClusters.push(el))
      setStore({...Store, clusters: newClusters, clusterCount: newClusters.length })
    }
    else setStore({...Store, clusters: arg, clusterCount: arg.length });
    event.returnValue = 'done';
  })

  const handleKey = (e: React.FormEvent<HTMLInputElement>) => {
    console.log(e.currentTarget.value)  
    setStore({...Store, awsKey: e.currentTarget.value})
  }

  const handleSecret = (e: React.FormEvent<HTMLInputElement>) => {
    console.log(e.currentTarget.value)  
    setStore({...Store, awsSecret: e.currentTarget.value})
  }

  const handleName = (e: React.FormEvent<HTMLInputElement>) => {
    console.log(e.currentTarget.value)  
    setStore({...Store, awsClusterName: e.currentTarget.value})
  }

  const handleBack = ()=>{
    setStore({...Store, landingPageState2: false})
  }

  const handleSubmit = () => {
    if(typeof Store.awsSecret !== 'string' || typeof Store.awsKey !== 'string'){
      console.log('Enter a AWS key/secret to access AWS');
    }
    else {
      const arg = {
        name: Store.awsClusterName, 
        accessKeyId: Store.awsKey, 
        secretAccessKey: Store.awsSecret, 
        region: "us-east-2"
      }
      ipcRenderer.send('asynchronous-message2', arg)
      setStore({...Store, uploadPageState2: true});
    }
  }

  return (
    // <>
    //   {Store.uploadPageState2 ? <DisplayContainer /> :
      <div className='uploadDiv'>
        <div className="awsImageContainer">
          <img className='kubUpload' src={require('../assets/credsPage/aws.png')}/>
          <div className='kubUploadText'>Amazon Web Services</div>
        </div>
        <input className='uploadInput' type="text" onChange={handleKey}  placeholder="awsKey" required={true}></input>
        <input className='uploadInput' type="text" onChange={handleSecret} placeholder="awsSecret" required={true}></input>
        <input className='uploadInput' type="text" onChange={handleName} placeholder="clusterName"></input>
        <div id="uploadPage2SubmitandBackButts">
          <button id="uploadPage2Submit" className='uploadButt' onClick={handleSubmit}>Submit</button>
          <button id="uploadPage2BackButt" className = 'backButton' onClick={handleBack}>Back</button>
        </div>
      </div>
    //   }   
    // </>
  )
}

export default UploadPage2;
