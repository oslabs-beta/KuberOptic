import React, { useState, useEffect, useContext } from 'react';
// import { type } from 'os';
// import { BrowserRouter as Flash, Link, Redirect} from 'react-router-dom';
// import Route from 'react-router-dom';
import UploadPage from './UploadPage';
import {StoreContext} from '../../../store';

const LandingPage = () => {
    const [Store, setStore] = useContext(StoreContext);

    const myFunction = () => {
        console.log(Store.landingPageState);
        setStore({...Store, landingPageState: true})
        
    }
//
    return (
      <div>
      {Store.landingPageState ? <UploadPage /> :
        <div>   
          <div><img className='kubLogo' src="../assets/credsPage/kub.png"/></div>
          <div className='text'>The All Seeing Kubernati</div>  
        <img className='logo' src="../assets/credsPage/aws.png" onClick={myFunction}/>
        <img className='logo1' src="../assets/credsPage/azure2.png" onClick={myFunction}/>
        <img className='logo2' src="../assets/credsPage/google.png" onClick={myFunction}/>
        </div>
    }
    </div>
    )
}


export default LandingPage;