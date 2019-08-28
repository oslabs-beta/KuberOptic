const container = require('@google-cloud/container');
const GOOGLE_APPLICATION_CREDENTIALS ={
  
}
require('babel-polyfill');

  //export this object to main.ts
async function quickstart(GOOGLE_APPLICATION_CREDENTIALS:any, zone:string = 'us-central1-a') {
    
    const client = new container.v1.ClusterManagerClient(GOOGLE_APPLICATION_CREDENTIALS);
    const projectId:string = GOOGLE_APPLICATION_CREDENTIALS.project_id;
    //console.log(projectId)
    const request:object = {
      projectId: projectId,
      zone: zone
    };
    const [response] = await client.listClusters(request);
    const clusters:any = response.clusters;
    // console.log(clusters[0])

    const clusterArray = [];

    clusters.forEach(cluster=>{
      let gcpDat:object = {};
      //console.log('clusterName is :', cluster.name);
      gcpDat["clusterName"] = cluster.name;
      //console.log('cluster description is :' , cluster.description);
      gcpDat["clusterDescription"] = cluster.description;
      //console.log( cluster.name ,' created time is :', cluster.createTime);
      gcpDat["creationTime"] = cluster.createTime;
      //console.log( cluster.name ,' status :', cluster.status);
      gcpDat["clusterStatus"] = cluster.status;
      //console.log('currentNodeCount is :', cluster.currentNodeCount);
      gcpDat["nodeCount"] = cluster.currentNodeCount; 
      //console.log('location is :' , cluster.location);
      gcpDat["location"] = cluster.location;
      cluster.nodePools.forEach((node, i)=>{
        gcpDat[`NodePool_${i}:`] = 
        [node.name , `diskSize[Gb]: ${node.config.diskSizeGb}`,
         `MachineType: ${node.config.machineType}`]
      })
      clusterArray.push(gcpDat)
     })



     // console.log(cluster)
    // console.log(cluster.nodePools[1])
   // console.log(clusterArray);
  return clusterArray;
}
quickstart(GOOGLE_APPLICATION_CREDENTIALS)

export default quickstart;
