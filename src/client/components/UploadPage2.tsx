import * as React from 'react';
import { useState, useEffect, useContext } from 'react';
import DisplayContainer from './DisplayContainer';
import {StoreContext} from '../../../store';
const { ipcRenderer } = require('electron');

const UploadPage = () => {

    const [Store, setStore] = useContext(StoreContext);

    ipcRenderer.on('clusterClient', (event: any, arg: any) => {
        // setStore is async so console.logging right away won't be accurate
        setStore({...Store, gcp: arg});
        // console.log('Da Store after', Store);
        // event.returnValue = 'done';
        // console.log(argument);
    })

    const handleInput = (e: React.FormEvent<HTMLInputElement>) => {
        setStore({...Store, credentials:e.currentTarget.value})
        // console.log('state after updating text', Store);
    }
    const handleBack = ()=>{
      setStore({...Store, landingPageState2:false})
    }
    const handleSubmit = () => {
        // console.log(Store.credentials);
        const creds = JSON.parse(Store.credentials); // strings need to be in double quotes
        //console.log('type of creds: ', creds);
        if(typeof creds !== 'object'){
          console.log('Enter a JSON object from GCP');
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
    // const handleLoc = (event) => {
    //   setStore({...Store, gcploc: event.currentTarget.value});      
    // }
    return <div>{Store.uploadPageState ? <DisplayContainer /> :
        <div className='uploadDiv'>
            <div>
              <img className='kubUpload' src={require('../assets/credsPage/aws.png')}/>
              <div className='kubUploadText'>The All Seeing Kubernati</div>
            </div>
        <input className='uploadInput' type="text" onChange={handleInput} placeholder="Enter Cluster Info"/>
        <div id="uploadPage2SubmitandBackButts">
        <button id="uploadPage2Submit" className='uploadButt' onClick={handleSubmit}>Submit</button>
        &nbsp;
        <button id="uploadPage2BackButt" className = 'backButton' onClick={handleBack}>  Back  </button>
        </div>
        {/* <select className='loc' onChange={handleLoc}>
        <option value='US East (N.Virginia)'>us-central1-a</option>
        <option value='US East (Ohio)'>us-central1-b</option>
        <option value='US West (N. California)'>us-central1-c</option>
        <option value='US West (Oregon)'>us-central1-c</option>
        <option value='Asia Pacific (Hong Kong)'>us-central1-c</option>
        <option value='Asia Pacific (Mumbai)'>us-central1-c</option>
        <option value='Asia Pacific (Seoul)'>us-central1-c</option>
        <option value='Asia Pacific (Singapore)'>us-central1-c</option>
        <option value='Asia Pacific (Sydney)'>us-central1-c</option>
        <option value='Asia Pacific (Tokyo)'>us-central1-c</option>
        <option value='Canada (Central)'>us-central1-c</option>
        <option value='EU (Frankfurt)'>us-central1-c</option>
        <option value='EU (Ireland)'>us-central1-c</option>
        <option value='EU (London)'>us-central1-c</option>
        <option value='EU (Paris)'>us-central1-c</option>
        <option value='EU (Stockholm)'>us-central1-c</option>
        <option value='Middle East (Bahrain)'>us-central1-c</option>
        <option value='South America (Sao Paulo)'>us-central1-c</option>
        </select> */}
        
        </div>
}</div>
}

export default UploadPage;
