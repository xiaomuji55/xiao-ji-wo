const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('node:path');

app.commandLine.appendSwitch("disable-site-isolation-trials");

const createWindow = () => {
  const win = new BrowserWindow({
    width: 1366,
    height: 768,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      webSecurity: false, //是否禁用同源策略
      // nodeIntegration: true, // 启用 Node Integration
      // enableRemoteModule: true, // 启用远程模块
      // nodeIntegrationInSubFrames: true, // 启用 Node Integration in <iframe>
    },
  });
  win.loadFile('index.html');
};

app.whenReady().then(() => {
  ipcMain.handle('ping', () => 'pong');
  createWindow();

  app.on('activate', () => {
    if(BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  })
});

app.on('window-all-closed', () => {
  if(process.platform !== 'darwin') {
    app.quit();
  }
})

