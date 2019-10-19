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
import 'tachyons'

// various inputs will be stored in this object and will be submitted when you call handleSubmit
let input = {};

const gcpDeploy = () =>{
  const [Store, setStore] = useContext(StoreContext);
  
  ipcRenderer.on('newClusters', (event: any, arg: any) => {
    if(Store.clusterCount){
      let newClusters = Store.clusters;
      arg.forEach(el=> newClusters.push(el))
      setStore({...Store, clusters: newClusters, clusterCount: newClusters.length, gcpDeployPage:false, uploadPageState: true})
    }
    else setStore({...Store, clusters: arg, clusterCount: arg.length, gcpDeployPage:false, uploadPageState: true});
    event.returnValue = 'done';
  })

    
  const handleType = (event) => {
    input['clusterType'] = event.currentTarget.value;
  }
  const handleName = (event) => {
    input['name'] = event.currentTarget.value;
  }
  const handleLoc = (event) => {
    const location = event.currentTarget.value
    setStore({...Store, gcploc: location})
    input['zone'] = location;
  }
  const handleBack = ()=>{
    setStore({...Store, gcpDeployPage:false, uploadPageState: true})
  }
  const handleNodeCount = (event) => {
    input['count'] = event.currentTarget.value;
  }

  const handleSubmit = () =>{
    create(Store.credentials, input['zone'], input)
    const creds = JSON.parse(Store.credentials)
    // setStore({...Store, gcpDeployPage:false, uploadPageState: true})
    // ipcRenderer.send('getNewClusters', creds, Store.gcploc);
  }

  return (
    <div id="deployWrapper">
      {/* <GetCluster/> */}
      <div className="inputPageDeploy">
      <input id="deployClustName" className='clusterType' type="text" onChange={handleName} placeholder="cluster name" required={true}></input>
      <div id="deployDropDowns">

      <select id="deployChooseClustType" className='clusterType' onChange={handleType}>
      <option selected>Choose GCP cluster type</option>
      <option value='affordable'>affordable</option>
      <option value='standard'>standard</option>
      <option value='cpuIntensive'>cpuIntensive</option>
      <option value='memoryIntensive'>memoryIntensive</option>
      <option value='gpuAcceleratedComputing'>gpuAcceleratedComputing</option>
      <option value='highly available'>highly available</option>
      </select>

      <select id='deployLoc' className='loc' onChange={handleLoc}>
      <option selected>Choose a location to host</option>
      <option value='us-central1-a'>us-central1-a</option>
      <option value='us-central1-b'>us-central1-b</option>
      <option value='us-central1-c'>us-central1-c</option>
      <option value='southamerica-east1-a'>southamerica-east1-a</option>
      <option value='southamerica-east1-b'>southamerica-east1-b</option>
      <option value='southamerica-east1-c'>southamerica-east1-c</option>
      <option value='europe-west2-a'>europe-west2-a</option>
      <option value='us-west1-a'>us-west1-a</option>
      </select>

      </div>
      <div className="nodeCountDropDown">
      <select id='nodeCounter' className='clusterType' onChange={handleNodeCount}>
      <option selected>Nodes in the cluster</option>
      <option value='1'>1</option>
      <option value='2'>2</option>
      <option value='3'>3</option>
      <option value='4'>4</option>
      <option value='5'>5</option>
      </select>

      </div>

      <div id='buts'>
        <button id="deploySubmit" className='uploadButtD' onClick={handleSubmit}> Submit </button>
        <button id="deployBack" className = 'uploadButtD' onClick={handleBack}>  Back  </button>
      </div>

    <div id='infobox' className='bg-light-blue dib br3 pa3 ma2 shadow-5'>
      <div id="clicker" tabIndex={1} >
          <p>
          <strong>Affordable</strong><br/>
          </p>
      </div>

      <div id="hiddenAf">
        Good for starting your first cluster for lightweight apps <br/>
        Machine type:g1-small <br/>
        Autoscaling:Disabled <br/>
        Stackdriver Logging and Monitoring: Disabled <br/>
        Boot disk size: 30GB <br/>
      </div>

      <div id="clicker" tabIndex={1} >
        <p>
          <strong>Standard</strong> <br/>
        </p>
      </div>

      <div id="hiddenAf">
        Continuous integration, web serving, backend<br/>
        Machine type:n1-standard <br/>
        Autoscaling:Disabled <br/>
        Stackdriver Logging and Monitoring: Disabled <br/>
        Boot disk size: 100GB <br/>
      </div>

      <div id="clicker" tabIndex={1} >
        <p>
          <strong>CPU-Intensive</strong> <br/>
        </p>
      </div>

      <div id="hiddenAf">
        Web crawling or anything that requires more cpu<br/>
        Machine type:n1-highcpu-4 <br/>
        Autoscaling:True <br/>
        Stackdriver Logging and Monitoring: Enabled <br/>
        Boot disk size: 100GB <br/>
      </div>

      <div id="clicker" tabIndex={1} >
        <p>
          <strong>Memory-Intensive</strong> <br/>
        </p>
      </div>

      <div id="hiddenAf">
        Databases, analytics, anything that takes memory<br/>
        Machine type:n1-highmem-2 <br/>
        Autoscaling:True <br/>
        Stackdriver Logging and Monitoring: Enabled <br/>
        Boot disk size: 100GB <br/>
      </div>

      <div id="clicker" tabIndex={1} >
        <p>
          <strong>GPU Accelerated Computing</strong> <br/>
        </p>
      </div>

      <div id="hiddenAf">
        Machine Learning, video transcoding, scientific computations<br/>
        Machine type:n1-highmem-2 + GPU<br/>
        Autoscaling:True <br/>
        Stackdriver Logging and Monitoring: Enabled <br/>
        Boot disk size: 100GB <br/>
      </div>

      <div id="clicker" tabIndex={1} >
        <p>
          <strong>Highly available</strong> <br/>
        </p>
      </div>

      <div id="hiddenAf">
        Most demanding requirements<br/>
        Machine type:n1-highmem-2 + GPU <br/>
        Autoscaling:True <br/>
        Stackdriver Logging and Monitoring: Enabled <br/>
        Boot disk size: 100GB <br/>
      </div>
      </div>
    </div>
  </div>
  )
}

export default gcpDeploy;
