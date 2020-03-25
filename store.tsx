import React, { useState, createContext } from 'react';
import { isNullOrUndefined } from 'util'; //possibly delete as it appears to not be used

export const StoreContext = createContext(null);

export const StoreContextProvider = (props: any) => {
  const [Store, setStore] = useState({
    uploadPageState: false,
    uploadPageState2: false,
    gcpDeployPage: false,
    credentials: {}, //google
    clusters: [],
    gcploc: {
      // GCP location(s)
      'us-central1-a': false,
      'us-central1-b': false,
      'us-central1-c': false,
      'us-west1-a': false,
      'southamerica-east1-a': false,
      'southamerica-east1-b': false,
      'southamerica-east1-c': false,
      'europe-west2-a': false,
    },
    gcpdeploylocation: null,
    clusterCount: 0,
    awsKey: null,
    awsSecret: null,
    awsClusterName: [],
    awsLocation: null,
    awsDeployPage: false,
    awsDeployName: null,
    awsDeployRegion: null,
    awsDisplayRegion: 'us-east-2',
    awsDeployRoleArn: null,
    awsSubnet1: null,
    awsSubnet2: null,
    visualize: false,
  });

  return <StoreContext.Provider value={[Store, setStore]}>{props.children}</StoreContext.Provider>;
};

export default StoreContext;
