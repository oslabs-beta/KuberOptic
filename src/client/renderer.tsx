import * as React from 'react';
// import ReactDOM from 'react-dom';
import * as ReactDOM from 'react-dom';
// import 'styles.css';

// render our main
console.log('Renderer file loaded', typeof ReactDOM);

ReactDOM.render(
  <div className='div'>
    Chicken Nuggets!!!
  </div>,
  document.getElementById('app')
);
