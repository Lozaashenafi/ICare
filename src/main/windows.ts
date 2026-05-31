import { BrowserWindow, screen, nativeImage } from 'electron';
import { join } from 'path';
import store from './services/store';

let mainWindow: BrowserWindow | null = null;
let breakWindow: BrowserWindow | null = null;

const getIconPath = () => {
  return join(__dirname, '../../resources/icon.png');
};

export const createMainWindow = () => {
  const appIcon = nativeImage.createFromPath(getIconPath());

  mainWindow = new BrowserWindow({
    width: 1100,
    height: 850,
    title: "ICare", 
    show: true, 
    backgroundColor: '#ffffff',
    autoHideMenuBar: true,
    icon: appIcon,
    titleBarStyle: 'hiddenInset',
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'), 
      sandbox: false,
      contextIsolation: true,
      nodeIntegration: false,
    }
  });

  if (process.platform === 'linux') {
    mainWindow.setIcon(appIcon);
  }

  if (process.env.ELECTRON_RENDERER_URL) {
    mainWindow.loadURL(process.env.ELECTRON_RENDERER_URL);
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'));
  }

  mainWindow.on('ready-to-show', () => mainWindow?.show());
  return mainWindow;
};

/**
 * Creates the Break Overlay/Popup with "Ultimate Sticky" logic
 */
export const createBreakWindow = () => {
  const display = screen.getPrimaryDisplay();
  const appIcon = nativeImage.createFromPath(getIconPath());
  
  const { width, height } = display.bounds; 
  const { width: workWidth } = display.workAreaSize; 

  const settings = store.get('settings');
  const isSmartEye = settings?.smartEyeEnabled || false;

  breakWindow = new BrowserWindow({
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
    icon: appIcon,
    
    type: 'notification', 
    
    kiosk: isSmartEye, 
    enableLargerThanScreen: true,

    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false,
      contextIsolation: true
    }
  });

  if (process.platform === 'linux') {
    breakWindow.setIcon(appIcon);
  }

  // --- LAYER 1: HIGHEST LEVEL SETTING ---
  // Using level 'screen-saver' with a sub-level of 10. 
  // This is effectively the "God Mode" of window layering.
 breakWindow.setAlwaysOnTop(true, 'screen-saver', 1);

  // 2. Ensure it exists on all workspaces
  breakWindow.setVisibleOnAllWorkspaces(true, { visibleOnFullScreen: true });

  // --- LAYER 3: THE RE-ASSERTION HAMMER ---
  const aggressiveInterval = setInterval(() => {
    if (breakWindow && !breakWindow.isDestroyed()) {
      // Every 200ms, we tell the OS: "I am still the most important window"
      breakWindow.setAlwaysOnTop(true, 'screen-saver', 1);
      
      // Forces the window to the absolute front of the Z-stack
      breakWindow.moveTop();

      if (isSmartEye) {
        breakWindow.focus(); // Lockdown keyboard if Smart Eye is on
      }
    } else {
      clearInterval(aggressiveInterval);
    }

  }, 200);

  

  // --- LAYER 4: BLUR PROTECTION ---
  breakWindow.on('blur', () => {
    if (breakWindow && !breakWindow.isDestroyed()) {
      breakWindow.showInactive();
    }
  });

  const url = process.env.ELECTRON_RENDERER_URL 
    ? `${process.env.ELECTRON_RENDERER_URL}#/break` 
    : `file://${join(__dirname, '../renderer/index.html')}#/break`;

  breakWindow.loadURL(url);

  // --- FAIL-SAFE DESTRUCTION ---
  setTimeout(() => {
    if (breakWindow && !breakWindow.isDestroyed()) {
      clearInterval(aggressiveInterval);
      breakWindow.destroy(); 
    }
  }, 22000); // 22 seconds

  return breakWindow;
};
export const getMainWindow = () => mainWindow;
export const getBreakWindow = () => breakWindow;