// jest tests will go here
// import GCP, local,
// import test credentials?
const fetchLocal = require('../src/main/local/local').default
// set up tests to output of GCP functions, local cluster functions
// GCP tests are asynchronous

// may migrate local tests to another file, if more modular

// test creation with different inputs
describe('Local Cluster', () => {

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

    // describe('', () => {
    //
    // })

  });
});
