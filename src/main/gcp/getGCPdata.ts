const container = require('@google-cloud/container');
const GOOGLE_APPLICATION_CREDENTIALS = {
  "type": "service_account",
  "project_id": "kubernati",
  "private_key_id": "d514feb8929365b6adaf6d6714676885522a062c",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCzA/Sb7Q//xCRz\nobJl2RyRQXwC5cRR8FDa8tudQOCGE8u5vikGBT28aNcTNpFSc2TaZMhxM47RxNkx\nyd9xUvnJf4XlxkYFyU1Wuimgu7IYk/bp0dioqGZ18CoKUC3hls9vKAJ4QjPAElyA\nxmY3hsxfsIoz74zFYScKUm1bLEo4AA9WgbihB3GE1Xk6o2HaW9ykDhQZ+UEsOZj3\na4RaaHerZ9hVyv735Ydxv4O8Uw7kfS0dr9AzWe4pLi6LXIrW1nrYSBXe2L7FwJbe\nOO+bmbUsyKS2fNIe9y+Cv/KRyzL/kKShvMmzPUQIhat0NETSZXCOUXJWMn4boTz9\nKr/85euhAgMBAAECggEAAM0ESrAI37nbuKN1HAroi38PsCbhXeU5hGA8oqeGFZ14\nLmmbDwCGIB4XM7odVHFJFsfHhIegtIApIVWUDQKMNOY/1elBGhCmapxYuDQMwfrD\n+pPucGM3+aA4XO1SxjkFrqtu9uUjbIEchjQ1A/uztXwhgyXXwzCKA1we6n7wSk+2\nVMCLr5ZaoMudpQ8c1ddqaDL/aPegNAImZnh/THgab/ARd6Zb5u8UDFvUlnavabqX\nTBi6k6QfcXWx11FrHMnRN29onDU9xJJSM/JbZVBTNxkxyxiWgCH8TNhZsZeZn/+4\nvAhH9iXvIglN6jw/oqb87OvTw/YdggVBmZEsvtSPgQKBgQDuA8va4p1mOtzjAteE\nLNihO6SI4yAdQ+QLs2TKh73bW+q1oGG56f+9RAxBaLiFv78LsfkWRcpr7NbpLnJW\nzwcq6vDR1Ke2VjAU6cDwNglm0t2FHr+CjfAgedrCHtzvTCIJfX5tt6xj7kVlpF4v\njHrUxIw12X9Ce7ruXik/zk0QwQKBgQDAit02atQp1AuFa7A8PNHDaV5exKas7mkr\nJeHtUG7FiBNm88aLJIH99+NwWO6FgfL9E0iOfhzjI5u3FML4v3QQBT5XT67YB5Si\nPxJbeawA7MwqhsMQ1WtQA8w3Nic2WnLuhmfy8Ah4qKGQRM5kYXofAWCo4553sxjK\nb9Vn8oSy4QKBgQC9xT8bRUXUBaiqQ1DMbOlIHILCNb0cOE4x2hXJuVLx/CZ2K+rf\nTaf/IqtW14UP9uL/EyaT0I9lX4+2mbbGagi/+lSKKLCTm8J4WivgGmWCmyvOAMcW\n8856Rk3aKrti/GPDB1Dvb9u+TXL9aIFEDhC9ZfyYztI9kuNnPKJM4lLlwQKBgC8e\nTIBSqFUMJT2jWt+C6rptgMCkUz2iom4CuUVAF7uTT1w0b/QBHSavkSMfQE+/u10f\naPQl/J/BSQwGsqf5AkghYF4xi9ImGMOTt8RXBDa9vEDz9aya7cYJB+LDB9mPTOz+\nS1XyU8BjVBZgIDoEeMQ5rBPokBEu7PQtZgYoHT1BAoGAae7BgjuPPr8gD0/S8J8F\nv9rAsNdKA+LWUnKkNx36CZbsTMNM48nFRkfSVd/PVWgauTUaD9xbn5bbEWT2qvjl\nkraIvC4XLpvksSkS23CQIxwNoZJAW915YsLux6l3PxKJgNodrtKLA6ahEh4GGJK0\ngDrUQIG1gMiZpaEV1QU12XE=\n-----END PRIVATE KEY-----\n",
  "client_email": "458439475138-compute@developer.gserviceaccount.com",
  "client_id": "105214681011184349548",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/458439475138-compute%40developer.gserviceaccount.com"
};

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
let input = {'clusterType':'affordable', 'name':'deploycluster', 'zone':'us-central1-a'};
async function create(GOOGLE_APPLICATION_CREDENTIALS:object, zone:string ='us-central1-a', input:object = {'clusterType':'affordable', 'name':'deployCluster', 'zone':'us-central1-a'}){
  const client:any = new container.v1.ClusterManagerClient(GOOGLE_APPLICATION_CREDENTIALS);
  const projectId:string = GOOGLE_APPLICATION_CREDENTIALS['project_id'];
  
  let cluster:object ={};

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
//create(GOOGLE_APPLICATION_CREDENTIALS)
 //quickstart(GOOGLE_APPLICATION_CREDENTIALS);
export default quickstart;
