import { cluster } from "d3";

const AWS = require('aws-sdk')
// AWS.config.getCredentials((err) => {
//     if (err) {
//     console.log(err)
//     } else {
//       // console.log(AWS.config)
//       // console.log(eks)
//       console.log('Access key:', AWS.config.credentials.accessKeyId);
//       console.log('Secret access key:', AWS.config.credentials.secretAccessKey);
//       console.log('Region', eks.config.region);
//     }
//   })

//-------------function to get clusters-------------\\
async function quickstart(params){
  let eks = new AWS.EKS({region: 'us-east-2'});
  const clusterData = await new Promise((resolve, reject) => {
    eks.describeCluster(params, function(err, data) {
      const clusterArray = [];  
      if (err) console.log(err, err.stack);
      let awsDat = {};
      
      awsDat["clusterName"]= data.cluster.name           // successful response
      awsDat["endpoint"]= data.cluster.endpoint
      awsDat["creationTime"]= data.cluster.createdAt
      awsDat["clusterStatus"]= data.cluster.status
      awsDat["nodeCount"]= '3'
      awsDat["location"]= eks.config.region
      // console.log(awsDat)
      // return data;
      clusterArray.push(awsDat)
      resolve(clusterArray);
    })
      // clusterArray.push(awsDat)
 })
 return clusterData;
}
// AWS.config.getCredentials();
// quickstart({name: 'test'});

// export default [quickstart, create]; //if functionality to deploy is possible

export default quickstart;