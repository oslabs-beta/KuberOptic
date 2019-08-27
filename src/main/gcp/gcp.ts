const container = require('@google-cloud/container');

const GOOGLE_APPLICATION_CREDENTIALS = require('./creds.json');
const client: any = new container.v1.ClusterManagerClient(GOOGLE_APPLICATION_CREDENTIALS);

// console.log(client)
console.log('-------------------------------------');
async function quickstart() {
  const zone = 'us-west2-a';
  const projectId = await client.getProjectId();
  const request = {
    projectId: projectId,
    zone: zone,
 };
 // const [response] = await client.listClusters(request);
 // const [listOperation] = await client.listOperations(request);
 // console.log('Clusters:');
 // console.log(response);
 // console.log('-------------------------------------');
 // console.log(response.clusters[0].nodePools.length)
 // console.log('this is meta data')
 // console.log(response.clusters[0].nodePools[0].config.metadata)
 // console.log('======================================');
 // console.log(response.clusters[0].nodePools);
 // console.log('======================================');
 // console.log(listOperation);
}
// quickstart();
// const str: string = 'hello';
console.log('we are exiting gcp...');
// let x = 'test string'
// let y = quickstart;
export default client;
