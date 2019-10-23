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
import LandingPage from './LandingPage'
import {StoreContext} from '../../../store'
import UploadPage from './UploadPage';
import UploadPage2 from './UploadPage2';
import GCPDeploy from './gcpDeploy';
import AWSDeploy from './awsDeploy';

const SideBar = () =>{
  const [Store, setStore] = useContext(StoreContext);
  let clusters;

  // const handleDeploy = () =>{
  //   if(Store.uploadPageState) {
  //   setStore({...Store, gcpDeployPage:true})
  //   }
  //   if(Store.uploadPageState2) {
  //   setStore({...Store, awsDeployPage:true})
  //   }
  // }
  const handleBack = ()=>{
    setStore({
      ...Store, 
      landingPageState2:false, 
      landingPageState:false,
      uploadPageState:false,
      uploadPageState2:false,
    })
  }

  if(Store.clusterCount && Store.uploadPageState2) {
    clusters = Store.clusters.map(clust => {
      return (
      <div className ="cluster">
        <h4 className="clusterTitle"><em>{clust.clusterName}</em></h4>
        <p className="clusterInformation">
            Status: <em>{clust.clusterStatus}</em>
            <br></br>
            Nodes: <em>{clust.nodeCount}</em>
            <br></br>
            Location: <em>{clust.location}</em>
        </p>
      </div>
      )
    })
  }

  if (Store.clusterCount && Store.uploadPageState) {
    clusters = Store.clusters.map(clust => {
      return (
      <div className ="cluster">
        <h4 className="clusterTitle"><em>{clust.clusterName}</em></h4>
        <p className="clusterInformation">
            Status: <em>{clust.clusterStatus}</em>
            <br></br>
            Nodes: <em>{clust.nodeCount}</em>
            <br></br>
            Location: <em>{clust.location}</em>
        </p>
      </div>
      )
    })
  }

  return(
      <div id='leSidebar'>
        { Store.uploadPageState ?
        <div>
        <UploadPage/> 
        {/* <GCPDeploy/>  */}
        </div> :
          Store.uploadPageState2 ?
          <div>
        <UploadPage2/> 
        {/* <AWSDeploy/> */}
        </div>
        : 
        <LandingPage/>
        }
       </div>
  )
}

export default SideBar;



