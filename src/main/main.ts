const { app, ipcMain, BrowserWindow } = require('electron');
// console.log('Entering GCP...');
// const container = require('@google-cloud/container');

const client = require('./gcp/gcp');

// Even listeners
ipcMain.on('asynchronous-message', (event: any, arg: any) => {
    console.log(arg) // prints "ping"
    // arg should be the users credentials in the future
    event.sender.send('cluster-client',client);
})

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
