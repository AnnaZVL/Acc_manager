/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare global {
  interface Window {
    // Add any global window properties here
  }
  
  // DOM types
  interface HTMLInputElement extends HTMLElement {
    value: string;
    maxLength?: number;
    required?: boolean;
  }
  
  interface HTMLSelectElement extends HTMLElement {
    value: string;
  }
}
