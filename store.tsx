import React, { useState, createContext } from 'react';

export const StoreContext = createContext(null);

export const StoreContextProvider = (props: any) => {
  
  const [Store, setStore] = useState({
    landingPageState: false,
    landingPageState2: false,
    uploadPageState: false,
    uploadPageState2:false,
    gcpDeployPage:false,
    credentials: {}, //google
    clusters: [],
    gcploc:null,
    clusterCount:0,
    awsKey:null,
    awsSecret:null,
    awsClusterName: [],
    awsLocation:null,
    awsDeployPage: false,
    awsDeployName: null,
    awsDeployRegion: null
  })

  return (
  <StoreContext.Provider value={[Store, setStore]}>
      {props.children}
  </StoreContext.Provider>
  )
}

export default StoreContext;
