import * as React from 'react';
// import ReactDOM from 'react-dom';
import * as ReactDOM from 'react-dom';
import app from '../client/app'
// import 'styles.css'

declare namespace JSX {
  interface IntrinsicElements {
      app: any
  }
}

// render our main
console.log('Renderer file loaded', typeof ReactDOM);

ReactDOM.render(
  <div className='div'>
   <interface: app/>
  </div>,
  document.getElementById('app')
);
