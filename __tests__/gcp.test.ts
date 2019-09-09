// import test credentials
const fetchLocal = require('../src/main/local/local').default
const [quickstart, create] = require('../src/main/gcp/getGCPdata').default

// set up tests to output of GCP functions, local cluster functions
// GCP tests are asynchronous

// test creation with different inputs
describe('Cluster testing', () => {

  describe('Testing fectchLocal function', () => {
    it('fetchLocal data should return a node named Minikube', () => {
      fetchLocal().then(data => expect(data.dataforNodes.nodeName).not.toBe(undefined));
    })
    it('fetchLocal data should come from default namespace', () => {
      // expect.assertions(1);
      fetchLocal().then(data => expect(data.dataforNodes.metaDataNameSpace).toBe('default'));
    });
    it('fetchLocal data should come from default namespace', () => {
      // expect.assertions(1);
      fetchLocal().then(data => expect(data.dataforNodes.dockerContainer_0.containerName).toBe('hello-node'));
    });

  });

  describe('Testing GCP fetchData Function', () => {
    xit('quickstart should return GCP cluster data with the correct credentials input', () => {
      quickstart({}).then(data => expect(data).not.toBe(undefined))
    })
    xit('check for correct cluster data', () => {
      quickstart({}).then(data => expect(data).not.toBe(undefined))
    })

  })

  // describe('Testing GCP Create Function', () => {
  //
  // })

});
