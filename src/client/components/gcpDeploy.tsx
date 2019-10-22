/**
 * ************************************
 *
 * @module  gcpDeploy.tsx
 * @author
 * @date
 * @description page to determine deployment settings? Possibly making a post-style request to GCP to create a cluster
 *
 * ************************************
 */

import * as React from 'react';
import { useContext } from 'react';
import {StoreContext} from '../../../store'
const [quickstart, create] = require('../../main/gcp/getGCPdata').default
const { ipcRenderer } = require('electron');

require('events').EventEmitter.defaultMaxListeners = 25;
import GetGCP from './GcpGetClusters';
import 'tachyons'

// various inputs will be stored in this object and will be submitted when you call handleSubmit
let input = {};

const gcpDeploy = () =>{
  const [Store, setStore] = useContext(StoreContext);

  const handleName = (event) => {
    input['name'] = event.currentTarget.value;
  }
  const handleType = (event) => {
    input['clusterType'] = event.currentTarget.value;
  }
  const handleNodeCount = (event) => {
    input['count'] = event.currentTarget.value;
  }
  const handleLoc = (event) => {
    const location = event.currentTarget.value
    // setStore({...Store, gcploc: location})
    input['zone'] = location;
  }
  const handleBack = () => {
    return setStore({
      ...Store,
      uploadPageState:false, 
      // uploadPageState2:false,
      // landingPageState: false,
      // landingPageState2: false,
      gcpDeployPage:false,
      credentials: null,
      clusterCount: 0,
      clusters: null
    });
  }
  const handleDeploy = () =>{
    create(Store.credentials, input['zone'], input)
    const creds = JSON.parse(Store.credentials)
    setStore({...Store,
      gcpDeployPage:false, 
      uploadPageState: true
    })
    ipcRenderer.send('getNewClusters', creds, Store.gcploc);
  }

  ipcRenderer.on('newClusters', (event: any, arg: any) => {
    //logic incase we have more than one cluster already rendered
    if(Store.clusterCount){
      let newClusters = Store.clusters;
      arg.forEach(el=> newClusters.push(el))
      setStore({
        ...Store,
        clusters: newClusters,
        clusterCount: newClusters.length,
        gcpDeployPage:true,
       })
    }
    else setStore({
      ...Store,
       clusters: arg, 
       clusterCount: arg.length,
       gcpDeployPage:true,
       });
    event.returnValue = 'done';
  })

  return (
    <div id="deployWrapper">
      <GetGCP/>
      
      <div className="inputPageDeploy">
        <h3 className="deployTitle">Deploy New GCP Cluster:</h3>
          <input id="deployClustName" 
          name="name"
          className='clusterType' 
          type="text" 
          onChange={handleName} 
          placeholder="cluster name" 
          required={true}></input>

        <div id="deployDropDowns">
          <select id="deployChooseClustType" className='clusterType' onChange={handleType}>
          <option selected>Cluster type</option>
          <option value='affordable'>affordable</option>
          <option value='standard'>standard</option>
          <option value='cpuIntensive'>cpuIntensive</option>
          <option value='memoryIntensive'>memoryIntensive</option>
          <option value='gpuAcceleratedComputing'>gpuAcceleratedComputing</option>
          <option value='highly available'>highly available</option>
          </select>

          <select id='nodeCounter' className='clusterType' onChange={handleNodeCount}>
          <option selected># of Nodes</option>
          <option value='1'>1</option>
          <option value='2'>2</option>
          <option value='3'>3</option>
          <option value='4'>4</option>
          <option value='5'>5</option>
          </select>
        </div>

          <div className="deployLocTitle">
            <h3 className="deployTitle">Deploy Location</h3>
            <form className="nodeLocationRadios">
              <div className="div1">
                <label>  
                <input type="radio" name="location" value="us-central1-a" onChange={handleLoc}></input>
                  US Central (1A)
                </label>
              </div>
              <div className="div2">
                <label>  
                <input type="radio" name="location" value="us-central1-b" onChange={handleLoc}></input>
                  US Central (1B)
                </label>
              </div>
              <div className="div3">
                <label>  
                <input type="radio" name="location" value="us-central1-c" onChange={handleLoc}></input>
                  US Central (1C)
                </label>  
              </div>
              <div className="div4">
                <label>  
                <input type="radio" name="location" value="us-west1-a" onChange={handleLoc}></input>
                  US West (1A)
                </label>
              </div>
              <div className="div5">
                <label>  
                <input type="radio" name="location" value="southamerica-east1-a" onChange={handleLoc}></input>
                  S.America East (1A)
                </label>
              </div>
              <div className="div6">
                <label>  
                <input type="radio" name="location" value="southamerica-east1-b" onChange={handleLoc}></input>
                  S.America East (1B)
                </label>
              </div>
              <div className="div7">
                <label>  
                <input type="radio" name="location" value="southamerica-east1-c" onChange={handleLoc}></input>
                  S.America East (1C)
                </label>
              </div>
              <div className="div8">
                <label>  
                <input type="radio" name="location" value="europe-west2-a" onChange={handleLoc}></input>
                  Europe West (2A)
                </label>
              </div>
            </form> 
          </div>


          <div id='buts'>
            <button id="deploySubmit" className='uploadButtD' onClick={handleDeploy}> Deploy </button>
            <button id="deployBack" className = 'uploadButtD' onClick={handleBack}>  Back  </button>
          </div>
      </div>
    </div>
  )
}

export default gcpDeploy;
