import * as React from 'react';
// import * as ReactDOM from 'react-dom';
import { useState, useEffect, useContext } from 'react';
// import { type } from 'os';
// import { BrowserRouter as Flash, Link, Redirect} from 'react-router-dom';
// import Route from 'react-router-dom';
import DisplayContainer from './DisplayContainer';
import {StoreContext} from './store';
const { ipcRenderer } = require('electron');
// import path from 'path';

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
//


    const handleSubmit = () => {
        // console.log(Store.credentials);
        const creds = JSON.parse(Store.credentials); // strings need to be in double quotes
        console.log('type of creds: ', creds);
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

    return <div>{Store.uploadPageState ? <DisplayContainer /> :
        <div className='uploadDiv'>
            <div>
              <img className='kubUpload' src='.././kub2.png'/>
              <div className='kubUploadText'>The All Seeing Kubernati</div>
            </div>
        <input className='uploadInput' type="text" onChange={handleInput} placeholder="Enter Cluster Info"/>
        <button className='uploadButt' onClick={handleSubmit}>Submit</button>
        </div>
}</div>
}

export default UploadPage;
