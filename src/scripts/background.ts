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

type PomodoroSession = {
  id: string;
  startTime: number;
  endTime: number;
};

// listening to messages 
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "startTimer") {
    // start session if not already started
    chrome.storage.local.get(
    ["sessions", "timerStart"],
    data => {
      console.log("Received message to start timer:", message);
      if (!data.timerStart) {
        chrome.storage.local.set({timerStart: Date.now()}); //save the current time for end session calculation
        startTimer(message.mode, message.duration);
        sendResponse({ status: "started" });
      }
      else {
        sendResponse({ status: "already running" });
      }
    });
  }

  if (message.action === "stopTimer") {
    stopTimer();
    sendResponse({ status: "stopped" });
  }
  return true;
});

function startTimer(mode: string, duration: number): void {
  chrome.alarms.clear("pomodoroTimer", () => { // clear any existing alarms
    const when = Date.now() + duration;
    chrome.alarms.create("pomodoroTimer", { when });
    chrome.storage.local.set({timerEnd: when, duration, mode }); // create the variables in storage
  });
}

function stopTimer(): void {
  chrome.storage.local.get(
    ["timerStart"],
    data => {
    if (!data.timerStart) {
      saveSession({
        id: crypto.randomUUID(),
        startTime: data.timerStart,
        endTime: Date.now()
      }); //current session
    }
  });

  //removes all timer related data
  chrome.alarms.clear("pomodoroTimer");
  chrome.storage.local.remove(["timerEnd", "duration", "mode"]);
  chrome.storage.local.remove("timerStart");
}

// save session to storage
function saveSession(session: PomodoroSession): void {
  chrome.storage.local.get(["sessions"], data => {
    const sessions: PomodoroSession[] = data.sessions || [];  
    sessions.push(session);
    chrome.storage.local.set({ sessions });
    console.log("All sessions:", session);
    console.log("All sessions:", data.sessions);
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
          message: "Break finished. Time to get back to work!"
        });
      }
    });
  }
  return;
});