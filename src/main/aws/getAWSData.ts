// const AWS = require('aws-sdk')

// let eks = new AWS.EKS({region: 'us-east-1'});

// // AWS.config.getCredentials((err) => {
// //     if (err) {
// //     console.log(err)
// //     } else {
// //       console.log('Access key:', AWS.config.credentials.accessKeyId);
// //       console.log('Secret access key:', AWS.config.credentials.secretAccessKey);
// //       console.log('Region', process.env.AWS_REGION);
// //     }
// //   })

// //-------------function to get clusters-------------\\
// async function quickstart(params){
//  eks.describeCluster(params, function(err, data) {
//     if (err) {
//       console.log(err, err.stack);
//     } // an error occurred  
//     else{
//     console.log('awsDat["clusterName"]=',data.cluster.name);           // successful response
//     console.log('awsDat["endpoint"]=',data.cluster.endpoint)
//     console.log('awsDat["creationTime"]=',data.cluster.createdAt);
//     console.log('awsDat["clusterStatus"]=',data.cluster.status);
//     console.log('awsDat["nodeCount"]=','1');
//     console.log('awsDat["location"]=','us-east-1'); 
//     return data;
//     }     
//   })
// }

// export default quickstart;