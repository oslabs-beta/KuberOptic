const container = require('@google-cloud/container');
const GOOGLE_APPLICATION_CREDENTIALS = {
  "type": "service_account",
  "project_id": "demogorgan",
  "private_key_id": "845faaf256e89c6792fcfadf2059a8879e4ef94c",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCM+SKJciIGmJuX\nhblsexFlSL6b8zHIO1E/RpP6F0IYJTwry9nmWg5WPx9+Ow+KFSpLneoBwdbcp5Db\ngbXKN9S8UnMufCPSY43Indp5wACPjQ/0ejMChwwCZF/LtWshH3MIo7aTu69b7AVA\nh3nD/54cSUm/yohqlf20sVTtEeFsClGvbq3A9t53WYWIW0eJ/w0iy9wPZpx3+/vW\nykpoNdHtK57oB7+1wbdQTEPYIXKsyvGMG2Jhl0uiAPOk63LHM0ZyEukPfKdlj7SI\nY6H5FdpF03YD7CTrpdqq4xd7FvxRE8IWzLEP245GFtP1z75jhBVGczX+h7aLJS9R\nqpumJqXZAgMBAAECggEAAUkGMRWazM+YX43HDn+ivXcn0bkqY4Zy665DjBypLBou\nzcFqh6ibh9rEeTylnB8sRws2BnUTdeiLMA0jMKhIprzjsvFLzE+/C6ywwLpo5uYk\n1phEncnIaL8shmlthBxKyrHfaMJly2M/+wIhMJHEicJ7SyXYD4y1hu+09AJdOURt\nWmPr5pnemva6ZAAoYKGTgfaoJAa1V1csDE6t5jZMflOqOVG9I3gPmCZU2jHedrTO\np1lk4aj/O4MwpMc11B5GKnMNWYqLlUwT2tBHMNBtL3+3ia3rPJgq+tLzWvSU+xIU\nBS+PC52NkDiymvcCY3Rup8iPGwGc7zBDszMqRHZMWQKBgQDAFOceznF0QOkCFVmM\n0087pqCNAkPXfkIxA3YlNQdFsomd8SPuqWqrSBcay1X8U5MMyChMli721wVs+Znr\nCrLcVPF9LIOUmT8qOJPJ98x33xm49LSzA79c20uKXLPacbjCKuZMMZ4Cr+OQm0cE\nzn24u4yUfcJ0ZoOL+2lyJhSqFQKBgQC74mRM9MMGBr0N9Je9X/H0YwjGFSB4QvxA\nBBMlde96LiPNjpPtqlpyjlhK4u0HIgvStBOMc9dYpRkFuAU4VPyLORnLmwm60Zn0\nZnaCfUX09romt53hgwpzGmL9MvrU5mZQklHWHndPRYoZS7QPt2C3td5S2qbdHQxe\nzMd+7AMRtQKBgHhDXiXKqfxYu8sDJQtoLl6xyCohdeqRcc4QVcOb/Q6lZ0aNearv\nRgsx2s167D5M8W/6TkkNayA/pnUBnl4sV6peQMjXuxaqEINV4yp8TPfspsVH6W9/\n9CumXhimTDGELGLdy01/b2hNShT7M68NvmeQfcdnKf4JRWm6ot3Ge/+1AoGAUmYZ\nYv69QTlXVHV+ztjzPiDoyiad1OBbzJ983iL44fa2UQJEsijR/gebhUw8c7JkyQWc\nxS5QtVnCvZVVBL2Q/GYQgBEAlWQzRtJhCx1xvtsuDKjenvZfcNeTrkPbad+Z46Ao\nL+WwoZ130Vw4HeRokGk8lc26/KIuuKzKmUlclzkCgYEArjE7YdmOVErBJpWnM0d7\n9Z7BMZSNRufqkDoWwknePi7VS2Crae3/NEd3nV3M7bgzUG/W3QwQuSupBHbPKDFL\n4780GODd9yjIfTyxyi955aVc72XEr8U5K07yolyom/2yeaR0G6uIsekbr2tweb81\nXp1S/oDa95ek7IaGac8ttTs=\n-----END PRIVATE KEY-----\n",
  "client_email": "dg-420@demogorgan.iam.gserviceaccount.com",
  "client_id": "106459053858529781779",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/dg-420%40demogorgan.iam.gserviceaccount.com"
};

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

async function quickstart(GOOGLE_APPLICATION_CREDENTIALS:object, zone:string='us-central1-a') {
    const client = new container.v1.ClusterManagerClient(GOOGLE_APPLICATION_CREDENTIALS);
    const projectId:string = GOOGLE_APPLICATION_CREDENTIALS['project_id'];
    const request:object = {
      projectId,
      zone
    };
    const [response] = await client.listClusters(request);
    const clusters:any = response.clusters;
    //console.log(clusters)
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
        gcpDat[`NodePool_${i}`] = [node.name , `diskSize[Gb]: ${node.config.diskSizeGb}`,
         `MachineType: ${node.config.machineType}`]
      })
      clusterArray.push(gcpDat)
     })

    // console.log(clusters[0].nodePools[0].instanceGroupUrls)
    // console.log(cluster.nodePools[1])
   // console.log(clusterArray);
  return clusterArray;
}
let input = {'clusterType':'affordable', 'name':'deploycluster', 'zone':'us-central1-a'};

async function create(GOOGLE_APPLICATION_CREDENTIALS:any, zone:string ='us-central1-a', input:object = {'clusterType':'affordable', 'name':'deployCluster', 'zone':'us-central1-a'}){
  const client:any = new container.v1.ClusterManagerClient(GOOGLE_APPLICATION_CREDENTIALS);
  GOOGLE_APPLICATION_CREDENTIALS = JSON.parse(GOOGLE_APPLICATION_CREDENTIALS);
  const projectId:string = GOOGLE_APPLICATION_CREDENTIALS["project_id"];
  let cluster:object ={};
  console.log(`we're invoking create input is:` , input)
  console.log('gcptype: ', GOOGLE_APPLICATION_CREDENTIALS["project_id"])
  //console.log
  if(input['clusterType'] == 'affordable'){
    cluster = {
      "name": input['name'],
      "masterAuth": {
        "clientCertificateConfig": {}
      },
      "loggingService": "none",
      "monitoringService": "none",
      "network": `projects/${projectId}/global/networks/default`,
      "addonsConfig": {
        "httpLoadBalancing": {},
        "horizontalPodAutoscaling": {},
        "kubernetesDashboard": {
          "disabled": true
        },
        "istioConfig": {
          "disabled": true
        }
      },
      "subnetwork": `projects/${projectId}/regions/${input['zone'].slice(0,-2)}/subnetworks/default`,
      "nodePools": [
        {
          "name": "pool-1",
          "config": {
            "machineType": "g1-small",
            "diskSizeGb": 30,
            "oauthScopes": [
              "https://www.googleapis.com/auth/devstorage.read_only",
              "https://www.googleapis.com/auth/logging.write",
              "https://www.googleapis.com/auth/monitoring",
              "https://www.googleapis.com/auth/servicecontrol",
              "https://www.googleapis.com/auth/service.management.readonly",
              "https://www.googleapis.com/auth/trace.append"
            ],
            "imageType": "COS",
            "diskType": "pd-standard"
          },
          "initialNodeCount": 1,
          "autoscaling": {},
          "management": {
            "autoUpgrade": true,
            "autoRepair": true
          },
          "version": "1.13.7-gke.24"
        }
      ],
      "networkPolicy": {},
      "ipAllocationPolicy": {
        "useIpAliases": true
      },
      "masterAuthorizedNetworksConfig": {},
      "defaultMaxPodsConstraint": {
        "maxPodsPerNode": "110"
      },
      "authenticatorGroupsConfig": {},
      "privateClusterConfig": {},
      "databaseEncryption": {
        "state": "DECRYPTED"
      },
      "initialClusterVersion": "1.13.7-gke.24",
      "location": input['zone']
    }
  }

  if(input['clusterType'] == 'standard'){
    cluster = {
      "name": input['name'],
      "masterAuth": {
        "clientCertificateConfig": {}
      },
      "loggingService": "logging.googleapis.com",
      "monitoringService": "monitoring.googleapis.com",
      "network": `projects/${projectId}/global/networks/default`,
      "addonsConfig": {
        "httpLoadBalancing": {},
        "horizontalPodAutoscaling": {},
        "kubernetesDashboard": {
          "disabled": true
        },
        "istioConfig": {
          "disabled": true
        }
      },
      "subnetwork": `projects/${projectId}/regions/${input['zone'].slice(0,-2)}/subnetworks/default`,
      "nodePools": [
        {
          "name": "default-pool",
          "config": {
            "machineType": "n1-standard-1",
            "diskSizeGb": 100,
            "oauthScopes": [
              "https://www.googleapis.com/auth/devstorage.read_only",
              "https://www.googleapis.com/auth/logging.write",
              "https://www.googleapis.com/auth/monitoring",
              "https://www.googleapis.com/auth/servicecontrol",
              "https://www.googleapis.com/auth/service.management.readonly",
              "https://www.googleapis.com/auth/trace.append"
            ],
            "imageType": "COS",
            "diskType": "pd-standard",
            "shieldedInstanceConfig": {}
          },
          "initialNodeCount": 3,
          "autoscaling": {},
          "management": {
            "autoUpgrade": true,
            "autoRepair": true
          },
          "version": "1.12.8-gke.10"
        }
      ],
      "networkPolicy": {},
      "ipAllocationPolicy": {
        "useIpAliases": true
      },
      "masterAuthorizedNetworksConfig": {},
      "defaultMaxPodsConstraint": {
        "maxPodsPerNode": "110"
      },
      "authenticatorGroupsConfig": {},
      "privateClusterConfig": {},
      "databaseEncryption": {
        "state": "DECRYPTED"
      },
      "initialClusterVersion": "1.12.8-gke.10",
      "location": input['zone']
    }
  }

  if(input['clusterType'] == 'cpuIntensive'){
    cluster = {
      "name": input['name'],
      "masterAuth": {
        "clientCertificateConfig": {}
      },
      "loggingService": "logging.googleapis.com",
      "monitoringService": "monitoring.googleapis.com",
      "network": `projects/${projectId}/global/networks/default`,
      "addonsConfig": {
        "httpLoadBalancing": {},
        "horizontalPodAutoscaling": {},
        "kubernetesDashboard": {
          "disabled": true
        },
        "istioConfig": {
          "disabled": true
        }
      },
      "subnetwork": `projects/${projectId}/regions/${input['zone'].slice(0,-2)}/subnetworks/default`,
      "nodePools": [
        {
          "name": "high-cpu-pool-1",
          "config": {
            "machineType": "n1-highcpu-4",
            "diskSizeGb": 100,
            "oauthScopes": [
              "https://www.googleapis.com/auth/devstorage.read_only",
              "https://www.googleapis.com/auth/logging.write",
              "https://www.googleapis.com/auth/monitoring",
              "https://www.googleapis.com/auth/servicecontrol",
              "https://www.googleapis.com/auth/service.management.readonly",
              "https://www.googleapis.com/auth/trace.append"
            ],
            "imageType": "COS",
            "diskType": "pd-standard",
            "shieldedInstanceConfig": {}
          },
          "initialNodeCount": 3,
          "autoscaling": {
            "enabled": true,
            "minNodeCount": 1,
            "maxNodeCount": 5
          },
          "management": {
            "autoUpgrade": true,
            "autoRepair": true
          },
          "version": "1.12.8-gke.10"
        }
      ],
      "networkPolicy": {},
      "ipAllocationPolicy": {
        "useIpAliases": true
      },
      "masterAuthorizedNetworksConfig": {},
      "defaultMaxPodsConstraint": {
        "maxPodsPerNode": "110"
      },
      "authenticatorGroupsConfig": {},
      "privateClusterConfig": {},
      "databaseEncryption": {
        "state": "DECRYPTED"
      },
      "initialClusterVersion": "1.12.8-gke.10",
      "location": input['zone']
    }
  }

  if(input['clusterType'] == 'memoryIntensive'){
    cluster = {
      "name": input['name'],
      "masterAuth": {
        "clientCertificateConfig": {}
      },
      "loggingService": "logging.googleapis.com",
      "monitoringService": "monitoring.googleapis.com",
      "network": `projects/${projectId}/global/networks/default`,
      "addonsConfig": {
        "httpLoadBalancing": {},
        "horizontalPodAutoscaling": {},
        "kubernetesDashboard": {
          "disabled": true
        },
        "istioConfig": {
          "disabled": true
        }
      },
      "subnetwork": `projects/${projectId}/regions/${input['zone'].slice(0,-2)}/subnetworks/default`,
      "nodePools": [
        {
          "name": "high-mem-pool-1",
          "config": {
            "machineType": "n1-highmem-2",
            "diskSizeGb": 100,
            "oauthScopes": [
              "https://www.googleapis.com/auth/devstorage.read_only",
              "https://www.googleapis.com/auth/logging.write",
              "https://www.googleapis.com/auth/monitoring",
              "https://www.googleapis.com/auth/servicecontrol",
              "https://www.googleapis.com/auth/service.management.readonly",
              "https://www.googleapis.com/auth/trace.append"
            ],
            "imageType": "COS",
            "diskType": "pd-standard",
            "shieldedInstanceConfig": {}
          },
          "initialNodeCount": 3,
          "autoscaling": {
            "enabled": true,
            "minNodeCount": 1,
            "maxNodeCount": 5
          },
          "management": {
            "autoUpgrade": true,
            "autoRepair": true
          },
          "version": "1.12.8-gke.10"
        }
      ],
      "networkPolicy": {},
      "ipAllocationPolicy": {
        "useIpAliases": true
      },
      "masterAuthorizedNetworksConfig": {},
      "defaultMaxPodsConstraint": {
        "maxPodsPerNode": "110"
      },
      "authenticatorGroupsConfig": {},
      "privateClusterConfig": {},
      "databaseEncryption": {
        "state": "DECRYPTED"
      },
      "initialClusterVersion": "1.12.8-gke.10",
      "location": input['zone']
    }
  }

  if(input['clusterType'] == 'gpuAcceleratedComputing'){
    cluster = {
      "name": input['name'],
      "masterAuth": {
        "clientCertificateConfig": {}
      },
      "loggingService": "logging.googleapis.com",
      "monitoringService": "monitoring.googleapis.com",
      "network": `projects/${projectId}/global/networks/default`,
      "addonsConfig": {
        "httpLoadBalancing": {},
        "horizontalPodAutoscaling": {},
        "kubernetesDashboard": {
          "disabled": true
        },
        "istioConfig": {
          "disabled": true
        }
      },
      "subnetwork": `projects/${projectId}/regions/${input['zone'].slice(0,-2)}/subnetworks/default`,
      "nodePools": [
        {
          "name": "standard-pool-1",
          "config": {
            "machineType": "n1-standard-1",
            "diskSizeGb": 100,
            "oauthScopes": [
              "https://www.googleapis.com/auth/devstorage.read_only",
              "https://www.googleapis.com/auth/logging.write",
              "https://www.googleapis.com/auth/monitoring",
              "https://www.googleapis.com/auth/servicecontrol",
              "https://www.googleapis.com/auth/service.management.readonly",
              "https://www.googleapis.com/auth/trace.append"
            ],
            "imageType": "COS",
            "diskType": "pd-standard",
            "shieldedInstanceConfig": {}
          },
          "initialNodeCount": 3,
          "autoscaling": {},
          "management": {
            "autoUpgrade": true,
            "autoRepair": true
          },
          "version": "1.12.8-gke.10"
        },
        {
          "name": "gpu-pool-1",
          "config": {
            "machineType": "n1-highmem-2",
            "diskSizeGb": 100,
            "oauthScopes": [
              "https://www.googleapis.com/auth/devstorage.read_only",
              "https://www.googleapis.com/auth/logging.write",
              "https://www.googleapis.com/auth/monitoring",
              "https://www.googleapis.com/auth/servicecontrol",
              "https://www.googleapis.com/auth/service.management.readonly",
              "https://www.googleapis.com/auth/trace.append"
            ],
            "imageType": "COS",
            "accelerators": [
              {
                "acceleratorCount": "1",
                "acceleratorType": "nvidia-tesla-k80"
              }
            ],
            "diskType": "pd-standard",
            "shieldedInstanceConfig": {}
          },
          "initialNodeCount": 1,
          "autoscaling": {},
          "management": {
            "autoUpgrade": true,
            "autoRepair": true
          },
          "version": "1.12.8-gke.10"
        }
      ],
      "networkPolicy": {},
      "ipAllocationPolicy": {
        "useIpAliases": true
      },
      "masterAuthorizedNetworksConfig": {},
      "defaultMaxPodsConstraint": {
        "maxPodsPerNode": "110"
      },
      "authenticatorGroupsConfig": {},
      "privateClusterConfig": {},
      "databaseEncryption": {
        "state": "DECRYPTED"
      },
      "initialClusterVersion": "1.12.8-gke.10",
      "location": input['zone']
    }
  }
  if(input['clusterType'] == 'highly_available'){
    cluster = {
      "name": input['name'],
      "masterAuth": {
        "clientCertificateConfig": {}
      },
      "loggingService": "logging.googleapis.com",
      "monitoringService": "monitoring.googleapis.com",
      "network": `projects/${projectId}/global/networks/default`,
      "addonsConfig": {
        "httpLoadBalancing": {},
        "horizontalPodAutoscaling": {},
        "kubernetesDashboard": {
          "disabled": true
        },
        "istioConfig": {
          "disabled": true
        }
      },
      "subnetwork": `projects/${projectId}/regions/${input['zone'].slice(0,-2)}/subnetworks/default`,
      "nodePools": [
        {
          "name": "standard-pool-1",
          "config": {
            "machineType": "n1-standard-2",
            "diskSizeGb": 100,
            "oauthScopes": [
              "https://www.googleapis.com/auth/devstorage.read_only",
              "https://www.googleapis.com/auth/logging.write",
              "https://www.googleapis.com/auth/monitoring",
              "https://www.googleapis.com/auth/servicecontrol",
              "https://www.googleapis.com/auth/service.management.readonly",
              "https://www.googleapis.com/auth/trace.append"
            ],
            "imageType": "COS",
            "diskType": "pd-standard",
            "shieldedInstanceConfig": {}
          },
          "initialNodeCount": 3,
          "autoscaling": {
            "enabled": true,
            "minNodeCount": 1,
            "maxNodeCount": 5
          },
          "management": {
            "autoUpgrade": true,
            "autoRepair": true
          },
          "version": "1.12.8-gke.10"
        }
      ],
      "networkPolicy": {},
      "ipAllocationPolicy": {
        "useIpAliases": true
      },
      "masterAuthorizedNetworksConfig": {},
      "maintenancePolicy": {
        "window": {
          "dailyMaintenanceWindow": {
            "startTime": "10:00"
          }
        }
      },
      "defaultMaxPodsConstraint": {
        "maxPodsPerNode": "110"
      },
      "authenticatorGroupsConfig": {},
      "privateClusterConfig": {},
      "databaseEncryption": {
        "state": "DECRYPTED"
      },
      "initialClusterVersion": "1.12.8-gke.10",
      "location": input['zone']
    }
  }
  const request:object = {
    projectId,
    zone,
    cluster
  }
  client.createCluster(request)
  .then(responses => {
    var response = responses[0];
    // doThingsWith(response)
    console.log(response)
  })
  .catch(err => {
    console.error(err);
  });
}

// function test1(){
//   console.log('test1')
// }
// function test2(){
//   console.log('test2')
// }
//create(GOOGLE_APPLICATION_CREDENTIALS)
// quickstart(GOOGLE_APPLICATION_CREDENTIALS);
export default [quickstart,create];

// export default [test1, test2]
