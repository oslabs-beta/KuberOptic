import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { useState, useEffect, useContext } from 'react';
import { type } from 'os';
import { BrowserRouter as Flash, Link, Redirect} from 'react-router-dom';
import Route from 'react-router-dom';
import {StoreContext} from './store';


const DisplayContainer = () => {
  const [Store, setStore] = useContext(StoreContext)

    return (
        <div className='displayContainer'>{Store.credentials}</div>
    )
}



export default DisplayContainer;