// import test credentials
const fetchLocal = require('../src/main/local/local').default;
const [quickstart, create] = require('../src/main/gcp/getGCPdata').default;
const [
  loginAWS,
  listAWS,
  fetchAWS,
  createAWS,
  deleteAWS,
] = require('../src/client/main/aws/getAWSData');
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
const testCreds = {};
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
      fetchLocal().then(data =>
        expect(data.dataforNodes.dockerContainer_0.containerName).toBe('hello-node'),
      );
    });
    it('fetchLocal data should return the correct name of the cluster', () => {
      fetchLocal().then(data => expect(data.dataforNodes.clusterName).toBe('Minikube'));
    });
    it('fetchLocal data should return the correct status of the cluster', () => {
      fetchLocal().then(data => expect(data.dataforNodes.metaDat.statusDat.phase).toBe('Running'));
    });
    it('fetchLocal data should verify that service links have been enabled', () => {
      fetchLocal().then(data =>
        expect(data.dataforNodes.metaDat.specDat.enableServiceLinks).toBeTruthy(),
      );
    });
  });
  describe('Testing GCP fetchData Function', () => {
    xit('quickstart should return GCP cluster data as an array with at least one cluster', () => {
      // make sure the length is of length 1 or more
      quickstart(testCreds).then(data => expect(data.length).not.toBe(0));
    });
    xit('First cluster has correct properties', () => {
      quickstart(testCreds).then(data => {
        expect(data[0].clusterData.name).not.toBe(undefined);
        expect(data[0].clusterData.clusterName).not.toBe(undefined);
      });
    });
    xit('Cluster should be up and running', () => {
      quickstart(testCreds).then(data => expect(data[0].clusterData.clusterStatus).toBe('RUNNING'));
    });
    xit('check for correct cluster data', () => {
      quickstart(testCreds).then(data => expect(data[0].location).toBe('us-central1-a'));
    });
    xit('check for correct number of nodes', () => {
      quickstart(testCreds).then(data => expect(data[0].nodeCount).toBe(4));
    });
  });
  // tests will be rewritten to check for most relevant data
  describe('Testing GCP create Function', () => {
    xit('Should correctly create a cluster to GCP', () => {
      // nothing should be returned from the create function
      create(testCreds).then(data => expect(data).toBe(undefined));
    });
    xit('check for correct cluster data', () => {
      create(testCreds).then(data => expect(data).not.toBe(undefined));
    });
  });
  // need to import some function or object from AWS to perform tests
  describe('Testing AWS Function', () => {
    const region = 'us-east-1';
    const params = {
      name: 'apple',
      accessKeyId: 'input', //provide own
      secretAccessKey: 'input',
      region: region,
      version: '1.14', // specify own version
      resourcesVpcConfig: {
        endpointPrivateAccess: false,
        endpointPublicAccess: true,
        subnetIds: ['222www', '333qqq'], // generated own subnetIds from AWS
      },
    };
    xit('Login is successfull', () => {
      // nothing should be returned from the create function
      loginAWS(testCreds).then(data => expect(data).toBe(undefined));
    });
    xit('AWS fetch clusters of specified region resultant', () => {
      listAWS(region).then(data => expect(data.length).not.toBe(0));
    });

    xit('AWS funciton for fetching clusters of region', () => {
      fetchAWS(params).then(data => expect(data.length).not.toBe(0));
    });
    xit('First cluster has correct properties', () => {
      fetchAWS(params).then(data => {
        expect(data[0].cluster.name).not.toBe(undefined);
        expect(data[0].cluster.endpoint).not.toBe(undefined);
        expect(data[0].cluster.createdAt).not.toBe(undefined);
      });
    });
    xit('Create AWS cluster function', () => {
      createAWS(params).then(data => expect(data).toBe(undefined));
    });
    xit('Delete deployed AWS cluster', () => {
      deleteAWS(params).then(data => expect(data).toBe(undefined));
    });
  });
});
