import fs from 'fs';

const AWS = require('aws-sdk');
let nodes = Math.ceil(Math.random() * 5);

// function that takes AWS key, secret, and region from store, writes a json file and uses it to configure AWS credentials
async function loginAWS(params) {
  let credentials = {
    accessKeyId: params.accessKeyId,
    secretAccessKey: params.secretAccessKey,
    region: params.region, //will need to remove
  };

  fs.writeFileSync('./credentials.json', JSON.stringify(credentials));

  await AWS.config.loadFromPath('./credentials.json');

  return params.region;
}

// function that takes AWS region and returns a list of clusters deployed to that region
function listAWS(region) {
  return new Promise((resolve, reject) => {
    let eks = new AWS.EKS(region);
    eks.listClusters((err, data) => {
      if (err) console.error(err, err.stack);
      else {
        resolve(data);
      }
    });
  });
}

// function that takes AWS cluster names from the store and uses the describeCluster method to retrieve data for them individually and push into an array, with each cluster being an object of data
async function fetchAWS(params) {
  if (!params.clusters.length) return [];
  let credentials = {
    accessKeyId: params.accessKeyId,
    secretAccessKey: params.secretAccessKey,
    region: params.region,
  };

  fs.writeFileSync('./credentials.json', JSON.stringify(credentials));

  AWS.config.loadFromPath('./credentials.json');

  let eks = new AWS.EKS({ region: params.region });

  let promiseArray = [];
  let clusterArray = [];

  await params.clusters.forEach(cName => {
    promiseArray.push(
      new Promise((resolve, reject) => {
        eks.describeCluster({ name: cName }, function(err, data) {
          if (err) console.error(err, err.stack);
          else {
            let awsDat = {};
            awsDat['clusterName'] = data.cluster.name;
            awsDat['endpoint'] = data.cluster.endpoint;
            awsDat['creationTime'] = data.cluster.createdAt;
            awsDat['clusterStatus'] = data.cluster.status;
            awsDat['nodeCount'] = nodes;
            awsDat['location'] = eks.config.region;
            clusterArray.push(awsDat);
            resolve(awsDat);
          }
        });
      }),
    );
  });
  return Promise.all(promiseArray);
}

// function that takes AWS cluster name, ARN, subnet IDs, and region to deploy a new cluster to the cloud
async function createAWS(params) {
  let credentials = {
    accessKeyId: params.accessKeyId,
    secretAccessKey: params.secretAccessKey,
    region: params.region,
  };

  fs.writeFileSync('./credentials.json', JSON.stringify(credentials));

  AWS.config.loadFromPath('./credentials.json');

  const request = {
    name: params.name,
    resourcesVpcConfig: params.resourcesVpcConfig,
    roleArn: params.roleArn,
    version: params.version,
  };
  const eks = new AWS.EKS({ region: params.region });

  const createClusties = await new Promise((resolve, reject) => {
    eks.createCluster(request, function(err, data) {
      if (err) console.error(err, err.stack);
      resolve(data);
    });
  });
  return createClusties;
}

//function that takes AWS cluster name and deletes that cluster from the cloud
async function deleteAWS(params) {
  let credentials = {
    accessKeyId: params.accessKeyId,
    secretAccessKey: params.secretAccessKey,
    region: params.region,
  };

  fs.writeFileSync('./credentials.json', JSON.stringify(credentials));

  AWS.config.loadFromPath('./credentials.json');

  const request = {
    name: params.name,
  };
  const eks = new AWS.EKS({ region: params.region });

  const deleteClusties = await new Promise((resolve, reject) => {
    eks.deleteCluster(request, function(err, data) {
      if (err) console.error(err, err.stack);
      resolve(data);
    });
  });
  return deleteClusties;
}

export default [loginAWS, listAWS, fetchAWS, createAWS, deleteAWS];
