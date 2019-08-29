import * as React from 'react';
// import ReactDOM from 'react-dom';
import * as ReactDOM from 'react-dom';
import "./styles.css"
import App from '../app'

// render our main
// console.log('Renderer file loaded', typeof ReactDOM);

// App is our top component which is being rendered here.
ReactDOM.render(<App />, document.getElementById('root'));

//this is what jizzle and jimmy told me to comment out
// const GOOGLE_APPLICATION_CREDENTIALS:object = {
//  }
// const zone:string = 'us-central1-a' 

// const input = [GOOGLE_APPLICATION_CREDENTIALS, zone];
// const { ipcRenderer } = require('electron');
// //const clusterz = ['test'];


// // console.log(ipcRenderer.sendSync('synchronous-message', 'ping')) // prints "pong"
// ipcRenderer.send('asynchronous-message', input);
// ipcRenderer.on('cluster-gcp', (event: any, arg: any) => {
//   console.log('gcp data: ', arg)
//  // clusterz.push(arg)
// })
// ipcRenderer.on('cluster-local', (event: any, arg: any)=>{
//   console.log('local data: ', arg)
//   //clusterz.push(arg)
//   //console.log('clusterz is: ', clusterz)
// })
