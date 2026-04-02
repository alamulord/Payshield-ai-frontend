// src/setupTests.ts
import '@testing-library/jest-dom';
import { TextEncoder, TextDecoder } from 'util';
// Polyfill for TextEncoder/TextDecoder
global.TextEncoder = TextEncoder;
// @ts-ignore
global.TextDecoder = TextDecoder;

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Mock ResizeObserver
class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

// @ts-ignore
window.ResizeObserver = ResizeObserver;

// Mock the global Response object
if (typeof Response === 'undefined') {
  // @ts-ignore
  globalThis.Response = class Response {
    constructor(public body: any, public init: ResponseInit = {}) {}
    get status() {
      return this.init.status || 200;
    }
    get statusText() {
      return this.init.statusText || 'OK';
    }
    get headers() {
      return new Headers(this.init.headers);
    }
    async json() {
      return JSON.parse(this.body);
    }
  };
}

