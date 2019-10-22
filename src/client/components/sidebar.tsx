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

  const handleDeploy = () =>{
    if(Store.uploadPageState) {
    setStore({...Store, gcpDeployPage:true})
    }
    if(Store.uploadPageState2) {
    setStore({...Store, awsDeployPage:true})
    }
  }
  const handleBack = ()=>{
    setStore({
      ...Store, 
      landingPageState2:false, 
      landingPageState:false,
      uploadPageState:false,
      uploadPageState2:false,
    })
  }

  // note: using in-line styling (e.g. 'center', 'em') is generally bad practice
  // it is better to style these things in a CSS sheet
  // also, I don't think these things work for React components
  if(Store.clusterCount && Store.uploadPageState2) {
    clusters = Store.clusters.map(clust => {
      return (
      <div className ="cluster">
        <center className="clusterTitle"><h4><em>{clust.clusterName}</em></h4></center> 
        <center className="clusterInformation"><p>
            Status: <em>{clust.clusterStatus}</em>
            <br></br>
            Nodes: <em>{clust.nodeCount}</em>
            <br></br>
            Location: <em>{clust.location}</em>
        </p></center>
      </div>
      )
    })
  }

  // note: using in-line styling (e.g. 'center', 'em') is generally bad practice
  // it is better to style these things in a CSS sheet
  if (Store.clusterCount && Store.uploadPageState) {
    clusters = Store.clusters.map(clust => {
      return (
      <div className ="cluster">
        <center className="clusterTitle"><h4><em>{clust.clusterName}</em></h4></center>
        <center className="clusterInformation"><p>
            Status: <em>{clust.clusterStatus}</em>
            <br></br>
            Nodes: <em>{clust.nodeCount}</em>
            <br></br>
            Location: <em>{clust.location}</em>
        </p></center>
      </div>
      )
    })
  }

  // if uploadPageState is true, display UploadPage
  // else if uploadPageState2 is true, display UploadPage2
  // else display LandingPage
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
            </div> : 
              <LandingPage/>
      }
    </div>
  )
}

export default SideBar;
