import fs from 'fs';
import { promises } from 'dns';

const AWS = require('aws-sdk')
let nodes = Math.ceil(Math.random() * 5)

async function loginAWS(params) {
  console.log('inside loginAWS, and region is', params.region)
  let credentials = {
    accessKeyId: params.accessKeyId, 
    secretAccessKey: params.secretAccessKey, 
    region: params.region
  };

  fs.writeFileSync('./credentials.json', JSON.stringify(credentials));

  AWS.config.loadFromPath('./credentials.json');
        
  let eks = new AWS.EKS(params.region);

  return params.region
}

async function listAWS(region) {
  console.log('inside loginAWS, and region is', region.region)

  return new Promise ((resolve, reject) => {

    
    let eks = new AWS.EKS(region.region);
    
    eks.listClusters((err, data) => {
      if (err) console.log(err, err.stack);
      else {
        console.log('data is ', data)
        resolve(data)
      }
    }
    )
  })

}

//-------------function to get clusters-------------\\
async function fetchAWS(params){

  let credentials = {
    accessKeyId: params.accessKeyId, 
    secretAccessKey: params.secretAccessKey, 
    region: params.region
  };
  
  fs.writeFileSync('./credentials.json', JSON.stringify(credentials));

  AWS.config.loadFromPath('./credentials.json');
        
  let eks = new AWS.EKS({region: params.region});

  // let nameObj = {name: params.name}

  // let clusterArray = [];

  // const clusterData = await new Promise((resolve, reject) => {
  //   eks.describeCluster(nameObj, function(err, data) {
  //     if (err) console.log(err, err.stack); // an error occurred  
  //     else{
  //       let awsDat = {};
      
  //       awsDat["clusterName"]= data.cluster.name           // successful response
  //       awsDat["endpoint"]= data.cluster.endpoint
  //       awsDat["creationTime"]= data.cluster.createdAt
  //       awsDat["clusterStatus"]= data.cluster.status
  //       awsDat["nodeCount"]= nodes
  //       awsDat["location"]= eks.config.region
  //       clusterArray.push(awsDat)
  //       resolve(clusterArray);
  //     }
  //   })
  //     // clusterArray.push(awsDat)
  // })

  console.log('inside fetchAWS', params.name)
  let promiseArray = [];
  let clusterArray = [];


    params.name.forEach(el => {
      promiseArray.push(new Promise((resolve, reject) => {

        eks.describeCluster({name: el}, function(err, data) {
          if (err) console.log(err, err.stack); // an error occurred  
          else{
            let awsDat = {};
            
            awsDat["clusterName"]= data.cluster.name           // successful response
            awsDat["endpoint"]= data.cluster.endpoint
            awsDat["creationTime"]= data.cluster.createdAt
            awsDat["clusterStatus"]= data.cluster.status
            awsDat["nodeCount"]= nodes
            awsDat["location"]= eks.config.region
            clusterArray.push(awsDat)
            resolve(awsDat);
          
      }
    })
  }));
  }) 
  console.log('clusterArray: ', clusterArray)
  // console.log('clusters: ', Store.clusters, 'cluster count: ', Store.clusterCount, 'aws cluster names: ', Store.awsClusterName)
  return Promise.all(promiseArray);
}

async function createAWS(params) {
  const request = {
    name: params.name,
    resourcesVpcConfig: params.resourcesVpcConfig,
    roleArn: params.roleArn,
    version: params.version,
  }
  const eks = new AWS.EKS({region: params.region});
  const createClusties = await new Promise((resolve, reject) => {
    eks.createCluster(request, function (err, data) {
      if (err) console.log(err, err.stack)
      console.log(data);
      resolve(data);
    })
  })
  
  return createClusties;
}

async function deleteAWS(params) {
  console.log('in deleteAWS')
  const request = {
    name: params.name
  }
  const eks = new AWS.EKS({region: params.region});
  const deleteClusties = await new Promise ((resolve, reject) => {
    eks.deleteCluster(request, function (err, data) {
      if (err) console.log(err, err.stack)
      resolve(data);
    })
  })
  console.log(deleteClusties)
  return deleteClusties
}


// AWS.config.getCredentials();
// fetchAWS({name: 'test'});

export default [loginAWS, listAWS, fetchAWS, createAWS, deleteAWS]; //if functionality to deploy is possible

// export default fetchAWS;