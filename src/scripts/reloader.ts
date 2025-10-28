/**
 * @fileoverview Reloads chrome extension when dist is rebuilt
 */

// Vite adds meta.hot atribute when bundling so compiler doesn't know what it is. 
// This only happens here so instead of making a types file with an interface I bypassed type checking
// Should make a types file if this happens elsewhere but it shouldn't as everything meta to the project should be done
if ((import.meta as any).hot) {  
  (import.meta as any).hot.on("crx:runtime-reload", () => {
    console.log("Dist rebuild detected -> reloading extension");
    chrome.runtime.reload();
  });
}

