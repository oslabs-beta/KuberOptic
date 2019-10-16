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
    let clusters;
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

    if (Store.clusters) {
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


    return(
        <div id='leSidebar'>
          <div className="buttons">
            <button className="SB" onClick={handleDeploy}> Deploy! </button>
            <button className="SB" onClick ={handleBack}> Back </button>
          </div>
          <center className="deployedTitle"><h3>Deployed Clusters</h3></center>
          {Store.clusters ? 
          <div className="clusterDeets"> 
          {clusters} 
          </div> : 
          <div></div>
          }
        </div>
    )
}

export default SideBar;
