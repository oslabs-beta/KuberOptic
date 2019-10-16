const fetchLocal = require('./local/local').default
const [fetchGCP, create] = require('./gcp/getGCPdata').default;
const fetchAws = require('./aws/getAWSData').default
const { app, ipcMain, BrowserWindow } = require('electron');
// const electron = require('electron')
// require('events').EventEmitter.defaultMaxListeners = 15;

let dat = new Date()
 async function getLocal() {
    const res = await fetchLocal();
    console.log('getting fetch Local at -------' , '    ', dat.getTime())
    return res
 }

 async function getGcp(GOOGLE_APPLICATION_CREDENTIALS) {
    const res = await fetchGCP(GOOGLE_APPLICATION_CREDENTIALS);
    let dat = new Date()
    console.log('fetchGetgcp -------' , '    ', dat.getTime())
    return res;
 }

 ipcMain.on('asynchronous-message', (event: any, arg: any) => {
    getLocal().then(res=>{
       event.sender.send('clusterClient', res)      
    }).catch((e)=>console.log(e))
    getGcp(arg).then(res=>{
       event.sender.send('clusterClient', res)
      })
     .catch((e)=>console.log(e))
  })
  //
  ipcMain.on('asynchronous-message2', (event: any, arg: any) => {
   fetchAws(arg).then(res=>{
      event.sender.send('clusterClient2', res)
      console.log('res in aws: ', res)
     })
    .catch((e)=>console.log(e))
 })
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
