/**
 * ************************************
 *
 * @module  GcpGetClusters.tsx
 * @author
 * @date
 * @description upload page for clusters from Google Cloud Platform
 *
 * ************************************
 */

import * as React from 'react';
import { useContext } from 'react';
import { StoreContext } from '../../../store';
import Checkbox from './subcomponents/Checkbox';
const { ipcRenderer } = require('electron');
require('events').EventEmitter.defaultMaxListeners = 25;
// import 'tachyons'

const GcpGetClusters = () => {
  const [Store, setStore] = useContext(StoreContext);
 
  // function for handling location change
  const handleLocation = (location: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    // updated to account for selecting multiple locations
    const newGcpLoc = Store.gcploc;
    newGcpLoc[location] = event.target.checked;
    console.log(newGcpLoc)
    setStore({
      ...Store, 
      gcploc: newGcpLoc,
    });
  }
  const labelsForFrontEnd = [
    'US Central (1A)',
    'US Central (1B)',
    'US Central (1C)',
    'US West (1A)',
    'S.America East (1A)',
    'S.America East (1B)',
    'S.America East (1C)',
    'Europe West (2A)'
  ]
  // making the options of locations to be displayed
  const deployLocationStrings = [
    'us-central1-a',
    'us-central1-b',
    'us-central1-c',
    'us-west1-a',
    'southamerica-east1-a',
    'southamerica-east1-b',
    'southamerica-east1-c',
    'europe-west2-a'
  ];
  // deployLocations is what will be rendered later
  // will be a bunch of checkboxes with text labels
  const deployLocations = [];
  deployLocationStrings.forEach((location, ind) => {
    deployLocations.push(
      <Checkbox 
        checked={Store[location]}
        handleChange={handleLocation}
        value={location}
        label={labelsForFrontEnd[ind]}
        // maybe add a 'className' here, if needed
        // original class name: .loc
      />
    );
  });

  ipcRenderer.on('clusterClient', (event: any, arg: any) => {
    //logic incase we have more than one cluster already rendered
    // Bryan commented out the following for his own logic rendering
    // if(Store.clusterCount < arg.length){
    //   let newClusters = [];
    //   arg.forEach(el=> newClusters.push(el))
    //   setStore({...Store, clusters: newClusters, clusterCount: newClusters.length })
    // }
    // else setStore({...Store, clusters: arg, clusterCount: arg.length });
    let multi = Store.multiZoneClusters;
    console.log('******* Initial multi')
    console.log(multi)
    console.log(arg)
    if (multi === null) multi = [];
    console.log('*******  multi array')
    console.log(multi)
    arg.forEach((addClus) => {
      console.log('cluster in for each')
      console.log(addClus)
      multi.push(addClus);
      console.log(`pushed into multi: `)
      console.log(multi)
    })
    console.log('after for loop')
    console.log(multi)
    multi = Object.values(multi.reduce((acc, cur) => Object.assign(acc, { [cur.clusterName]: cur }), {}))
    console.log('after for filter')
    console.log(multi)
    setStore({ ...Store, multiZoneClusters: multi, clusters: multi, clusterCount: multi.length })
    console.log(`Bryan: After Res.clusters from GCP => Invoked clusterClient at UploadPage: Clusters: ${Store.clusters}`)
    event.returnValue = 'done';
  })

  const handleSubmit = () => {
    const creds = JSON.parse(Store.credentials);
    console.log('Bryan submit at Fetch has been clicked')
    // ipcRenderer.send('asynchronous-message', creds, Store.gcploc)
    // setStore({...Store, uploadPageState: true });
    console.log(`Bryan default multi zones at Submit: `)
    console.log(Store.gcploc)
    async function submit() {
      console.log(`Bryan: submit invoked at GcpGetClusters`)
      let location = Store.gcploc;
      for (let zone in location) {
        console.log(`Bryan await loop => zone: ${zone}`)
        if (location[zone]) {
          console.log(`Insdie if statement with zone: ${zone}`)
          const a = await ipcRenderer.send('asynchronous-message', creds, zone)
          console.log(a);
          console.log(Store.clusters)
          console.log(`Await function for zone ***${zone}*** done`)
        }
      }
      console.log(`************ Await function done`)
    }

    submit().then(function () {
      setStore({ ...Store, uploadPageState: true });
      console.log(`Bryan submit done at UploadPage`);
    }
    )
    // Store.multiZones.forEach((zone) => {
    //   console.log(`Bryan foreach func - zone: ${zone}`)
    //   ipcRenderer.send('asynchronous-message', creds, zone)
    // })
  }

  return (
    <div className="getGCPWrapper">
      <h3 className="deployTitle">
        Display GCP Clusters:</h3> 
      <div id='uploadSelectMenu'>
        {deployLocations}
      </div>
      <div id='buts'>
        <button id="deploySubmit" className='uploadButtD' onClick={handleSubmit}> Fetch </button>
      </div>
    </div>
  )
}
export default GcpGetClusters;
