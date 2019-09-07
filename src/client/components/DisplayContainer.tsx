import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { useState, useEffect, useContext } from 'react';
import { type } from 'os';
import { BrowserRouter as Flash, Link, Redirect} from 'react-router-dom';
import Route from 'react-router-dom';
import {StoreContext} from '../../../store';
import Visualizer from './visualizer'
// "prestart": "rimraf dist && cross-env NODE_ENV=development webpack --watch --progress --colors & cross-env NODE_ENV=development",

const DisplayContainer = () => {
  const [Store, setStore] = useContext(StoreContext)

    return (
        <div className='displayContainer'>
        <Visualizer />
        </div>
    )
}



export default DisplayContainer;
