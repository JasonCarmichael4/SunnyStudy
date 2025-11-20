import React, { useLayoutEffect, useState } from "react";

export default function Timer() {
    const [remaining, setRemaining] = useState<number | null>(null);
    const [isBreak, setIsBreak] = useState<boolean | null>(null);

    useLayoutEffect(() => {
    const interval = setInterval(async () => {
        const { timerEnd } = await chrome.storage.local.get("timerEnd");
        const { mode } = await chrome.storage.local.get("mode");
        if (timerEnd) {
            const diff = timerEnd - Date.now();
            setRemaining(diff > 0 ? diff : 0);
        } else {
            setRemaining(null);
        }
        if (mode) {
            setIsBreak(mode === "break");
        } else {
            setIsBreak(null);
        }
    }, 1000);

    return () => clearInterval(interval);
    }, []);

    const startSession = () => {
        chrome.runtime.sendMessage({ action: "startTimer", duration: 25 * 60 * 1000 });
    };
    const stopSession = () => chrome.runtime.sendMessage({ action: "stopTimer" });

    const formatTime = (ms: number) => {
        const totalSec = Math.floor(ms / 1000);
        const min = Math.floor(totalSec / 60);
        const sec = totalSec % 60;
        return `${min}:${sec.toString().padStart(2, "0")}`;
    };

    return (
    <div>
        <h3>Pomodoro Timer</h3>
        <p>{remaining !== null ? formatTime(remaining) : "No active session"}</p>
        <br/>
        <p>{isBreak !== null ? (isBreak ? "Break Time" : "Work Time") : ""}</p>
        <button onClick={startSession}>Start</button>
        <button onClick={stopSession}>Stop</button>
    </div>
    );
}