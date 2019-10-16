import { cluster } from "d3";

const AWS = require('aws-sdk')

let eks = new AWS.EKS({region: 'us-west-2'});

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


console.log(eks)

//-------------function to get clusters-------------\\
async function quickstart(params){
 const clusterData = await new Promise((resolve, reject) => {
  eks.describeCluster(params, function(err, data) {
    // const clusters:any = data
    const clusterArray = [];  
    if (err) {
        console.log(err, err.stack);
      } // an error occurred  
      else{
        // console.log(data)
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
      }     
      // clusterArray.push(awsDat)
    })
 })
 
 return clusterData;
 
}

// console.log(clusterArray)


// AWS.config.getCredentials();
// quickstart({name: 'test'});

export default quickstart;