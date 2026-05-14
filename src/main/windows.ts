import { BrowserWindow, screen } from 'electron';
import { join } from 'path';

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

export const createBreakWindow = () => {
  const { width, height } = screen.getPrimaryDisplay().workAreaSize;

  breakWindow = new BrowserWindow({
     transparent: true, // MUST BE TRUE
    frame: false,      // MUST BE FALSE
    hasShadow: false,  // Let CSS handle the shadow
    width: 500,
    height: 450,
    x: width - 520,
    y: 50,
    alwaysOnTop: true,
    skipTaskbar: true,
    resizable: false,
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
    }
  });

  // Level 'screen-saver' ensures it stays above full-screen apps/videos
  breakWindow.setAlwaysOnTop(true, 'screen-saver');

  // Load the break route (we'll define this in React)
  const breakURL = process.env.ELECTRON_RENDERER_URL 
    ? `${process.env.ELECTRON_RENDERER_URL}#/break` 
    : `file://${join(__dirname, '../renderer/index.html')}#/break`;

  breakWindow.loadURL(breakURL);
  breakWindow.on('closed', () => {
    breakWindow = null;
  });
  return breakWindow;
};

export const getMainWindow = () => mainWindow;
export const getBreakWindow = () => breakWindow;