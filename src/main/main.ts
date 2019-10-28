const fetchLocal = require('./local/local').default
const [fetchGCP, create] = require('./gcp/getGCPdata').default;
const [loginAWS, listAWS, fetchAWS, createAWS, deleteAWS] = require('./aws/getAWSData').default
const { app, ipcMain, BrowserWindow } = require('electron');
import { StoreContext } from '../../store'
import { awsRegionDisplay } from '../client/components/awsDeployPage'

let dat = new Date()
 async function getLocal() {
    const res = await fetchLocal();
    console.log('getting fetch Local at -------' , '    ', dat.getTime())
    return res;
 }

 async function getGcp(GOOGLE_APPLICATION_CREDENTIALS, ZONE) {
    const res = await fetchGCP(GOOGLE_APPLICATION_CREDENTIALS, ZONE);
    let dat = new Date()
    console.log('fetchGetgcp -------' , '    ', dat.getTime())
    return res;
 }

// ipcMain.on('asynchronous-message', (event: any, creds: any, locations: any) => {
//   getLocal().then(res=>{
//     event.sender.send('clusterClient', res)      
//   }).catch((e)=>console.log(e))
//   const returnedClusters = locations.map((zone) => {
//     return new Promise ((resolve, reject) => {
//       getGcp(creds, zone)
//       .then(res => {
//         if (res.length >= 1) {
//           const clusters = []
//           for (let clust of res) {
//             clusters.push(clust)
//           }
//           resolve(clusters)
//         }})
//       .catch((e)=> {
//         console.log(e)
//         reject()
//       })
//     })
//   })
//   Promise.all(returnedClusters)
//   .then(res => {
//     event.sender.send('clusterClient', res)
//     console.log('here in promise.all resolve', res) 
//   })
//   .catch((e)=>console.log(e))
// })

ipcMain.on('asynchronous-message', (event: any, creds: any, locations: any) => {
  let search;
  if (!locations.length) search = '-';
  else {
    search = new Set();
    locations.forEach(zone => search.add(zone));
  }

  // getLocal()
  // .then(res=> event.sender.send('clusterClient', res))
  // .catch((e)=>console.log(e))

  getGcp(creds, search)
  .then(res => event.sender.send('clusterClient', res))
  .catch((e)=>console.log(e))
})

ipcMain.on('getNewClusters', (event: any, creds: any, location: any) => {
  const search = new Set();
  search.add(location)
  getGcp(creds, search)
  .then(res=> event.sender.send('newClusters', res))
  .catch((e)=>console.log(e))
})


ipcMain.on('aws-login', (event: any, arg: any) => {
  loginAWS(arg).then(res=> {
      console.log('awsLogin call ', arg)
    listAWS(arg).then(res => {
      console.log('listClusters res: ', res)
      event.sender.send('awsRegionDisplayFunc', res.clusters)
    }).catch((e)=>console.log(e))
  })
})

ipcMain.on('asynchronous-message2', (event: any, arg: any) => {
  console.log('start of async2')
  fetchAWS(arg).then(res=>{
    console.log('response on main ', res);
    event.sender.send('clusterClient2', res)
    // console.log('res in aws: ', res)
    // console.log('clusters: ', Store.clusters, 'cluster count: ', Store.clusterCount, 'aws cluster names: ', Store.awsClusterName)
    })
  .catch((e)=>console.log(e))
})

ipcMain.on('create-aws', (event: any, arg: any) => {
  createAWS(arg).then(res =>{
    console.log('create response on main :', res);
    event.sender.send('createCluster2', res)
  })
  .catch((e) => console.log(e))
})

ipcMain.on('delete-aws', (event: any, arg: any) => {
  console.log('in main delete-aws')
  deleteAWS(arg).then(res => {
    event.sender.send('createCluster2', res)
  })
  .catch((e) => console.log(e))
})

ipcMain.on('list-aws', (event: any, arg: any) => {
  console.log('in main list-aws')
  listAWS(arg).then(res => {
    console.log('listClusters res: ', res)
    event.sender.send('awsRegionDisplay', res)
  })
})

// ipcMain.on('getNewClusters2', (event: any, arg: any) => {
//   fetchAWS(arg).then(res=>{
//     event.sender.send('newClusters2', res)
//     console.log('res in aws: ', res)
//     })
//   .catch((e)=>console.log(e))
// })


app.on('ready', () => {
  // This creates a window on startup
  const window = new BrowserWindow({  
    webPreferences: {
      nodeIntegration: true // allow node integration on BrowserWindow
    },
  });
    window.maximize();
    window.show();


  // This loads the html page we bundled with webpack to display
  window.loadURL(`file://${__dirname}/index.html`);
});
