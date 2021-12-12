require("dotenv").config();
const { app, BrowserWindow } = require("electron");

const isMac = process.platform === "darwin" ? true : false;
var isDev = process.env.NODE_ENV !== "production" ? true : false;
if (app.isPackaged) {
  isDev = false;
}

let mainWindow;

function createMainWindow() {
  mainWindow = new BrowserWindow({
    title: "EStarter",
    width: isDev ? 1920 : 1920,
    height: 1080,
    icon: "`${__dirname}/assets/icons/icon.png`",
    backgroundColor: "white",
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  if (isDev) {
    mainWindow.webContents.openDevTools();
  }
  mainWindow.loadFile("./app/index.html");
}

app.on("ready", () => {
  createMainWindow();
});

app.on("window-all-closed", function () {
  if (!isMac) app.quit();
});

app.whenReady().then(() => {
  app.on("activate", function () {
    if (BrowserWindow.getAllWindows().length === 0) createMainWindow();
  });
});
