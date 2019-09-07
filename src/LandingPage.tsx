import React, { useState, useEffect, useContext } from 'react';
// import { type } from 'os';
// import { BrowserRouter as Flash, Link, Redirect} from 'react-router-dom';
// import Route from 'react-router-dom';
import UploadPage from '../UploadPage';
import {StoreContext} from '../store';


const LandingPage = () => {
    const [Store, setStore] = useContext(StoreContext);

    const myFunction = () => {
        console.log(Store.landingPageState);
        setStore({...Store, landingPageState: true})
        
    }

    return (
      <div>
      {Store.landingPageState ? <UploadPage /> :
        <div>   
          <div><img className='kubLogo' src="../kub.png"/></div>
          <div className='text'>The All Seeing Kubernati</div>  
        <img className='logo' src="../aws.png" onClick={myFunction}/>
        <img className='logo1' src="../azure2.png" onClick={myFunction}/>
        <img className='logo2' src="../google.png" onClick={myFunction}/>
        </div>
    }
    </div>
    )
}


export default LandingPage;