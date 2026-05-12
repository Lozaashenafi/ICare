import { getMainWindow, createBreakWindow } from '../windows';
import store from './store';

class TimerService {
  private timeLeft: number = 20 * 60;
  private isPaused: boolean = false;
  private interval: NodeJS.Timeout | null = null;

  init() {
    this.resetTimer();
    this.startInterval();
  }

  private startInterval() {
    this.interval = setInterval(() => {
      if (this.isPaused) return;

      if (this.timeLeft > 0) {
        this.timeLeft--;
        getMainWindow()?.webContents.send('timer:tick', this.timeLeft);
      } else {
        this.onTimerEnd();
      }
    }, 1000);
  }

  private onTimerEnd() {
    // 1. Show the Roast Popup
    createBreakWindow();
    // 2. Reset clock for next cycle
    this.resetTimer();
  }

  resetTimer() {
    const minutes = store.get('settings.interval') || 20;
    this.timeLeft = minutes * 60;
  }

  togglePause(manualState?: boolean) {
    this.isPaused = manualState !== undefined ? manualState : !this.isPaused;
    return this.isPaused;
  }
}

export const timerService = new TimerService();