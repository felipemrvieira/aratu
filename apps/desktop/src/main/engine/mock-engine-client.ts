import type { EngineInfo, EngineStatus } from '../../shared/desktop-api'
import type { EngineClient } from './engine-client'

export class MockEngineClient implements EngineClient {
  async getStatus(): Promise<EngineStatus> {
    return {
      status: 'ready',
      mode: 'mock',
      protocolVersion: '1'
    }
  }

  async getInfo(): Promise<EngineInfo> {
    return {
      name: 'aratu-engine',
      engineVersion: '0.1.0-dev',
      protocolVersion: '1',
      target: {
        os: process.platform,
        arch: process.arch
      }
    }
  }
}
