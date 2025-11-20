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

// Timer functionality
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "startTimer") {
    startTimer("work", 25 * 60 * 1000);
    sendResponse({ status: "work started" });
    return true;
  }

  if (message.action === "breakTimer") {
    startTimer("break", 5 * 60 * 1000);
    sendResponse({ status: "break started" });
    return true;
  }

  if (message.action === "stopTimer") {
    chrome.alarms.clear("pomodoroTimer");
    chrome.storage.local.remove(["timerEnd", "mode"]);
    sendResponse({ status: "stopped" });
    return true;
  }
});

function startTimer(mode: string, duration: number): void {
  const when = Date.now() + duration;

  chrome.alarms.create("pomodoroTimer", { when });
  chrome.storage.local.set({timerEnd: when, mode });
}


chrome.alarms.onAlarm.addListener(alarm => {
  if (alarm.name === "pomodoroTimer") {
    chrome.storage.local.get(["mode"], data => {
      if (data.mode === "work") {
        startTimer("break", 5 * 60 * 1000); // start the break

        chrome.notifications.create({
          type: "basic",
          iconUrl: "https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png",
          title: "Break Time!",
          message: "25 minutes done. Take a 5-minute break."
        });

      } else if (data.mode === "break") {
        startTimer("work", 25 * 60 * 1000); // start the work session

        chrome.notifications.create({
          type: "basic",
          iconUrl: "https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png",
          title: "Back to Work!",
          message: "Break finished. Starting next Pomodoro."
        });
      }
    });
  }
  return;
});