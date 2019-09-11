// import test credentials
const fetchLocal = require('../src/main/local/local').default
const [quickstart, create] = require('../src/main/gcp/getGCPdata').default
const testCreds = {};
// set up tests to output of GCP functions, local cluster functions
// GCP tests are asynchronous

// test creation with different inputs
describe('Cluster testing', () => {

  describe('Testing fectchLocal function', () => {
    it('fetchLocal data should return a node named Minikube', () => {
      fetchLocal().then(data => expect(data.dataforNodes.nodeName).not.toBe(undefined));
    });
    it('fetchLocal data should come from default namespace', () => {
      fetchLocal().then(data => expect(data.dataforNodes.metaDataNameSpace).not.toBe(undefined));
    });
    it('fetchLocal data should have the correct container', () => {
      fetchLocal().then(data => expect(data.dataforNodes.dockerContainer_0.containerName).toBe('hello-node'));
    });
    it('fetchLocal data should return the correct name of the cluster', () => {
      fetchLocal().then(data => expect(data.dataforNodes.clusterName).toBe('Minikube'));
    });
    it('fetchLocal data should return the correct status of the cluster', () => {
      fetchLocal().then(data => expect(data.dataforNodes.metaDat.statusDat.phase).toBe('Running'));
    });
    it('fetchLocal data should verify that service links have been enabled', () => {
      fetchLocal().then(data => expect(data.dataforNodes.metaDat.specDat.enableServiceLinks).toBeTruthy());
    });

  });

  //
  describe('Testing GCP fetchData Function', () => {
    it('quickstart should return GCP cluster data as an array with at least one cluster', () => {
      // make sure the length is of length 1 or more
      quickstart(testCreds).then(data => expect(data.length).not.toBe(0))
    });
    it('First cluster has correct properties', () => {
      quickstart(testCreds).then(data => {
        expect(data[0].clusterData.name).not.toBe(undefined)
        expect(data[0].clusterData.clusterName).not.toBe(undefined)
      });
    })
    it('CLuster should be up and running', () => {
      quickstart(testCreds).then(data => expect(data[0].clusterData.clusterStatus).toBe('RUNNING'))
    });
    it('check for correct cluster data', () => {
      quickstart(testCreds).then(data => expect(data[0].location).toBe('us-central1-a'))
    });
    it('check for correct number of nodes', () => {
      quickstart(testCreds).then(data => expect(data[0].nodeCount).toBe(4))
    });

  })

  // tests will be rewritten to check for most relevant data
  describe('Testing GCP create Function', () => {

    xit('Should correctly create a cluster to GCP', () => {
      // nothing should be returned from the create function
      create(testCreds).then(data => expect(data).toBe(undefined))
    });
    xit('check for correct cluster data', () => {
      create(testCreds).then(data => expect(data).not.toBe(undefined))
    });

  })

  // need to import some function or object from AWS to perform tests
  describe('Testing AWS Function', () => {
    xit('Commands are working correctly', () => {
      //test case to be added
    });

    xit('Correct configuration to AWS', () => {
      //test case to be added
    });

  })

});
