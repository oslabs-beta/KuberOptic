import * as React from 'react';
// import ReactDOM from 'react-dom';
import * as ReactDOM from 'react-dom';
import "./styles.css"
import App from './components/app'

const GOOGLE_APPLICATION_CREDENTIALS:object = {
}
const zone:string = 'us-central1-a' 

ReactDOM.render(<App />, document.getElementById('root'));
