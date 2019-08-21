"use strict";
const { app, BrowserWindow } = require('electron');
app.on('ready', () => {
    // This creates a window on startup
    const window = new BrowserWindow({ width: 800, height: 600 });
    // This hides the default menu that comes with the browser window
    window.setMenuBarVisibility(false);
    // This loads a website to display
    window.loadURL(`file://${__dirname}/../website/index.html`);
});
