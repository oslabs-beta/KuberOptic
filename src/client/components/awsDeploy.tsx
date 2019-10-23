import * as React from 'react';
import { useContext } from 'react';
import {StoreContext} from '../../../store'
const [fetchAWS, createAWS] = require('../../main/aws/getAWSData').default
import 'tachyons'
const { ipcRenderer } = require('electron');
let input = {};

const awsDeploy = () =>{
    const [Store, setStore] = useContext(StoreContext);
    
    const handleDeployName = (e) => {
        // input['name'] = event.currentTarget.value;
        setStore({...Store, awsDeployName: e.currentTarget.value})
    }

    const handleName = (e: React.FormEvent<HTMLInputElement>) => {
      console.log(e.currentTarget.value)  
      setStore({...Store, awsClusterName: e.currentTarget.value})
    }

    const handleLoc = (e) => {

      setStore({...Store, awsDeployRegion: e.currentTarget.value})
      //  input['zone'] = event.currentTarget.value;
    }
    const handleBack = ()=>{
    setStore({...Store, awsDeployPage:false})
    }
    const handleDeploySubmit = () =>{
      const arg = {
        name: Store.awsDeployName,
        accessKeyId: Store.awsKey,
        secretAccessKey: Store.awsSecret,
        region: Store.awsDeployRegion
      }
        // create(Store.credentials, input['zone'], input)

        setStore({...Store, awsDeployPage: true})
    }

    const handleFetchSubmit = () => {
      const arg = {
        name: Store.awsClusterName, 
        accessKeyId: Store.awsKey, 
        secretAccessKey: Store.awsSecret, 
        region: "us-east-2"
      }
      ipcRenderer.send('asynchronous-message2', arg)
      setStore({...Store, uploadPageState2: true, awsDeployPage: true});
      createAWS(arg)
      }


    const handleRemove = () => {
      //make copy of clusters array via slice
      console.log('clusters: ', Store.clusters)
      let clusterArrCopy = Store.clusters.slice();
      //go through all elements of copy clusters array
      for (let i = 0; i < clusterArrCopy.length; i++) {
          //if you find one where the name matches, splice out from copied array
        if (clusterArrCopy[i].clusterName === Store.awsClusterName) {
          clusterArrCopy.splice(i, 1)
          clusterArrCopy = clusterArrCopy;
        }
      }
      //set store of clusters to copied array 
      console.log('clusterArrCopy: ', clusterArrCopy)
      setStore({...Store, clusters: clusterArrCopy, awsDeployPage: true})
      console.log('clusters: ', Store.clusters)
    }

    return (
    <div>
      <div className="fetchAWS">
        <input className='awsGetClusterName' type="text" onChange={handleName} placeholder="Cluster Name"></input>
        <div id="uploadPage2SubmitandBackButts">
          <button id="uploadPage2Submit" className='uploadButt' onClick={handleFetchSubmit}>Add Cluster</button>
          <button id="uploadPage2BackButt" className = 'backButton' onClick={handleRemove}>Remove Cluster</button>
        </div>
      </div>
        <div className="inputPageDeploy">
        <input className='awsDeployClusterName' type="text" onChange={handleDeployName} placeholder="Cluster Name"/>
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
        <button id="uploadPage2Submit" className='uploadButt' onClick={handleDeploySubmit}>Deploy Cluster</button>
        <button id="uploadPage2Submit" className="uploadButt">Delete Cluster</button>
        <button id="uploadPage2BackButt" className = 'backButton' onClick={handleBack}>  Back  </button>
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
