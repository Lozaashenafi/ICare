import { BrowserWindow, screen, nativeImage } from 'electron';
import { join } from 'path';
import store from './services/store';

let mainWindow: BrowserWindow | null = null;
let breakWindow: BrowserWindow | null = null;

// Helper to get the correct icon path based on environment
const getIconPath = () => {
  // Points to your resources folder
  return join(__dirname, '../../resources/icon.png');
};


export const createMainWindow = () => {
  const appIcon = nativeImage.createFromPath(getIconPath());

  mainWindow = new BrowserWindow({
    width: 1100,
    height: 850,
    show: false,
    autoHideMenuBar: true,
    icon: appIcon, // SET ICON IN CONSTRUCTOR
    titleBarStyle: 'hiddenInset',
    webPreferences: {
      // Note: Use .mjs if your build folder uses ES modules, or stick to .js
      preload: join(__dirname, '../preload/index.js'), 
      sandbox: false,
      contextIsolation: true,
      nodeIntegration: false,
    }
  });

  // LINUX FIX: Force the icon on the window instance
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
 * Creates the Break Overlay/Popup
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
    icon: appIcon, // SET ICON FOR POPUP TOO
    
    // Kiosk logic for Smart Eye
    kiosk: isSmartEye,

    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false,
      contextIsolation: true
    }
  });

  // LINUX FIX for Popup
  if (process.platform === 'linux') {
    breakWindow.setIcon(appIcon);
  }

  breakWindow.setAlwaysOnTop(true, 'screen-saver');

  if (isSmartEye) {
    breakWindow.setVisibleOnAllWorkspaces(true, { visibleOnFullScreen: true });

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

  // Safety Fail-safe
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