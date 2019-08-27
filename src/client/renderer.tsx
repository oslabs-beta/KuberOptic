import * as React from 'react';
// import ReactDOM from 'react-dom';
import * as ReactDOM from 'react-dom';
import App from './App'
const styles = require('./styles.css')


// render our main
console.log('Renderer file loaded', typeof ReactDOM);

ReactDOM.render(
  <div className='div'>
   <App />
  </div>,
  document.getElementById('app')
);
