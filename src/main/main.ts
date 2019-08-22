const { app, BrowserWindow } = require('electron');

console.log(__dirname);
app.on('ready', () => {
  // This creates a window on startup
  const window = new BrowserWindow({ width: 800, height: 600 });

  // This hides the default menu that comes with the browser window
  // window.setMenuBarVisibility(false);

  // This loads a website to display
  // console.log(__dirname);
  window.loadURL(`file://${__dirname}/index.html`);
});
