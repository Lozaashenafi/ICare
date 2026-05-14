import { getMainWindow, createBreakWindow } from '../windows';
import store from './store';

class TimerService {
  // 1. Declare the interval property (Fixes "Property interval does not exist")
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
    if (this.isPaused) return;

    const win = getMainWindow();

    // CRITICAL FIX: Check if window exists and isn't destroyed
    if (!win || win.isDestroyed()) {
      return; 
    }

    if (this.timeLeft > 0) {
      this.timeLeft--;
      // Extra safety check for the web contents
      if (!win.webContents.isDestroyed()) {
        win.webContents.send('timer:tick', this.timeLeft);
      }
    } else {
      this.onTimerEnd();
    }
  }, 1000);
}
  private onTimerEnd() {
    // 1. Show the Roast Popup Window
    createBreakWindow();
    // 2. Reset clock for next cycle automatically
    this.resetTimer();
  }

  // This handles the "Take Break Now" button from React
  public forceBreak() {
    console.log("Savage Mode: Forcing break now.");
    this.onTimerEnd();
  }

  public resetTimer() {
    // Accessing settings inside the 'settings' object as per your Store schema
    const settings = store.get('settings');
    const minutes = settings?.interval || 20;
    this.timeLeft = minutes * 60;
    
    // Immediately tell the UI the new time
    getMainWindow()?.webContents.send('timer:tick', this.timeLeft);
  }

public togglePause(manualState?: boolean) {
  this.isPaused = manualState !== undefined ? manualState : !this.isPaused;
  
  // If we just paused, record it as a performance penalty
  if (this.isPaused) {
    const dateKey = new Date().toISOString().split('T')[0];
    const current = store.get(`stats.${dateKey}`) || { completed: 0, skipped: 0, pauses: 0, totalSeconds: 0 };
    current.pauses += 1;
    store.set(`stats.${dateKey}`, current);
  }
  
  return this.isPaused;
}
  // Helper to get current time (if needed for debugging)
  public getTimeLeft() {
    return this.timeLeft;
  }
}

export const timerService = new TimerService();