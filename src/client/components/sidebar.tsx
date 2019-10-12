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

const SideBar = () =>{
    const [Store, setStore] = useContext(StoreContext);
    const handleDeploy = () =>{
        setStore({...Store, gcpDeployPage:true})
    }
    const handleBack = ()=>{
        setStore({
          ...Store, 
          landingPageState2:false, 
          landingPageState:false,
          uploadPageState:false,
          uploadPageState2:false, 
          credentials: {}, 
          clusters: null, 
          clusterCount: 0,
          gcploc: null
        })
    }
    return(
        <div id='leSidebar'>
        <button className="SB" onClick={handleDeploy}> Deploy! </button>
        <button className="SB" onClick ={handleBack}> Back </button>
        </div>
    )
}

export default SideBar;
