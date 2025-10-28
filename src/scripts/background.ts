import "./reloader";

chrome.runtime.onInstalled.addListener(() => {
  chrome.sidePanel.setOptions({ enabled: true, path: "src/sidePanel/index.html" });
});

chrome.runtime.onStartup?.addListener(() => {
  chrome.sidePanel.setOptions({ enabled: true, path: "src/sidePanel/index.html" });
});

chrome.tabs.onActivated.addListener(async ({ tabId }) => {
  try { await chrome.sidePanel.setOptions({ tabId, enabled: true }); } catch {}
});
chrome.tabs.onUpdated.addListener(async (tabId, info) => {
  if (info.status === "complete") {
    try { await chrome.sidePanel.setOptions({ tabId, enabled: true }); } catch {}
  }
});
