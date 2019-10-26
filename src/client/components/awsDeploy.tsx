import * as React from 'react';
import { useContext } from 'react';
import {StoreContext} from '../../../store'
const [quickstart, create] = require('../../main/aws/getAWSData').default
import 'tachyons'
const { ipcRenderer } = require('electron');
let input = {};

const awsDeploy = () =>{
    const [Store, setStore] = useContext(StoreContext);
    
    const handleNewName = (e) => {
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
      return setStore({
        ...Store,
        uploadPageState2:false, 
        clusterCount:0,
        awsKey:null,
        awsSecret:null,
        awsClusterName: [],
        awsLocation:null,
        awsDeployPage: false,
        awsDeployName: null,
        awsDeployRegion: null
      });
    }
    const handleSubmit = () =>{
        create(Store.credentials, input['zone'], input)
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
    <div className="deployWrapper">
      <div className="fetchAWS">
        <h3 className="deployTitle">Display AWS Clusters:</h3> 
        <input className='awsGetClusterName' type="text" onChange={handleName} placeholder="clusterName"></input>
        <div id="uploadPage2SubmitandBackButts">
          <button id="uploadPage2Submit" className='uploadButt' onClick={handleFetchSubmit}>Add Node</button>
          <button id="uploadPage2BackButt" className = 'backButton' onClick={handleRemove}>Remove Node</button>
        </div>
      </div>
        <div className="inputPageDeploy">
        <h3 className="deployTitle">Deploy New AWS Cluster:</h3>
        <input className='awsDeployClusterName' type="text" onChange={handleNewName} placeholder="clusterName"/>
        <div>

        <select id='deployLoc' className='loc' onChange={handleLoc}>
        <option selected>Choose a location to host</option>
        <option value='us-east-1'>us-east-1</option>
        <option value='us-east-2'>us-east-2</option>
        <option value='us-west-1'>us-west-1</option>
        <option value='us-west-2'>us-west-2</option>
        </select>

        </div>

        <div id='buts'>
        <button id="uploadPage2Submit" className='uploadButt' onClick={handleSubmit}>Deploy Node</button>
        <button id="uploadPage2Submit" className="uploadButt">Delete Node</button>
        <button id="uploadPage2BackButt" className = 'backButton' onClick={handleBack}>  Back  </button>
        </div>
      </div>
    </div>
        )
}

export default awsDeploy;
