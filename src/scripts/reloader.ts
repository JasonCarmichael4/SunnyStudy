/**
 * @fileoverview Reloads chrome extension when dist is rebuilt
 */


if ((import.meta as any).hot) {
  (import.meta as any).hot.on("crx:runtime-reload", () => {
    console.log("Dist rebuild detected -> reloading extension");
    chrome.runtime.reload();
  });
}

