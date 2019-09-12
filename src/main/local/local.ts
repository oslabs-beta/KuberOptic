const k8s = require('@kubernetes/client-node');
const kc = new k8s.KubeConfig();
kc.loadFromDefault();
const k8sApi = kc.makeApiClient(k8s.CoreV1Api);

async function fetchLocal(data={}){
    await k8sApi.listNamespacedPod('default').then((res) => {


   const metaDat = {};
   for(let meta in res.body.items[0].metadata){
      if(res.body.items[0].metadata[meta]){
         metaDat[meta] = res.body.items[0].metadata[meta]
      }
   }
   
   const statusDat = {};

   for(let stat in res.body.items[0].status){
      if(res.body.items[0].status[stat] && typeof res.body.items[0].status[stat] !== 'object'){
         statusDat[stat] = res.body.items[0].status[stat]
      }
   }
   data["endpoint"] = statusDat["hostIP"]
   data["clusterName"] = res.body.items[0].metadata.clusterName||'Minikube';
   data["creationTime"] = res.body.items[0].metadata.creationTimestamp;
   data["metaDataNameSpace"] = res.body.items[0].metadata.namespace
   data["nodeName"] = res.body.items[0].spec.nodeName;
   data["nodeCount"] = 1;
   data["location"] = "localhost";

   for(let i = 0; i < res.body.items.length; i++){
      res.body.items[i].spec.containers.forEach(
         (el,j)=>data[`NodePool_${j}`] = {'podName':res.body.items[i].metadata.name,'image':el.image, 'containerName':el.name})
   }

   })
   let res = [];
   res.push(data)
  return res;
}

export default fetchLocal;
