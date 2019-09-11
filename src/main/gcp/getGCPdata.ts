const container = require('@google-cloud/container');
const GOOGLE_APPLICATION_CREDENTIALS = {};

//const containeranalysis = require('@google-cloud/containeranalysis');

// const client = new containeranalysis.v1beta1.GrafeasV1Beta1Client({
//   // optional auth parameters.
// });

// // Iterate over all elements.
// const formattedParent = client.projectPath('kubernati');

;

async function quickstart(GOOGLE_APPLICATION_CREDENTIALS:object, zone:string='us-central1-a') {
    const client = new container.v1.ClusterManagerClient(GOOGLE_APPLICATION_CREDENTIALS);
    const projectId:string = GOOGLE_APPLICATION_CREDENTIALS['project_id'];
    const request:object = {
      projectId,
      zone
    };
    const [response] = await client.listClusters(request);
    const clusters:any = response.clusters;

   const clusterArray = [];

   clusters.forEach(cluster=>{
     let gcpDat:object = {};
     let clusterDat = {};
      for(let prop in cluster){
      if(prop!== 'masterAuth' && prop!== 'masterAuthorizedNetworksConfig'){
        if(prop == 'nodePools' || prop == 'networkConfig' || prop == 'endpoint'){
            clusterDat[prop] = cluster[prop]
        }
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
  //  console.log(clusterArray);
  return clusterArray;
}

async function create(GOOGLE_APPLICATION_CREDENTIALS:any, zone:string ='us-central1-a', input:object = {'clusterType':'affordable', 'name':'deployCluster', 'zone':'us-central1-a'}){
  const client:any = new container.v1.ClusterManagerClient(GOOGLE_APPLICATION_CREDENTIALS);
  GOOGLE_APPLICATION_CREDENTIALS = JSON.parse(GOOGLE_APPLICATION_CREDENTIALS);
  const projectId:string = GOOGLE_APPLICATION_CREDENTIALS["project_id"];
  let cluster:object ={};
  console.log(`we're invoking create input is:` , input)
  console.log('gcptype: ', GOOGLE_APPLICATION_CREDENTIALS["project_id"])

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
