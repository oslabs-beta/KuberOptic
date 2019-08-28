import * as React from 'react';
// import ReactDOM from 'react-dom';
import * as ReactDOM from 'react-dom';
// import 'styles.css';

const { ipcRenderer } = require('electron');
// console.log(ipcRenderer.sendSync('synchronous-message', 'ping')) // prints "pong"
ipcRenderer.send('asynchronous-message', 'weed');

ipcRenderer.on('cluster-client', (event: any, arg: any) => {
  console.log('gcp data: ', arg)
  // console.log(`GCP DATA: `,arg[0]) // prints "pong"
  // console.log(`Local Data: `, arg[1])
  // event.sender(arg);
})

// render our main
// console.log('Renderer file loaded', typeof ReactDOM);

ReactDOM.render(
  <div className='div'>
    Chicken nuggets!!! 
  </div>,
  document.getElementById('app')
);
