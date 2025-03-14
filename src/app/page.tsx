"use client";

import { useState } from "react";
import styles from "./page.module.css";
import { Button, ThemeProvider } from "@tritonse/tse-constellation";

export default function Home() {
  const [timerValue, setTimerValue] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [timerTimeout, setTimerTimeout] = useState<null | NodeJS.Timeout>(null);

  const formatTimeSection = (section: number) => {
    if (section < 10) {
      return `0${section}`;
    }
    return `${section}`;
  };

  const formatCurrentTime = () => {
    const hours = Math.floor(timerValue / 3600);
    const minutes = Math.floor((timerValue % 3600) / 60);
    const seconds = timerValue % 60;
    return `${formatTimeSection(hours)}:${formatTimeSection(minutes)}:${formatTimeSection(seconds)}`;
  };

  const handleStartPauseClicked = () => {
    if (isTimerRunning) {
      // Timer is running, stop the timer
      setIsTimerRunning(false);
      if (timerTimeout !== null) {
        clearInterval(timerTimeout);
      }
    } else {
      // Timer is not running, start the timer
      setIsTimerRunning(true);
      setTimerTimeout(
        setInterval(() => {
          // every 1 second, increase value of timer by 1 second
          setTimerValue((prevValue) => prevValue + 1);
        }, 1000)
      );
    }
  };

  const handleClearClicked = () => {
    // stop the timer running
    setIsTimerRunning(false);
    if (timerTimeout !== null) {
      clearInterval(timerTimeout);
    }

    // reset timer value to 0
    setTimerValue(0);
  };

  return (
    <ThemeProvider>
      <div className={styles.page}>
        <h1 className={styles.title}>TSE Stopwatch</h1>
        <div className={styles.whiteContainer}>
          <div className={styles.blueContainer}>
            <p className={styles.timerText}>{formatCurrentTime()}</p>
          </div>

          <div className={styles.buttonsRow}>
            <Button onClick={handleStartPauseClicked}>
              {isTimerRunning ? "Pause" : "Start"}
            </Button>
            <Button onClick={handleClearClicked} destructive>
              Clear
            </Button>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}
