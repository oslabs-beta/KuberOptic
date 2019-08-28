const fetchLocal = require('./local/local').default
const fetchGCP = require('./gcp/getGCPdata').default
const { app, ipcMain, BrowserWindow } = require('electron');
// console.log('Entering GCP...');
// const container = require('@google-cloud/container');

const GOOGLE_APPLICATION_CREDENTIALS:object = {}
 
 async function getLocal() {
    const res = await fetchLocal();
    //console.log(res)
    return res
 }
 async function getGcp(GOOGLE_APPLICATION_CREDENTIALS) {
    const res = await fetchGCP(GOOGLE_APPLICATION_CREDENTIALS);
    //console.log(res)
    return res;
 }
 //getLocal();
 //getGcp(GOOGLE_APPLICATION_CREDENTIALS);
 
 ipcMain.on('asynchronous-message', (event: any, arg: any) => {
     console.log(arg) // prints "ping"
     getGcp(GOOGLE_APPLICATION_CREDENTIALS).then(res=>{
        event.sender.send('cluster-client', res)
     })
     getLocal().then(res=>{
      event.sender.send('cluster-client', res)   
     })
     // arg should be the users credentials in the future
     //event.sender.send('cluster-client',[gcpData, locals]);
 })

// Even listeners

// start up the main process
app.on('ready', () => {
  // This creates a window on startup
  const window = new BrowserWindow({ width: 800,
    height: 600 ,
    webPreferences: {
      nodeIntegration: true // allow node integration on BrowserWindow
    },
  });

  // This loads the html page we bundled with webpack to display
  window.loadURL(`file://${__dirname}/index.html`);
});
