const k8s = require('@kubernetes/client-node');
const kc = new k8s.KubeConfig();
kc.loadFromDefault();

const k8sApi = kc.makeApiClient(k8s.CoreV1Api);
//const k8sApi2 = kc.makeApiClient(k8s.ExtensionsV1beta1Api);

let data = {};
 async function fetchLocal(data={}){
    await k8sApi.listNamespacedPod('default').then((res) => {
        //getting clusterName
        //  console.log('meta clusterName: ' , res.body.items[0].metadata.clusterName)
        data["clusterName"] = res.body.items[0].metadata.clusterName;
        //  console.log('meta timestamp creation : ' , res.body.items[0].metadata.creationTimestamp)
        data["creationTime"] = res.body.items[0].metadata.creationTimestamp;
        //  console.log('meta namespace ' , res.body.items[0].metadata.namespace)
        data["metaDataNameSpace"] = res.body.items[0].metadata.namespace
        //  console.log('nodeName ',res.body.items[0].spec.nodeName);
        data["nodeName"] = res.body.items[0].spec.nodeName;
       // console.log('--------------------')
       
        
        //  console.log('DockerContainer ',res.body.items[0].spec.containers[0].image);
        for(let i = 0; i < res.body.items.length; i++){
           res.body.items[i].spec.containers.forEach(
              (el,j)=>data[`dockerContainer_${j}`] = {'podName':res.body.items[i].metadata.name,'image':el.image, 'containerName':el.name})

        }
        //  console.log('containerName ',res.body.items[0].spec.containers[0].name);
        //  console.log('Amount of Pods: ' + res.body.items.length);
    })
  return data;
}
//fetchLocal()
export default fetchLocal;
// k8sApi.listNamespacedService('default').then((res) => {
//   console.log('Services Name: ' + res.body.items[0].metadata.name);
//   console.log('Api server labels', res.body.items[0].metadata.labels)
//   });
// k8sApi2.listNamespacedIngress('default').then((res) => {
//    console.log('this is how many ingress we have: ', res.body.items.length)
//    res.body.items.forEach(el=>console.log('Ingress Name: ',el.name));
//    // console.log(res.body.items[0].metadata.generateName);
// });

//k8sApi2.listNamespacedDeployment('default').then((res) => {
   // console.log('---------------------------')
   // console.log(res.body.items[0].spec.stragety);
//    console.log('deployment info: ', 
//    {'stragety':res.body.items[0].stragety,
//       'status':res.body.items[0].status,
// })
// console.log(res.body.items[0].metadata.generateName);
//});
//console.log('k8auth: ' , k8sApi.authentications.default.contexts[0])
//console.log(data;
