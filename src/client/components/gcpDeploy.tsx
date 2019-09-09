import * as React from 'react';
import { useState, useEffect, useContext } from 'react';
import {StoreContext} from '../../../store'
const [quickstart, create] = require('../../main/gcp/getGCPdata').default
import 'tachyons'
let input = {};

const gcpDeploy = () =>{
    const [Store, setStore] = useContext(StoreContext);
    const handleType = (event) => {
        input['clusterType'] = event.currentTarget.value;      
    }
    const handleName = (event) => {
        input['name'] = event.currentTarget.value;      
    }
    const handleLoc = (event) => {

       input['zone'] = event.currentTarget.value;      
    }
    const handleBack = ()=>{
    setStore({...Store, gcpDeployPage:false})
    }
    const handleSubmit = () =>{
        console.log('input is ',input)
        console.log('-----------')
        console.log('-----------')
        console.log('storeloc ', input['zone']);
        create(Store.credentials, input['zone'], input)
        setStore({...Store, gcpDeployPage:false})
    }
    
    return (
    <div>
        <div className="inputPageDeploy">
        <input className='pa3 ba bg-lighest-blue' type="text" onChange={handleName} placeholder="cluster name"/>
        <div>

        <select className='clusterType bg-silver tc ' onChange={handleType}>
        <option selected>Choose a cluster type</option>
        <option value='affordable'>affordable</option>
        <option value='standard'>standard</option>
        <option value='cpuIntensive'>cpuIntensive</option>
        <option value='memoryIntensive'>memoryIntensive</option>
        <option value='gpuAcceleratedComputing'>gpuAcceleratedComputing</option>
        <option value='highly available'>highly available</option>
        </select>

        <select className='loc' onChange={handleLoc}>
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

        <div id='buts'>
        <button className='uploadButtD' onClick={handleSubmit}> Submit </button>
        <button className = 'backButtonD' onClick={handleBack}>  Back  </button>
        </div>
        </div>

        <div id='infobox' className='bg-light-blue dib br3 pa3 ma2 shadow-5'>
        
        <div id="clicker" tabIndex={1} >     
           <p>
           <strong>Affordable</strong> <br/>
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
        )
}

export default gcpDeploy;