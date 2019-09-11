import React, { useState, useEffect, useContext } from 'react';

import UploadPage from './UploadPage';
import UploadPage2 from './UploadPage2'
import {StoreContext} from '../../../store';
const LandingPage = () => {
  const [Store, setStore] = useContext(StoreContext);

  const myFunctionG = () => {
      console.log(Store.landingPageState);
      setStore({...Store, landingPageState: true})
  }
  const myFunctionA = () => {
    console.log(Store.landingPageState2);
    setStore({...Store, landingPageState2: true})
  }

    return (
      <div>
      {Store.landingPageState ? <UploadPage /> :
       Store.landingPageState2 ? <UploadPage2/> :
        <div className='mainDiv'>
          <div><img className='kubLogo' src={require('../assets/credsPage/kub.png')}/></div>
          <div className='text'>The All Seeing Kubernati</div>
        <img className='logo' src={require('../assets/credsPage/aws.png')} onClick={myFunctionA}/>
        {/* <img className='logo1' src={require("../assets/credsPage/azure2.png")} onClick={myFunctionG}/> */}
        <img className='logo2' src={require("../assets/credsPage/google.png")} onClick={myFunctionG}/>
        </div>
    }
    </div>
    )
}


export default LandingPage;
