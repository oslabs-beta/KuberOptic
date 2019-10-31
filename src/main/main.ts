import { area } from "d3";

const fetchLocal = require('./local/local').default
const [fetchGCP, create] = require('./gcp/getGCPdata').default;
const [loginAWS, listAWS, fetchAWS, createAWS, deleteAWS] = require('./aws/getAWSData').default
const { app, ipcMain, BrowserWindow } = require('electron');

let dat = new Date()
 async function getLocal() {
    const res = await fetchLocal();
    console.log('getting fetch Local at -------' , '    ', dat.getTime())
    return res;
 }
//routes request to getGCPData page
 async function getGcp(GOOGLE_APPLICATION_CREDENTIALS, ZONE) {
    const res = await fetchGCP(GOOGLE_APPLICATION_CREDENTIALS, ZONE);
    let dat = new Date()
    console.log('fetchGetgcp -------' , '    ', dat.getTime())
    return res;
 }
//call from GCP to go get clusters in locations listed
ipcMain.on('asynchronous-message', (event: any, creds: any, locations: any) => {
  getLocal()
  .then(res => event.sender.send('clusterClient', res))
  .catch((e)=>console.log(e))
  //if no zones were checked, it will fetch all deployed clusters associated with Project ID
  let search;
  if (!locations.length) search = '-';
  //otherwise we want it to create a set with unique zone values, for checking the response
  else {
    search = new Set();
    locations.forEach(zone => search.add(zone));
  }
  //sends the locations to fetch GCP on GetGCPData page
  getGcp(creds, search)
  //sends the clusters back to GCP page to display
  .then(res => event.sender.send('clusterClient', res))
  .catch((e)=>console.log(e))
})
//following deployment of a GCP cluster, asks it to get other clusters in that same zone
ipcMain.on('getNewClusters', (event: any, creds: any, location: any) => {
  const search = new Set();
  search.add(location)
  getGcp(creds, search)
  //sends the clusters back to GCP page to display
  .then(res=> event.sender.send('newClusters', res))
  .catch((e)=>console.log(e))
})

// backend for AWS login, invokes the loginAWS function to configure credentials and the listAWS function to pull cluster names in region, then sends to awsRegionDisplayFunc to start the fetching process

ipcMain.on('aws-login', (event: any, arg: any) => {
  loginAWS(arg).then(res=> {
      console.log('awsLogin call ', arg)
    listAWS(res).then(resp => {
      console.log('listClusters res: ', resp)
      event.sender.send('awsRegionDisplayFunc', resp.clusters)
    }).catch((e)=>console.log(e))
  })
})

// invokes the fetchAWS function which uses describeCluster to fetch data for all cluster names in the store
ipcMain.on('asynchronous-message2', (event: any, arg: any) => {
  console.log('argument coming in', arg)
  if (!arg.clusters.length) {
    console.log('is this catching the empty array?')
    event.sender.send('clusterClient2', []);
  } else {
    fetchAWS(arg)
    .then(res=>{event.sender.send('clusterClient2', res);})
    .catch((e)=>console.log(e));
  }
});

// invokes the createAWS function to deploy a new cluster
ipcMain.on('create-aws', (event: any, arg: any) => {
  createAWS(arg)
  .then(res =>{event.sender.send('created', res.cluster.name)})
  .catch((e) => console.log(e));
});

// invokes the deleteAWS function to delete a cluster from the cloud
ipcMain.on('delete-aws', (event: any, arg: any) => {
  deleteAWS(arg)
  .then(res => {
    console.log('what do we get from deleting', res)
    event.sender.send('deleted', res.cluster.name)})
  .catch((e) => console.log(e))
});

// invokes the listAWS function from the deploy page
ipcMain.on('list-aws', (event: any, arg: any) => {
  console.log('in main list-aws and arg is ', arg)
  listAWS(arg).then(res => {
    event.sender.send('awsRegionDisplayFunc', res);
  });
});


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
