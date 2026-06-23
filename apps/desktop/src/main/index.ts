import { join } from 'node:path'

import { app, BrowserWindow, ipcMain, session, type IpcMainInvokeEvent } from 'electron'

import { IPC_CHANNELS } from '../shared/desktop-api'
import type { EngineClient } from './engine/engine-client'
import { MockEngineClient } from './engine/mock-engine-client'

let mainWindow: BrowserWindow | null = null
const engineClient: EngineClient = new MockEngineClient()

function assertTrustedIpcSender(event: IpcMainInvokeEvent): void {
  const trustedWebContents = mainWindow?.webContents

  if (
    !trustedWebContents ||
    event.sender !== trustedWebContents ||
    event.senderFrame !== trustedWebContents.mainFrame
  ) {
    throw new Error('Rejected IPC request from an untrusted sender')
  }
}

function registerEngineIpcHandlers(): void {
  ipcMain.handle(IPC_CHANNELS.engineGetStatus, (event) => {
    assertTrustedIpcSender(event)
    return engineClient.getStatus()
  })
  ipcMain.handle(IPC_CHANNELS.engineGetInfo, (event) => {
    assertTrustedIpcSender(event)
    return engineClient.getInfo()
  })
}

function configureSessionSecurity(): void {
  const connectSources = app.isPackaged
    ? "connect-src 'self'"
    : "connect-src 'self' ws://localhost:* http://localhost:*"
  const scriptSources = app.isPackaged ? "script-src 'self'" : "script-src 'self' 'unsafe-inline'"

  const policy = [
    "default-src 'self'",
    scriptSources,
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data:",
    "font-src 'self' data:",
    connectSources,
    "object-src 'none'",
    "base-uri 'none'",
    "frame-ancestors 'none'",
    "form-action 'none'"
  ].join('; ')

  session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
    callback({
      responseHeaders: {
        ...details.responseHeaders,
        'Content-Security-Policy': [policy]
      }
    })
  })

  session.defaultSession.setPermissionRequestHandler((_webContents, _permission, callback) => {
    callback(false)
  })
}

function createMainWindow(): BrowserWindow {
  const window = new BrowserWindow({
    width: 1440,
    height: 920,
    minWidth: 1040,
    minHeight: 700,
    show: false,
    backgroundColor: '#09090b',
    title: 'Aratu',
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true,
      webSecurity: true
    }
  })

  window.once('ready-to-show', () => window.show())
  window.webContents.setWindowOpenHandler(() => ({ action: 'deny' }))
  window.webContents.on('will-attach-webview', (event) => event.preventDefault())
  window.webContents.on('will-navigate', (event, url) => {
    const currentUrl = window.webContents.getURL()

    if (currentUrl && new URL(url).origin !== new URL(currentUrl).origin) {
      event.preventDefault()
    }
  })

  if (process.env.ELECTRON_RENDERER_URL) {
    void window.loadURL(process.env.ELECTRON_RENDERER_URL)
  } else {
    void window.loadFile(join(__dirname, '../renderer/index.html'))
  }

  window.on('closed', () => {
    mainWindow = null
  })

  return window
}

app.whenReady().then(() => {
  configureSessionSecurity()
  registerEngineIpcHandlers()
  mainWindow = createMainWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      mainWindow = createMainWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
