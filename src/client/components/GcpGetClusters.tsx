/**
 * ************************************
 *
 * @module  GcpGetClusters.tsx
 * @author
 * @date
 * @description upload page for clusters from Google Cloud Platform
 *
 * ************************************
 */

import * as React from 'react';
import { useContext } from 'react';
import { StoreContext } from '../../../store';
import Checkbox from './subcomponents/Checkbox';

const GcpGetClusters = () => {
  const [Store, setStore] = useContext(StoreContext);
 
  // function for handling location change
  const handleLocation = (location: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    // updated to account for selecting multiple locations
    const newGcpLoc = Store.gcploc;
    newGcpLoc[location] = event.target.checked;

    setStore({
      ...Store, 
      gcploc: newGcpLoc,
    });
  }

  // making the options of locations to be displayed
  const deployLocationStrings = [
    'us-central1-a',
    'us-central1-b',
    'us-central1-c',
    'southamerica-east1-a',
    'southamerica-east1-b',
    'southamerica-east1-c',
    'europe-west2-a',
    'us-west1-a'
  ];

  // deployLocations is what will be rendered later
  // will be a bunch of checkboxes with text labels
  const deployLocations = [];

  deployLocationStrings.forEach(location => {
    deployLocations.push(
      <Checkbox 
        checked={Store[location]}
        handleChange={handleLocation}
        value={location}
        // maybe add a 'className' here, if needed
        // original class name: .loc
      />
    );
  });

  return (
    <div>
      <h3 className="deployTitle">Display GCP Clusters:</h3> 
      <div id='uploadSelectMenu'>
        {deployLocations}
      </div>
    </div>
  )
}

export default GcpGetClusters;