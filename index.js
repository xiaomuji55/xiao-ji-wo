const {app, BrowserWindow, ipcMain} = require('electron');
const path = require('node:path');

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      webSecurity: false, //是否禁用同源策略
      webviewTag: true, // 启用 webview 标签
      nodeIntegration: true, // 启用 Node Integration
      contextIsolation: false, // 禁用上下文隔离
      enableRemoteModule: true, // 启用远程模块
      nodeIntegrationInSubFrames: true, // 启用 Node Integration in <iframe>
    },
  });
  win.loadFile('index.html');
};

app.commandLine.appendSwitch("disable-site-isolation-trials");

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

