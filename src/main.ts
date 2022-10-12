import { createApp } from 'vue'
import App from './App.vue'
import {store} from './store'

import "./main.css";
/**
 * If you enables use of Node.js API in the Renderer-process
 * ```
 * npm i -D vite-plugin-electron-renderer
 * ```
 * @see - https://github.com/electron-vite/vite-plugin-electron/tree/main/packages/electron-renderer#electron-renderervite-serve
 */
// import './samples/node-api'

import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-light.css';


const app = createApp(App);
  app.directive('highlight', function(el) {
    const blocks = el.querySelectorAll('pre code');
    blocks.forEach((block : any) => {
      hljs.highlightBlock(block)
    })
  });
  app.use(store);
  app.mount('#app').$nextTick(() => {
    postMessage({ payload: 'removeLoading' }, '*')
  })
