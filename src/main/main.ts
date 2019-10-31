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

 async function getGcp(GOOGLE_APPLICATION_CREDENTIALS, ZONE) {
    const res = await fetchGCP(GOOGLE_APPLICATION_CREDENTIALS, ZONE);
    let dat = new Date()
    console.log('fetchGetgcp -------' , '    ', dat.getTime())
    return res;
 }

ipcMain.on('asynchronous-message', (event: any, creds: any, locations: any) => {
  let search;
  if (!locations.length) search = '-';
  else {
    search = new Set();
    locations.forEach(zone => search.add(zone));
  }

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

// backend for AWS login, invokes the loginAWS function to configure credentials and the listAWS function to pull cluster names in region, then sends to awsRegionDisplayFunc to start the fetching process
ipcMain.on('aws-login', (event: any, arg: any) => {
  loginAWS(arg).then(res=> {
      console.log('awsLogin call ', arg)
  //   listAWS(arg).then(res => {
  //     console.log('listClusters res: ', res)
  //     event.sender.send('awsRegionDisplayFunc', res.clusters)
  //   }).catch((e)=>console.log(e))
  })
})

// invokes the fetchAWS function which uses describeCluster to fetch data for all cluster names in the store
ipcMain.on('asynchronous-message2', (event: any, arg: any) => {
  console.log('in main at async2 and arg is', arg)
  fetchAWS(arg).then(res=>{
    console.log('returned from fetchAWS and res is', res)
    event.sender.send('clusterClient2', res);
    })
  .catch((e)=>console.log(e));
});

// invokes the createAWS function to deploy a new cluster
ipcMain.on('create-aws', (event: any, arg: any) => {
  createAWS(arg).then(res =>{})
  .catch((e) => console.log(e));
});

// invokes the deleteAWS function to delete a cluster from the cloud
ipcMain.on('delete-aws', (event: any, arg: any) => {
  deleteAWS(arg).then(res => {})
  .catch((e) => console.log(e))
});

// invokes the listAWS function from the deploy page
ipcMain.on('list-aws', (event: any, arg: any) => {
  console.log('in main list-aws and arg is ', arg)
  listAWS(arg).then(res => {
    console.log('main list-aws listClusters res: ', res)
    event.sender.send('awsRegionDisplayFunc', res.clusters)
  }).catch((e)=>console.log(e))
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
