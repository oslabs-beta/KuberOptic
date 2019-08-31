const container = require('@google-cloud/container');
const GOOGLE_APPLICATION_CREDENTIALS = 
{}

/*Anal stuff that I dont wanna do rn */

//const containeranalysis = require('@google-cloud/containeranalysis');

// const client = new containeranalysis.v1beta1.GrafeasV1Beta1Client({
//   // optional auth parameters.
// });

// // Iterate over all elements.
// const formattedParent = client.projectPath('kubernati');

// client.listScanConfigs({parent: formattedParent})
//   .then(responses => {
//     console.log(responses)
//     // for (const resource of resources) {
//     //   // doThingsWith(resource)
//     // }
//   })
//   .catch(err => {
//     console.error(err);
//   });

//export this object to main.ts
  
async function quickstart(GOOGLE_APPLICATION_CREDENTIALS:any, zone:string='us-central1-a') {
    
    const client = new container.v1.ClusterManagerClient(GOOGLE_APPLICATION_CREDENTIALS);
    const projectId:string = GOOGLE_APPLICATION_CREDENTIALS.project_id;
    //console.log(projectId)
    const request:object = {
      projectId: projectId,
      zone: zone
    };
    const [response] = await client.listClusters(request);
    const clusters:any = response.clusters;

  /**Testing environment */

   // console.log(clusters[0][name])
   const clusterArray = [];
   
   clusters.forEach(cluster=>{
     let gcpDat:object = {};
     let clusterDat = {};
         for(let prop in cluster){
           //console.log(prop)
           if(prop!== 'masterAuth' && prop!== 'masterAuthorizedNetworksConfig'){
             clusterDat[prop] = cluster[prop]
            }
          }
      gcpDat["clusterData"] = clusterDat;
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
      
    // console.log(clusters[0].nodePools[0].instanceGroupUrls)
    // console.log(cluster.nodePools[1])
     console.log(clusterArray);
  return clusterArray;
}
quickstart({})

export default quickstart;
