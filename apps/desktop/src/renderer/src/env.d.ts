/// <reference types="vite/client" />

import type { AratuDesktopApi } from '../../shared/desktop-api'

declare global {
  interface Window {
    aratu: AratuDesktopApi
  }
}

export {}
