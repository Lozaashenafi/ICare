import { BrowserWindow, screen } from 'electron';
import { join } from 'path';
import store from './services/store';

let mainWindow: BrowserWindow | null = null;
let breakWindow: BrowserWindow | null = null;

export const createMainWindow = () => {
  mainWindow = new BrowserWindow({
    width: 1100,
    height: 850,
    show: false,
    autoHideMenuBar: true,
    titleBarStyle: 'hiddenInset', // Mac style clean look
    webPreferences: {
    // 1. Path must be correct (pointing to the build folder)
    preload: join(__dirname, '../preload/index.js'), 
     sandbox: false,
  contextIsolation: true, // Senior standard
  nodeIntegration: false, // Senior standard
    }
  });

  // Load URL or File
  if (process.env.ELECTRON_RENDERER_URL) {
    mainWindow.loadURL(process.env.ELECTRON_RENDERER_URL);
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'));
  }

  mainWindow.on('ready-to-show', () => mainWindow?.show());
  return mainWindow;
};

/**
 * Creates the Break Overlay/Popup
 */
export const createBreakWindow = () => {
  const display = screen.getPrimaryDisplay();
  const { width, height } = display.bounds; // Total screen area
  const { width: workWidth } = display.workAreaSize; // Area excluding taskbars

  // 1. Fetch the user's Smart Eye preference from the store
  const settings = store.get('settings');
  const isSmartEye = settings?.smartEyeEnabled || false;

  // 2. Configure window based on Smart Eye status
  breakWindow = new BrowserWindow({
    // Logic: Full screen for Smart Eye, small box for standard mode
    width: isSmartEye ? width : 450,
    height: isSmartEye ? height : 550,
    x: isSmartEye ? 0 : workWidth - 470,
    y: isSmartEye ? 0 : 20,
    
    frame: false,
    transparent: true,
    alwaysOnTop: true,
    resizable: false,
    movable: false,
    hasShadow: false,
    skipTaskbar: true,
    
    // THE LOCKDOWN: Only enable Kiosk if Smart Eye is true
    kiosk: isSmartEye, 
    enableLargerThanScreen: isSmartEye,

    webPreferences: {
      preload: join(__dirname, '../preload/index.mjs'),
      sandbox: false,
      contextIsolation: true
    }
  });

  // 3. THE "SCREEN-SAVER" Z-INDEX
  // This ensures it sits above the Start Menu, Taskbar, and other apps
  breakWindow.setAlwaysOnTop(true, 'screen-saver');

  // 4. SMART EYE EXCLUSIVE LOGIC: Focus Thief
  if (isSmartEye) {
    // Prevent switching workspaces/desktops
    breakWindow.setVisibleOnAllWorkspaces(true, { visibleOnFullScreen: true });

    // Focus Thief: If user tries to click away, steal focus back instantly
    breakWindow.on('blur', () => {
      if (breakWindow && !breakWindow.isDestroyed()) {
        breakWindow.show();
        breakWindow.focus();
      }
    });
  }

  const url = process.env.ELECTRON_RENDERER_URL 
    ? `${process.env.ELECTRON_RENDERER_URL}#/break` 
    : `file://${join(__dirname, '../renderer/index.html')}#/break`;

  breakWindow.loadURL(url);

  // 5. SENIOR FAIL-SAFE: Automatic Force-Close
  // If the React app glitches, the window will kill itself after 25 seconds
  setTimeout(() => {
    if (breakWindow && !breakWindow.isDestroyed()) {
      console.log("[Fail-safe] Break window timed out and self-destructed.");
      breakWindow.close();
    }
  }, 25000); 

  return breakWindow;
};



export const getMainWindow = () => mainWindow;
export const getBreakWindow = () => breakWindow;

