import React, { useLayoutEffect, useState } from "react";
import Sunflower from "./SunflowerAnim";

export default function Timer() {
    const [remaining, setRemaining] = useState<number | null>(null);
    const [totalDuration, setTotalDuration] = useState<number>(25 * 60 * 1000);
    const [isBreak, setIsBreak] = useState<boolean | null>(null);

    useLayoutEffect(() => {
        const interval = setInterval(async () => {
            const { timerEnd, duration } = await chrome.storage.local.get(["timerEnd", "duration"]);
            const { mode } = await chrome.storage.local.get("mode");

            if (timerEnd) {
                const diff = timerEnd - Date.now();
                setRemaining(diff > 0 ? diff : 0);
                if (duration) setTotalDuration(duration);
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

    const progress =
        ( remaining !== null && totalDuration > 0 ) // safety
        ? Math.min(1, Math.max(0, (totalDuration - remaining) / totalDuration)) // time / total
        : 0;

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
    <div style={{ textAlign: "center", padding: "10px" }}>
        <h3>Pomodoro Timer</h3>
        
        {/* The Sunflower visualization */}
        <div style={{ height: '200px', width: '200px', margin: '20px 0' }}>
            <Sunflower progress={progress} isBreak={isBreak} />
        </div>

        <h2>{remaining !== null ? formatTime(remaining) : "00:00"}</h2>

        <br/>
        <p>{isBreak !== null ? (isBreak ? "Break Time" : "Work Time") : ""}</p>
        <button onClick={startSession}>Start</button>
        <button onClick={stopSession}>Stop</button>
    </div>
    );
}