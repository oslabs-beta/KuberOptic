import React from 'react';
import { useState, useEffect, useContext } from 'react';
import {StoreContext} from '../../../store'

const SideBar = () =>{
    const [Store, setStore] = useContext(StoreContext);
    const handleDeploy = () =>{
        setStore({...Store, gcpDeployPage:true})
    }
    const handleBack = ()=>{
        setStore({...Store, landingPageState2:false, landingPageState:false,
             uploadPageState:false, uploadPageState2:false})
    }
    return(
        <div id='leSidebar'>
            <p>Options</p>
        <button onClick={handleDeploy}> Deploy! </button>
        <button onClick ={handleBack}> Back </button>
        </div>
    )
}

export default SideBar;
