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
    // Clear existing interval if it exists to prevent multiple timers
    if (this.interval) clearInterval(this.interval);

    this.interval = setInterval(() => {
      if (this.isPaused) return;

      if (this.timeLeft > 0) {
        this.timeLeft--;
        // Update the UI
        getMainWindow()?.webContents.send('timer:tick', this.timeLeft);
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
    return this.isPaused;
  }

  // Helper to get current time (if needed for debugging)
  public getTimeLeft() {
    return this.timeLeft;
  }
}

export const timerService = new TimerService();