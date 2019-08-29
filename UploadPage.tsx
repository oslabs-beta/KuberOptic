import * as React from 'react';
// import * as ReactDOM from 'react-dom';
import { useState, useEffect, useContext } from 'react';
// import { type } from 'os';
// import { BrowserRouter as Flash, Link, Redirect} from 'react-router-dom';
// import Route from 'react-router-dom';
import DisplayContainer from './DisplayContainer';
import {StoreContext} from './store';
// import path from 'path';




const UploadPage = () => {

    const [Store, setStore] = useContext(StoreContext);

    const handleInput = (e: React.FormEvent<HTMLInputElement>) => {
        setStore({...Store, credentials:e.currentTarget.value})

    }


    const handleSubmit = () => {
        console.log(Store)
        // console.log(Store.uploadPageState)
        setStore({...Store, uploadPageState: true});
        console.log(`this is landing page ${Store.landingPageState}`)
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


