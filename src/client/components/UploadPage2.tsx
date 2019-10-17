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

const UploadPage = () => {
  const [Store, setStore] = useContext(StoreContext);

  ipcRenderer.on('clusterClient2', (event: any, arg: any) => {
    setStore({...Store, gcp: arg});
  });
    ipcRenderer.on('clusterClient2', (event: any, arg: any) => {

        setStore({...Store, clusters: arg, clusterCount: 1});
    })

    const handleKey = (e: React.FormEvent<HTMLInputElement>) => {
      console.log(e.currentTarget.value)  
      setStore({...Store, awsKey:e.currentTarget.value})
    }
    const handleSecret = (e: React.FormEvent<HTMLInputElement>) => {
      console.log(e.currentTarget.value)  
      setStore({...Store, awsSecret:e.currentTarget.value})
    }
    const handleName = (e: React.FormEvent<HTMLInputElement>) => {
      console.log(e.currentTarget.value)  
      setStore({...Store, clusterName:e.currentTarget.value})
    }
    const handleBack = ()=>{
      setStore({...Store, landingPageState2:false})
    }
    const handleSubmit = () => {
        // const creds = JSON.parse(Store.credentials);
        const arg = {name: Store.clusterName, accessKeyId: Store.awsKey, secretAccessKey: Store.awsSecret, region: "us-east-2"}
         
        ipcRenderer.send('asynchronous-message2', arg)
        setStore({...Store, uploadPageState: true});
      //  }
    }
    return (
      <>
        {Store.uploadPageState ? <DisplayContainer /> :
        <div className='uploadDiv'>
            <div className="awsImageContainer">
              <img className='kubUpload' src={require('../assets/credsPage/aws.png')}/>
              <div className='kubUploadText'>Amazon Web Services</div>
            </div>
        <input className='uploadInput' type="text" onChange={handleKey} placeholder="awsKey"/>
        <input className='uploadInput' type="text" onChange={handleSecret} placeholder="awsSecret"/>
        <input className='uploadInput' type="text" onChange={handleName} placeholder="clusterName"/>
        <div id="uploadPage2SubmitandBackButts">
        <button id="uploadPage2Submit" className='uploadButt' onClick={handleSubmit}>Submit</button>
        <button id="uploadPage2BackButt" className = 'backButton' onClick={handleBack}>  Back  </button>
        </div>
        </div>
        }   
      </>
    )
}

export default UploadPage;
