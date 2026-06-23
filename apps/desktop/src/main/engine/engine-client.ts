import type { EngineInfo, EngineStatus } from '../../shared/desktop-api'

export interface EngineClient {
  getStatus(): Promise<EngineStatus>
  getInfo(): Promise<EngineInfo>
}
