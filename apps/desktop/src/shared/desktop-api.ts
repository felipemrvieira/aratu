export const IPC_CHANNELS = {
  engineGetStatus: 'engine:get-status',
  engineGetInfo: 'engine:get-info'
} as const

export interface EngineStatus {
  status: 'ready' | 'degraded' | 'draining' | 'offline'
  mode: 'mock' | 'sidecar'
  protocolVersion: string
}

export interface EngineInfo {
  name: 'aratu-engine'
  engineVersion: string
  protocolVersion: string
  target: {
    os: string
    arch: string
  }
}

export interface AratuDesktopApi {
  engine: {
    getStatus: () => Promise<EngineStatus>
    getInfo: () => Promise<EngineInfo>
  }
}
