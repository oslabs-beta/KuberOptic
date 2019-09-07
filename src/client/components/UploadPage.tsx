import * as React from 'react';
import { useState, useEffect, useContext } from 'react';
import DisplayContainer from './DisplayContainer';
import {StoreContext} from '../../../store';
const { ipcRenderer } = require('electron');
const UploadPage = () => {

    const [Store, setStore] = useContext(StoreContext);

    ipcRenderer.on('clusterClient', (event: any, arg: any) => {
        // add argument to store
        // console.log('change gcp to store to',arg);
        // console.log('Da Store before', Store);
        // update gcp data to store
        Store.gcp = arg;
        // setStore({...Store, gcp: arg});
        console.log('Da Store after', Store);
        event.returnValue = 'done';
        // console.log(argument);
    })

    const handleInput = (e: React.FormEvent<HTMLInputElement>) => {
        setStore({...Store, credentials:e.currentTarget.value})

    }
    const handleBack = ()=>{
      setStore({...Store, landingPageState:false})
    }

    const handleSubmit = () => {
        // console.log(Store.credentials);
        const creds = JSON.parse(Store.credentials); // strings need to be in double quotes
        //console.log('type of creds: ', creds);
        if(typeof creds !== 'object'){
          console.log('Enter a JSON object from GCP');
          console.log('locStore: ', Store.gcploc)
          // document.getElementsByClassName('uploadInput')[0].innerHTML = '';
          // setStore({...Store, credentials: ''})
        }
        else{
          ipcRenderer.send('asynchronous-message', creds)
          // console.log(Store.credentials)
          // console.log(Store.uploadPageState)
          setStore({...Store, uploadPageState: true});
          // console.log(`this is landing page ${Store.landingPageState}`)
        }
    }
    const handleLoc = (event) => {
      setStore({...Store, gcploc: event.currentTarget.value});      
    }
    return <div>{Store.uploadPageState ? <DisplayContainer /> :
        <div className='uploadDiv'>
            <div>
              <img className='kubUpload' src={require('../assets/credsPage/google.png')}/>
              <div className='kubUploadText'>Google Cloud Platform</div>
            </div>
        
        <input className='uploadInput' type="text" onChange={handleInput} placeholder="Enter Cluster Info"/>
        <button className='uploadButt' onClick={handleSubmit}> Submit </button>
        <button className = 'backButton' onClick={handleBack}>  Back  </button>
        <select className='loc' onChange={handleLoc}>
        <option value='us-central1-a'>us-central1-a</option>
        <option value='us-central1-b'>us-central1-b</option>
        <option value='us-central1-c'>us-central1-c</option>
        </select>
        
        </div>
}</div>
}

export default UploadPage;
