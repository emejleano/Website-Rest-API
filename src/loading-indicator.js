// src/loading-indicator.js
class LoadingIndicator extends HTMLElement {
    constructor() {
      super();
      const shadow = this.attachShadow({ mode: 'open' });
  
      // Style untuk indikator loading
      const style = document.createElement('style');
      style.textContent = `
        .loading {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
          color: #fff;
          font-size: 1.5em;
          z-index: 9999;
        }
      `;
  
      // HTML untuk indikator loading
      const container = document.createElement('div');
      container.classList.add('loading');
      container.textContent = 'Loading...';
  
      shadow.appendChild(style);
      shadow.appendChild(container);
    }
  }
  
  // Mendefinisikan custom element
  customElements.define('loading-indicator', LoadingIndicator);
  