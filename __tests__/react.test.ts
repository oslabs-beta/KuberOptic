// enzyme react testing
// import React from 'react';
// import { configure, shallow } from 'enzyme';
// import Adapter from 'enzyme-adapter-react-16';
// import toJson from 'enzyme-to-json';

//import components to test
// import DisplayContainer from '../src/client/components/DisplayContainer';
// import gcpDeploy from '../src/client/components/gcpDeploy';
// import LandingPage from '../src/client/components/LandingPage';
// import sideBar from '../src/client/components/sidebar';
// import UploadPage from '../src/client/components/UploadPage';

// npm install enzyme, enzyme adapter

// test test
function minus(a, b) {
  return a - b;
}

test('subtract 2 -1 to equal 3', () => {
  expect(minus(2, 1)).toBe(1);
});
