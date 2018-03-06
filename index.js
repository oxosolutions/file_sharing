const electron = require('electron');
var dialog = require('electron').dialog;
const path = require('path')
const url = require('url')
const ElectApp = electron.app;
const BrowserWindow = electron.BrowserWindow


function createWindow () {

  mainWindow = new BrowserWindow({width: 800, height: 600, frame: true});
  mainWindow.setMenu(null);
  mainWindow.maximize();


  mainWindow.loadURL(url.format({
      pathname: path.join(__dirname, 'design/app-file-manager.html'),
      protocol: 'file:',
      slashes: true
    }));
  mainWindow.on('closed', function () {
    mainWindow = null
  })
}

ElectApp.on('ready', createWindow)
ElectApp.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        ElectApp.quit()
    }
})