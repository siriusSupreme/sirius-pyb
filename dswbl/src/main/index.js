import {
  app,
  BrowserWindow,
  globalShortcut,
  ipcMain
} from 'electron'
/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if ( process.env.NODE_ENV !== 'development' ) {
  global.__static = require( 'path' ).join( __dirname, '/static' ).replace( /\\/g, '\\\\' )
}

const winURL = process.env.NODE_ENV === 'development' ?
  `http://localhost:9080` :
  `file://${__dirname}/index.html`

let loginWindow
let mainWindow
let takeDownQueryWindow
let templateManageWindow
let addTemplateWindow

global.commonData = {
  templateTableId: 0,
  isTemplateData: false
}

function createLoginWindow() {
  loginWindow = new BrowserWindow( {
    width: 620,
    height: 404,
    useContentSize: true,
    frame: false,
    titleBarStyle: 'customButtonsOnHover',
    resizable: false,
    title: '迪赛威笔录登陆',
    titleBarStyle: 'hidden'
  } )

  loginWindow.loadURL( winURL )

  globalShortcut.register( 'control + Y', () => {
    loginWindow.show()
  } )

  loginWindow.on( 'closed', () => {
    loginWindow = null
  } )
}

function createMainWindow() {
  mainWindow = new BrowserWindow( {
    width: 1040,
    height: 720,
    useContentSize: true,
    frame: false,
    titleBarStyle: 'customButtonsOnHover',
    resizable: false,
    title: '迪赛威笔录'
  } )

  mainWindow.loadURL( winURL + '#/main' )

  globalShortcut.register( 'control + Y', () => {
    mainWindow.show()
  } )

  mainWindow.on( 'closed', () => {
    mainWindow = null
  } )
}

function createTemplateManageWindow() {
  templateManageWindow = new BrowserWindow( {
    width: 1040,
    height: 720,
    useContentSize: true,
    frame: false,
    titleBarStyle: 'customButtonsOnHover',
    resizable: false,
    title: '模板管理'
  } )

  templateManageWindow.loadURL( winURL + '#/templateManage' )

  globalShortcut.register( 'control + Y', () => {
    templateManageWindow.show()
  } )

  templateManageWindow.on( 'closed', () => {
    templateManageWindow = null
  } )
}

function createAddTemplateWindow() {
  addTemplateWindow = new BrowserWindow( {
    parent: templateManageWindow,
    modal: true,
    width: 875,
    height: 560,
    useContentSize: true,
    frame: false,
    titleBarStyle: 'customButtonsOnHover',
    resizable: false,
    title: '笔录模板'
  } )

  addTemplateWindow.loadURL( winURL + '#/templateEditor' )

  globalShortcut.register( 'control + Y', () => {
    addTemplateWindow.show()
  } )

  addTemplateWindow.on( 'closed', () => {
    addTemplateWindow = null
  } )
}

function createTakeDownQueryTemplateWindow () {
  takeDownQueryWindow = new BrowserWindow( {
    width: 1200,
    height: 560,
    useContentSize: true,
    frame: false,
    titleBarStyle: 'customButtonsOnHover',
    resizable: false,
    title: '笔录查询'
  } )

  takeDownQueryWindow.loadURL( winURL + '#/take-down-query' )

  globalShortcut.register( 'control + Y', () => {
    takeDownQueryWindow.show()
  } )

  takeDownQueryWindow.on( 'closed', () => {
    takeDownQueryWindow = null
  } )
}

app.on( 'ready', createLoginWindow )

app.on( 'window-all-closed', () => {
  if ( process.platform !== 'darwin' ) {
    app.quit()
  }
} )

app.on( 'activate', () => {
  if ( loginWindow === null ) {
    createLoginWindow()
  }
} )

ipcMain.on( 'window-all-closed', () => {
  if ( process.platform !== 'darwin' ) {
    app.quit()
  }
} )

ipcMain.on( 'ready-main', () => {
  createMainWindow()
  loginWindow.close()
} )

ipcMain.on( 'ready-template-manage', () => {
  createTemplateManageWindow()
  mainWindow.close()
} )

ipcMain.on( 'take-down-query', () => {
  createTakeDownQueryTemplateWindow()
  mainWindow.close()
} )

ipcMain.on( 'main-minimize', () => {
  mainWindow.minimize()
} )

ipcMain.on( 'main-maximize', () => {
  if ( mainWindow.isMaximized() ) {
    mainWindow.unmaximize()
  } else {
    mainWindow.maximize()
  }
} )

ipcMain.on( 'template-manage-window-close', () => {
  templateManageWindow.close()
} )

ipcMain.on( 'back-main-window', () => {
  createMainWindow()
  templateManageWindow.close()
} )

ipcMain.on( 'take-down-query-back', () => {
  createMainWindow()
  takeDownQueryWindow.close()
} )

ipcMain.on( 'minimize-main-window', () => {
  templateManageWindow.minimize()
})

ipcMain.on('add-template', (event) => {
  global.commonData.templateTableId = 0
  global.commonData.isTemplateData = false
  createAddTemplateWindow()
})

ipcMain.on('modifi-template', (event, msg) => {
  global.commonData.templateTableId = msg
  global.commonData.isTemplateData = true
  createAddTemplateWindow()
})

ipcMain.on('close-template-add', (event) => {
  global.commonData.templateTableId = 0
  global.commonData.isTemplateData = false
  templateManageWindow.webContents.send('update-template-content')
  addTemplateWindow.close()
})

ipcMain.on('back-take-down-query-window', () => {
  createMainWindow()
  takeDownQueryWindow.close()
})

ipcMain.on('minimize-take-down-query-window', () => {
  takeDownQueryWindow.minimize()
})

ipcMain.on('maximize-take-down-query-window', () => {
  takeDownQueryWindow.maximize()
})

ipcMain.on('unmaximize-take-down-query-window', () => {
  takeDownQueryWindow.unmaximize()
})

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */
