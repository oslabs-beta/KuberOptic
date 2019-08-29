import * as React from 'react';
// import ReactDOM from 'react-dom';
import * as ReactDOM from 'react-dom';
// import 'styles.css';

const GOOGLE_APPLICATION_CREDENTIALS:object = {
 }
const zone:string = 'us-central1-a' 

const input = [GOOGLE_APPLICATION_CREDENTIALS, zone];
const { ipcRenderer } = require('electron');
//const clusterz = ['test'];


// console.log(ipcRenderer.sendSync('synchronous-message', 'ping')) // prints "pong"
ipcRenderer.send('asynchronous-message', input);
ipcRenderer.on('cluster-gcp', (event: any, arg: any) => {
  console.log('gcp data: ', arg)
 // clusterz.push(arg)
})
ipcRenderer.on('cluster-local', (event: any, arg: any)=>{
  console.log('local data: ', arg)
  //clusterz.push(arg)
  //console.log('clusterz is: ', clusterz)
})


ReactDOM.render(
  <div className='div'>
  <h1>
    Chicken nuggets!!! 
  </h1>
  </div>,
  document.getElementById('app')
);
