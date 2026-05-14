import { app, Tray, Menu, nativeImage, BrowserWindow } from 'electron';
import { join } from 'path';

let tray: Tray | null = null;
let isQuitting = false;

export const createTray = (mainWindow: BrowserWindow) => {
  // Use a template icon for Mac (auto-swaps black/white) or a simple png
  const iconPath = join(__dirname, '../../resources/icon.png'); 
  const icon = nativeImage.createFromPath(iconPath).resize({ width: 16, height: 16 });

  tray = new Tray(icon);

  const contextMenu = Menu.buildFromTemplate([
    { label: 'ICare v1.0', enabled: false },
    { type: 'separator' },
    { label: 'Show Dashboard', click: () => mainWindow.show() },
    { label: 'Pause Timer', type: 'checkbox', click: (item) => {
        mainWindow.webContents.send('timer:external-toggle', item.checked);
    }},
    { type: 'separator' },
    { label: 'Quit Savage', click: () => {
        isQuitting = true;
        app.quit();
    }}
  ]);

  tray.setToolTip('ICare: Watching you...');
  tray.setContextMenu(contextMenu);

  tray.on('double-click', () => mainWindow.show());
};