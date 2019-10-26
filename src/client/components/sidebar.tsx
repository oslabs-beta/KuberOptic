/**
 * ************************************
 *
 * @module  sidebar.tsx
 * @author
 * @date
 * @description sidebar to be used inside visualizer.tsx
 *
 * ************************************
 */

import React from 'react';
import { useState, useEffect, useContext } from 'react';
import {StoreContext} from '../../../store'
import UploadPage from './UploadPage';
import UploadPage2 from './UploadPage2';


const SideBar = () =>{
  const [Store, setStore] = useContext(StoreContext);

  const myFunctionG = () => {
    console.log(Store.uploadPageState);
    setStore({...Store, 
      uploadPageState: true,
    });
  }

  // function to get to the Amazon Web Services upload page
  const myFunctionA = () => {
    console.log(Store.uploadPageState2);
    setStore({...Store, 
      uploadPageState2: true,
    });
  }

  return (
    <div id='leSidebar'>
      { Store.uploadPageState ? <UploadPage/> :
        Store.uploadPageState2 ? <UploadPage2/> :
        <div id="displays">
          <div className='mainDiv'>
            <img className='kubLogo' src={'https://i.gifer.com/4P4X.gif'}/>
            <div className="landingTitle">
              <h1 className='title'>KuberOptic</h1>
              <h3 className='text'>The Kubernetes Visualizer</h3>
            </div>
            <div className= "awsAndGcpLogos">
              <img className='logo' src={require('../assets/credsPage/aws.png')} onClick={myFunctionA}/>
              <img className='logo2' src={require("../assets/credsPage/google.png")} onClick={myFunctionG}/>
            </div>
          </div>
        </div>
      }
    </div>
  )
}

export default SideBar;



