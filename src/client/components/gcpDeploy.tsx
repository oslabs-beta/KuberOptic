import * as React from 'react';
import { useState, useEffect, useContext } from 'react';
import {StoreContext} from '../../../store'
const [quickstart, create] = require('../../main/gcp/getGCPdata').default
let input = {'clusterType':'affordable', 'name':'deploycluster', 'zone':'us-central1-a'};


const gcpDeploy = () =>{
    const [Store, setStore] = useContext(StoreContext);
    const handleSubmit = () =>{
    
    }
}

export default gcpDeploy;