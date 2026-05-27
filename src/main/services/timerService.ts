import { getMainWindow, createBreakWindow } from '../windows';
import store, { recordPause } from './store'; 

class TimerService {
  private timeLeft: number = 20 * 60;
  private isPaused: boolean = false;
  private interval: NodeJS.Timeout | null = null; 

  init() {
    this.resetTimer();
    this.startInterval();
  }

  private startInterval() {
    if (this.interval) clearInterval(this.interval);

    this.interval = setInterval(() => {
      const win = getMainWindow();

      // SAFETY CHECK: Fixes "Object has been destroyed"
      if (!win || win.isDestroyed()) return; 

      if (this.isPaused) return;

      if (this.timeLeft > 0) {
        this.timeLeft--;
        if (!win.webContents.isDestroyed()) {
          win.webContents.send('timer:tick', this.timeLeft);
        }
      } else {
        this.onTimerEnd();
      }
    }, 1000);
  }

  private onTimerEnd() {
    createBreakWindow();
    this.resetTimer();
  }

  public forceBreak() {
    console.log("[Timer] Force triggering break.");
    this.onTimerEnd();
  }

  public resetTimer() {
    const settings = store.get('settings');
    const minutes = settings?.interval || 20;
    this.timeLeft = minutes * 60;
    
    getMainWindow()?.webContents.send('timer:tick', this.timeLeft);
  }

  /**
   * Toggles the current pause state and returns the new state.
   * If it becomes paused, it records a performance penalty.
   */
  public togglePause() {
    this.isPaused = !this.isPaused;
    
    if (this.isPaused) {
      recordPause(); // Call the professional helper from store.ts
    }
    
    return this.isPaused;
  }

  /**
   * FIX: Added missing setPause method for external triggers (like Tray)
   */
  public setPause(state: boolean) {
    this.isPaused = state;
    if (this.isPaused) {
      recordPause();
    }
    console.log(`[Timer] System Pause set to: ${this.isPaused}`);
  }

  public getTimeLeft() {
    return this.timeLeft;
  }
}

export const timerService = new TimerService();