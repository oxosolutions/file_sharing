const express = require('express');
var bodyParser = require('body-parser')
let multer  = require('multer');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, __dirname+'/uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
  }
});
let upload  = multer({storage: storage});
const app = express();
app.use(express.static("design"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(bodyParser.urlencoded({ extended: true }))


app.get('/', (req, res) => {
    res.sendFile(__dirname +'/design/app-file-manager.html');
});

app.get('/upload_files', (req,res)=>{
    res.sendFile(__dirname +'/design/forms-file-upload.html');
});

app.post('/upload', upload.single('file'), (req,res) => {
    res.send(true);
});

app.listen(3000, () => console.log('App listening on port 3000!'));

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


    mainWindow.loadURL('http://localhost:3000');
    /*mainWindow.loadURL(url.format({
      pathname: path.join(__dirname, 'design/app-file-manager.html'),
      protocol: 'file:',
      slashes: true
    }));*/
    mainWindow.on('closed', function () {
        mainWindow = null
    })
    mainWindow.webContents.openDevTools()

}

ElectApp.on('ready', createWindow)
ElectApp.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        ElectApp.quit()
    }
})