/// <reference types="vite/client" />
export {}; // This ensures the file is treated as a module
declare global {
  interface Window {
    GlslCanvas: any;
  }
}
