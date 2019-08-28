const fetchLocal = require('./local/local').default
const fetchGCP = require('./gcp/getGCPdata').default
const { app, ipcMain, BrowserWindow } = require('electron');
// console.log('Entering GCP...');
// const container = require('@google-cloud/container');

const GOOGLE_APPLICATION_CREDENTIALS:object = {
   "type": "service_account",
   "project_id": "kubernati",
   "private_key_id": "d514feb8929365b6adaf6d6714676885522a062c",
   "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCzA/Sb7Q//xCRz\nobJl2RyRQXwC5cRR8FDa8tudQOCGE8u5vikGBT28aNcTNpFSc2TaZMhxM47RxNkx\nyd9xUvnJf4XlxkYFyU1Wuimgu7IYk/bp0dioqGZ18CoKUC3hls9vKAJ4QjPAElyA\nxmY3hsxfsIoz74zFYScKUm1bLEo4AA9WgbihB3GE1Xk6o2HaW9ykDhQZ+UEsOZj3\na4RaaHerZ9hVyv735Ydxv4O8Uw7kfS0dr9AzWe4pLi6LXIrW1nrYSBXe2L7FwJbe\nOO+bmbUsyKS2fNIe9y+Cv/KRyzL/kKShvMmzPUQIhat0NETSZXCOUXJWMn4boTz9\nKr/85euhAgMBAAECggEAAM0ESrAI37nbuKN1HAroi38PsCbhXeU5hGA8oqeGFZ14\nLmmbDwCGIB4XM7odVHFJFsfHhIegtIApIVWUDQKMNOY/1elBGhCmapxYuDQMwfrD\n+pPucGM3+aA4XO1SxjkFrqtu9uUjbIEchjQ1A/uztXwhgyXXwzCKA1we6n7wSk+2\nVMCLr5ZaoMudpQ8c1ddqaDL/aPegNAImZnh/THgab/ARd6Zb5u8UDFvUlnavabqX\nTBi6k6QfcXWx11FrHMnRN29onDU9xJJSM/JbZVBTNxkxyxiWgCH8TNhZsZeZn/+4\nvAhH9iXvIglN6jw/oqb87OvTw/YdggVBmZEsvtSPgQKBgQDuA8va4p1mOtzjAteE\nLNihO6SI4yAdQ+QLs2TKh73bW+q1oGG56f+9RAxBaLiFv78LsfkWRcpr7NbpLnJW\nzwcq6vDR1Ke2VjAU6cDwNglm0t2FHr+CjfAgedrCHtzvTCIJfX5tt6xj7kVlpF4v\njHrUxIw12X9Ce7ruXik/zk0QwQKBgQDAit02atQp1AuFa7A8PNHDaV5exKas7mkr\nJeHtUG7FiBNm88aLJIH99+NwWO6FgfL9E0iOfhzjI5u3FML4v3QQBT5XT67YB5Si\nPxJbeawA7MwqhsMQ1WtQA8w3Nic2WnLuhmfy8Ah4qKGQRM5kYXofAWCo4553sxjK\nb9Vn8oSy4QKBgQC9xT8bRUXUBaiqQ1DMbOlIHILCNb0cOE4x2hXJuVLx/CZ2K+rf\nTaf/IqtW14UP9uL/EyaT0I9lX4+2mbbGagi/+lSKKLCTm8J4WivgGmWCmyvOAMcW\n8856Rk3aKrti/GPDB1Dvb9u+TXL9aIFEDhC9ZfyYztI9kuNnPKJM4lLlwQKBgC8e\nTIBSqFUMJT2jWt+C6rptgMCkUz2iom4CuUVAF7uTT1w0b/QBHSavkSMfQE+/u10f\naPQl/J/BSQwGsqf5AkghYF4xi9ImGMOTt8RXBDa9vEDz9aya7cYJB+LDB9mPTOz+\nS1XyU8BjVBZgIDoEeMQ5rBPokBEu7PQtZgYoHT1BAoGAae7BgjuPPr8gD0/S8J8F\nv9rAsNdKA+LWUnKkNx36CZbsTMNM48nFRkfSVd/PVWgauTUaD9xbn5bbEWT2qvjl\nkraIvC4XLpvksSkS23CQIxwNoZJAW915YsLux6l3PxKJgNodrtKLA6ahEh4GGJK0\ngDrUQIG1gMiZpaEV1QU12XE=\n-----END PRIVATE KEY-----\n",
   "client_email": "458439475138-compute@developer.gserviceaccount.com",
   "client_id": "105214681011184349548",
   "auth_uri": "https://accounts.google.com/o/oauth2/auth",
   "token_uri": "https://oauth2.googleapis.com/token",
   "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
   "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/458439475138-compute%40developer.gserviceaccount.com"
 }
 
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
