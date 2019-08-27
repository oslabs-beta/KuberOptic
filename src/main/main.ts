const { app, ipcMain, BrowserWindow } = require('electron');
// console.log('Entering GCP...');
const container = require('@google-cloud/container');

const client = require('./gcp/gcp');

ipcMain.on('asynchronous-message', (event: any, arg: any) => {
    console.log(arg) // prints "ping"
    // arg should be the users credentials in the future
    //console.log(client);
    event.sender.send('cluster-client',client);
})

app.on('ready', () => {
  // This creates a window on startup
  const window = new BrowserWindow({ width: 800, height: 600 ,
  webPreferences: {
      nodeIntegration: true // allow node integration on BrowserWindow
    }
  });

  // This hides the default menu that comes with the browser window
  // window.setMenuBarVisibility(false);
  // ipcMain.send('cluster-client', client);
  // create channel for communication to front END

  // This loads a website to display
  // console.log(__dirname);
  window.loadURL(`file://${__dirname}/index.html`);
});
