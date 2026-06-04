/// <reference types="vite/client" />

declare global {
  interface CacheStorage {
    readonly default: Cache;
  }
}
export {};
