// const fetchLocal = require('./local/local').default
const [fetchGCP, create] = require('./gcp/getGCPdata').default;
const { app, ipcMain, BrowserWindow } = require('electron');
// const electron = require('electron')
const EventEmitter = require('events');

class MyEmitter extends EventEmitter {}

const myEmitter = new MyEmitter();
// increase the limit
myEmitter.setMaxListeners(29);

for(let i = 0; i < 29; i++) {
  myEmitter.on('event', _ => console.log(i));
}

myEmitter.emit('event');

//  async function getLocal() {
//     const res = await fetchLocal();
//     //console.log(res)
//     return res
//  }
 async function getGcp(GOOGLE_APPLICATION_CREDENTIALS) {
    const res = await fetchGCP(GOOGLE_APPLICATION_CREDENTIALS);
    let dat = new Date()
    console.log('dateGetgcp -------' , '    ', dat.getTime())
    return res;
 }
 //getLocal();
 //getGcp(GOOGLE_APPLICATION_CREDENTIALS);

 ipcMain.on('asynchronous-message', (event: any, arg: any) => {
    //  console.log('credentials sent from client: ', arg) // prints "ping"
     getGcp(arg).then(res=>{
      // let dat = new Date()
       event.sender.send('clusterClient', res)
      })
     .catch((e)=>console.log(e))
    //  getLocal().then(res=>{
    //    console.log(res)
    //   event.sender.send('clusterClient', res)
    //  })
     // arg should be the users credentials in the future
     // console.log(arg);
     // event.sender.send('clusterClient', 'yayYaaaaaay')
})

// Even listeners

// start up the main process

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
