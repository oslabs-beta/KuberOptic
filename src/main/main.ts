// const fetchLocal = require('./local/local').default
// const fetchGCP = require('./gcp/getGCPdata').default
const { app, ipcMain, BrowserWindow } = require('electron');
// const electron = require('electron')

 
//  async function getLocal() {
//     const res = await fetchLocal();
//     //console.log(res)
//     return res
//  }

//  async function getGcp(GOOGLE_APPLICATION_CREDENTIALS, timeZone) {
//     const res = await fetchGCP(GOOGLE_APPLICATION_CREDENTIALS, timeZone);
//     //console.log(res)
//     return res;
//  }
 
 //getLocal();
 //getGcp(GOOGLE_APPLICATION_CREDENTIALS);
 
ipcMain.on('asynchronous-message', (event: any, arg: any) => {
    //  getGcp(arg[0], arg[1]).then(res=>{
    //  // console.log("insideGCP")  
    //   event.sender.send('cluster-gcp', res)
    //  })
    
    //  getLocal().then(res=>{
    //   event.sender.send('cluster-local', res)   
    //  })
     // arg should be the users credentials in the future
     console.log(arg);
     event.sender.send('clusterClient', 'yayYaaaaaay')
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
