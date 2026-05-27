import { app, Tray, Menu, nativeImage, BrowserWindow, ipcMain } from 'electron';
import { join } from 'path';

let tray: Tray | null = null;

export const createTray = (mainWindow: BrowserWindow) => {
  const iconPath = join(__dirname, '../../resources/icon.png'); 
  const icon = nativeImage.createFromPath(iconPath).resize({ width: 16, height: 16 });

  tray = new Tray(icon);

  const buildMenu = (isPaused: boolean = false) => {
    return Menu.buildFromTemplate([
      { label: 'ICare v1.0.4', enabled: false },
      { type: 'separator' },
      
      { 
        label: isPaused ? 'Resume Timer' : 'Pause Timer', 
        type: 'checkbox', 
        checked: isPaused,
        click: (item) => {
          ipcMain.emit('timer:external-toggle', null, item.checked);
        } 
      },
      { type: 'separator' },
      { label: 'Quit ICare', click: () => app.exit(0) }
    ]);
  };

  tray.setToolTip('ICare: Keeping your eyes fresh');
  tray.setContextMenu(buildMenu(false));

  // Sync Tray UI if pause state changes from the Dashboard
  ipcMain.on('timer:state-changed', (_event, isPaused) => {
    if (tray) tray.setContextMenu(buildMenu(isPaused));
  });

  tray.on('double-click', () => mainWindow.show());
};