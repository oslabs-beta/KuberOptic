import * as React from 'react';
// import ReactDOM from 'react-dom';
import * as ReactDOM from 'react-dom';
// import 'styles.css';

const { ipcRenderer } = require('electron');
// console.log(ipcRenderer.sendSync('synchronous-message', 'ping')) // prints "pong"
ipcRenderer.send('asynchronous-message', 'ping');

ipcRenderer.on('cluster-client', (event: any, arg: any) => {
  console.log(arg) // prints "pong"
  // event.sender(arg);
})

// render our main
// console.log('Renderer file loaded', typeof ReactDOM);

ReactDOM.render(
  <div className='div'>
    Chicken Nuggets!!!
  </div>,
  document.getElementById('app')
);
