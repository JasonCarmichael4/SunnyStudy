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

const WORK_DURATION = 2 * 60 * 1000;
const BREAK_DURATION = 5 * 60 * 1000;

// listening to messages 
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "startTimer") {
    startTimer("work", message.duration);
    sendResponse({ status: "work started" });
  }

  if (message.action === "breakTimer") {
    startTimer("break", message.duration);
    sendResponse({ status: "break started" });
  }

  if (message.action === "stopTimer") {
    chrome.alarms.clear("pomodoroTimer");
    chrome.storage.local.remove(["timerEnd", "duration", "mode"]);
    sendResponse({ status: "stopped" });
  }
  return true;
});

function startTimer(mode: string, duration: number): void {
  chrome.alarms.clear("pomodoroTimer", () => {
    const when = Date.now() + duration;
    chrome.alarms.create("pomodoroTimer", { when });
    chrome.storage.local.set({ timerEnd: when, duration, mode });
  });
}

// responding to alarm events 
chrome.alarms.onAlarm.addListener(alarm => {
  if (alarm.name === "pomodoroTimer") {
    chrome.storage.local.get(["mode"], data => {
      if (data.mode === "work") {
        startTimer("break", BREAK_DURATION); // start the break

        chrome.notifications.create({
          type: "basic",
          iconUrl: "https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png",
          title: "Break Time!",
          message: `${WORK_DURATION / 60000} minutes done. Take a ${BREAK_DURATION / 60000}-minute break.`
        });

      } else if (data.mode === "break") {
        startTimer("work", WORK_DURATION); // start the work session

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