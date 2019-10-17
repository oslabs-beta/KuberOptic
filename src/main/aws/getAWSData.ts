import fs from 'fs';

const AWS = require('aws-sdk')

let nodes = Math.ceil(Math.random()*5)
      
      //-------------function to get clusters-------------\\
async function quickstart(params){
  let credentials = {accessKeyId: params.accessKeyId, secretAccessKey: params.secretAccessKey, region: params.region};
  fs.writeFileSync('./credentials.json', JSON.stringify(credentials));

  AWS.config.loadFromPath('./credentials.json');
        
  let eks = new AWS.EKS({region: 'us-east-2'});

  let nameObj = {name: params.name}

  const clusterData = await new Promise((resolve, reject) => {
  
    eks.describeCluster(nameObj, function(err, data) {
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
        awsDat["nodeCount"]= nodes
        awsDat["location"]= eks.config.region
        clusterArray.push(awsDat)
        resolve(clusterArray);
      }     
      // clusterArray.push(awsDat)
    })
 })
 
 return clusterData;
 
 
}

async function createCluster(params) {
  let credentials = {accessKeyId: params.accessKeyId, secretAccessKey: params.secretAccessKey, region: params.region};
  fs.writeFileSync('./credentials.json', JSON.stringify(credentials));

  AWS.config.loadFromPath('./credentials.json');

  let eks = new AWS.EKS({region: 'us-east-2'});

}

// console.log(clusterArray)


// AWS.config.getCredentials();
// quickstart({name: 'test'});

export default quickstart;