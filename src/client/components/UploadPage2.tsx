import * as React from 'react';
import { useContext } from 'react';
import DisplayContainer from './DisplayContainer';
import {StoreContext} from '../../../store';
const { ipcRenderer } = require('electron');

const UploadPage = () => {

    const [Store, setStore] = useContext(StoreContext);

    ipcRenderer.on('clusterClient2', (event: any, arg: any) => {
        setStore({...Store, gcp: arg});
    })

    const handleKey = (e: React.FormEvent<HTMLInputElement>) => {
        setStore({...Store, awsKey:e.currentTarget.value})
    }
    const handleSecret = (e: React.FormEvent<HTMLInputElement>) => {
      setStore({...Store, awsKey:e.currentTarget.value})
    }
    const handleName = (e: React.FormEvent<HTMLInputElement>) => {
      setStore({...Store, awsKey:e.currentTarget.value})
    }
    const handleBack = ()=>{
      setStore({...Store, landingPageState2:false})
    }
    const handleSubmit = () => {
        const creds = JSON.parse(Store.credentials);
         if(typeof creds !== 'object'){
          console.log('Enter a JSON object from GCP');
        }
        else{
          ipcRenderer.send('asynchronous-message2', creds)
          setStore({...Store, uploadPageState: true});
       }
    }
    return <div>{Store.uploadPageState ? <DisplayContainer /> :
        <div className='uploadDiv'>
            <div>
              <img className='kubUpload' src={require('../assets/credsPage/aws.png')}/>
              <div className='kubUploadText'>Amazon Web Services</div>
            </div>
        <input className='uploadInput' type="text" onChange={handleKey} placeholder="awsKey"/>
        <input className='uploadInput' type="text" onChange={handleSecret} placeholder="awsSecret"/>
        <input className='uploadInput' type="text" onChange={handleName} placeholder="ClusterName"/>
        <div id="uploadPage2SubmitandBackButts">
        <button id="uploadPage2Submit" className='uploadButt' onClick={handleSubmit}>Submit</button>
        &nbsp;
        <button id="uploadPage2BackButt" className = 'backButton' onClick={handleBack}>  Back  </button>
        </div>
        
        
        </div>
}</div>
}

export default UploadPage;
