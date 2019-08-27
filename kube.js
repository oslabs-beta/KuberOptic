const k8s = require('@kubernetes/client-node');
const kc = new k8s.KubeConfig();
kc.loadFromDefault();

const k8sApi = kc.makeApiClient(k8s.CoreV1Api);
 console.log(k8sApi);
// console.log('-------------CONTEXT-----------')
// console.log(k8sApi.authentications.default.contexts[0])
// console.log('-------------CLUSTERS-----------')
// console.log(k8sApi.authentications.default.clusters[0].name)
// console.log('-------------USERS-----------')
// console.log(k8sApi.authentications.default.users)
// let cc = new k8s.CoreV1Api();
// console.log(cc);
// console.log(k8s.ExtensionsV1beta1Api); //need to figure out how to make apiCLient for ingress and Deployment
// const k8sApi2 = kc.makeApiClient(k8s.ExtensionsV1beta1Api);
// k8sApi.listNamespacedPod('default').then((res) => {
//    console.log('Pods: ' + res.body.items.length);
//    // const pods = res.body.items;
//    // pods.forEach(pod => console.log(pod.metadata.name))
//    // console.log(res.body.items[0].metadata.generateName);
//    // console.log(res.body.items[1].metadata.generateName);
//    // console.log(res.body.items[2].metadata.generateName);
//    // console.log('-----------')
//    // console.log(res.body.items[0]);
//    // console.log(res.body.items[1].spec.nodeName);
//    // console.log(res.body.items[2].spec.nodeName);
//    // console.log(res.body.items[3].spec.nodeName);
//    // console.log(res.body.length)
// });
//
// k8sApi.listNamespacedService('default').then((res) => {
//   console.log('Services: ' + res.body.items.length);
//   // const rr = res.body.items[0].metadata;
//   // console.log(Object.keys(rr));
//    // console.log('Services: ' + res.body.items[0].metadata.name);
//    // console.log(res.body.items[0].metadata.generateName);
// });
//
// k8sApi2.listNamespacedIngress('default').then((res) => {
//    console.log('Ingress: ' + res.body.items.length);
//    // console.log(res.body.items[0].metadata.generateName);
// });
//
// k8sApi2.listNamespacedDeployment('default').then((res) => {
//    console.log('Deployments: ' + res.body.items.length);
//    // console.log(Object.keys(res.body.items[0]));
//    // get containers
//    // console.log(res.body.items[0].spec.template.spec.containers);
//    // console.log(res.body.items[0].metadata.generateName);
// });
//
console.log(('b'+'a'+ + 'a' + 'a').toLowerCase());
