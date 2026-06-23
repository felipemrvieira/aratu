import { contextBridge, ipcRenderer } from 'electron'

import {
  IPC_CHANNELS,
  type AratuDesktopApi,
  type EngineInfo,
  type EngineStatus
} from '../shared/desktop-api'

const desktopApi: AratuDesktopApi = {
  engine: {
    getStatus: (): Promise<EngineStatus> => ipcRenderer.invoke(IPC_CHANNELS.engineGetStatus),
    getInfo: (): Promise<EngineInfo> => ipcRenderer.invoke(IPC_CHANNELS.engineGetInfo)
  }
}

contextBridge.exposeInMainWorld('aratu', desktopApi)
