import * as React from 'react';
import { useContext } from 'react';
import {StoreContext} from '../../../store'
const [quickstart, create] = require('../../main/aws/getAWSData').default
import 'tachyons'
let input = {};

const awsDeploy = () =>{
    const [Store, setStore] = useContext(StoreContext);
    
    const handleName = (event) => {
        input['name'] = event.currentTarget.value;
    }
    const handleLoc = (event) => {

       input['zone'] = event.currentTarget.value;
    }
    const handleBack = ()=>{
    setStore({...Store, awsDeployPage:false})
    }
    const handleSubmit = () =>{
        create(Store.credentials, input['zone'], input)
        setStore({...Store, awsDeployPage:false})
    }

    return (
    <div>
        <div className="inputPageDeploy">
        <input id="deployClustName" className='clusterType' type="text" onChange={handleName} placeholder="cluster name"/>
        <div>

        {/* <select id="deployChooseClustType" className='clusterType' onChange={handleType}>
        <option selected>Choose a cluster type</option>
        <option value='affordable'>affordable</option>
        <option value='standard'>standard</option>
        <option value='cpuIntensive'>cpuIntensive</option>
        <option value='memoryIntensive'>memoryIntensive</option>
        <option value='gpuAcceleratedComputing'>gpuAcceleratedComputing</option>
        <option value='highly available'>highly available</option>
        </select> */}

        <select id='deployLoc' className='loc' onChange={handleLoc}>
        <option selected>Choose a location to host</option>
        <option value='us-east-1'>us-east-1</option>
        <option value='us-east-2'>us-east-2</option>
        <option value='us-west-1'>us-west-1</option>
        <option value='us-west-2'>us-west-2</option>
        </select>

        </div>

        <div id='buts'>
        <button id="deploySubmit" className='uploadButtD' onClick={handleSubmit}> Submit </button>
        <button id="deployBack" className = 'uploadButtD' onClick={handleBack}>  Back  </button>
        </div>
        </div>

        {/* <div id='infobox' className='bg-light-blue dib br3 pa3 ma2 shadow-5'>

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

        </div> */}

    </div>
        )
}

export default awsDeploy;
