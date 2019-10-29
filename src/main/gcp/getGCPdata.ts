import { contourDensity } from "d3";

const container = require('@google-cloud/container');

// // quickstart takes in the GCP credientials object and a timezone
// async function quickstart(GOOGLE_APPLICATION_CREDENTIALS:object, zone:string) {
//   const client = new container.v1.ClusterManagerClient(GOOGLE_APPLICATION_CREDENTIALS);
//   const projectId:string = GOOGLE_APPLICATION_CREDENTIALS['project_id'];
//   // if (zone == null) zone= 'us-central1-a' //currently do not need as we are providing the individual zones

//   console.log('getting from this zone', zone)

//   const request:object = {
//     projectId,
//     zone 
//   };
//     //response returns an object that has all the info we need
//   const [response] = await client.listClusters(request);
//   const clusters:any = response.clusters;

//   const clusterArray = [];

//   clusters.forEach(cluster=>{
//     let gcpDat:object = {};

//     gcpDat["endpoint"] = cluster.endpoint
//     gcpDat["clusterName"] = cluster.name;
//     gcpDat["clusterDescription"] = cluster.description;
//     gcpDat["creationTime"] = cluster.createTime;
//     gcpDat["clusterStatus"] = cluster.status;
//     gcpDat["nodeCount"] = cluster.currentNodeCount;
//     gcpDat["location"] = cluster.location;
//     cluster.nodePools.forEach((node, i)=>{
//     gcpDat[`NodePool_${i}`] = [node.name , `diskSize[Gb]: ${node.config.diskSizeGb}`,
//         `MachineType: ${node.config.machineType}`]
//     })
//     clusterArray.push(gcpDat)
//   })
//   return clusterArray;
// }
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// below here is practice 
// quickstart takes in the GCP credientials object and a timezone
async function quickstart(GOOGLE_APPLICATION_CREDENTIALS:object, zones:any) {
  const client = new container.v1.ClusterManagerClient(GOOGLE_APPLICATION_CREDENTIALS);
  const projectId:string = GOOGLE_APPLICATION_CREDENTIALS['project_id'];
  const parent = `projects/${projectId}/locations/-`
  const request:object = {
    parent 
  };
  const clustersToDisplay = await client.listClusters(request).then(response => {
    const res = response[0];
    return res.clusters.reduce((clusts, nextClust) => {
      if (zones === '-' || zones.has(nextClust.location)) {
        let gcpDat:object = {};
        gcpDat["endpoint"] = nextClust.endpoint
        gcpDat["clusterName"] = nextClust.name;
        gcpDat["clusterDescription"] = nextClust.description;
        gcpDat["creationTime"] = nextClust.createTime;
        gcpDat["clusterStatus"] = nextClust.status;
        gcpDat["nodeCount"] = nextClust.currentNodeCount;
        gcpDat["location"] = nextClust.location;
        nextClust.nodePools.forEach((node, i)=>{
        gcpDat[`NodePool_${i}`] = [node.name , `diskSize[Gb]: ${node.config.diskSizeGb}`,
            `MachineType: ${node.config.machineType}`]
          })
          clusts.push(gcpDat)
        }
        console.log('clusters being built via reduce', clusts)
        return clusts;
      }, [])
    })
    .catch(e=> console.log(e))
    console.log('how often is the array being completed to resend to front?', clustersToDisplay)
    return clustersToDisplay;
  }

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

async function create(GOOGLE_APPLICATION_CREDENTIALS:any, zone:string ='us-central1-a', input:object = {'clusterType':'affordable', 'name':'deployCluster', 'zone':'us-central1-a', 'count':'1'}){
  const client:any = new container.v1.ClusterManagerClient(GOOGLE_APPLICATION_CREDENTIALS);
  GOOGLE_APPLICATION_CREDENTIALS = JSON.parse(GOOGLE_APPLICATION_CREDENTIALS);
  const projectId:string = GOOGLE_APPLICATION_CREDENTIALS["project_id"];
  let clusterCount = Number(input['count'])
  let cluster:object ={};
  let clusterType;
  if (zone === 'us-central1-b' || zone === 'us-west1-a' || zone === 'southamerica-east1-a' || zone === 'southamerica-east1-b' || zone === 'europe-west2-a') {
    clusterType = "1.13.11-gke.9"
  } else {
    clusterType = "1.13.7-gke.24"
  }

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
          "initialNodeCount": clusterCount,
          "autoscaling": {},
          "management": {
            "autoUpgrade": true,
            "autoRepair": true
          },
          "version": clusterType
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
      "initialClusterVersion": clusterType,
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
          "initialNodeCount": clusterCount,
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
          "initialNodeCount": clusterCount,
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
          "initialNodeCount": clusterCount,
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
          "initialNodeCount": clusterCount,
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
          "initialNodeCount": clusterCount,
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
          "initialNodeCount": clusterCount,
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
  //--------------After knowing input configuration----------\\
  const parent = `projects/${projectId}/locations/${zone}`
  const request:object = {
    cluster,
    parent
  }
  await client.createCluster(request)
  .then(responses => { 
    var response = responses[0].status;
  })
  .catch(err => {
    console.error(err);
  });
    
}

export default [quickstart, create];