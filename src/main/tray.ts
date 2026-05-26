import { app, Tray, Menu, nativeImage, BrowserWindow, ipcMain } from 'electron';
import { join } from 'path';

let tray: Tray | null = null;

export const createTray = (mainWindow: BrowserWindow) => {
  const iconPath = join(__dirname, '../../resources/icon.png'); 
  const icon = nativeImage.createFromPath(iconPath).resize({ width: 16, height: 16 });

  tray = new Tray(icon);

  // Function to build the menu so we can refresh it if needed
  const buildMenu = (isPaused: boolean = false) => {
    return Menu.buildFromTemplate([
      { label: 'ICare v1.0.4', enabled: false },
      { type: 'separator' },
      { label: 'Show Dashboard', click: () => mainWindow.show() },
      { 
        label: 'Pause Timer', 
        type: 'checkbox', 
        checked: isPaused,
        click: (item) => {
          // Tell the main process logic to toggle
          // This will trigger the sync to the Dashboard UI
          mainWindow.webContents.send('timer:external-toggle', item.checked);
        } 
      },
      { type: 'separator' },
      { label: 'Quit App', click: () => app.exit(0) }
    ]);
  };

  tray.setToolTip('ICare is watching...');
  tray.setContextMenu(buildMenu(false));

  // SENIOR MOVE: Listen for pause changes from the UI to update the Tray checkbox
  ipcMain.on('timer:state-changed', (_event, isPaused) => {
    if (tray) {
      tray.setContextMenu(buildMenu(isPaused));
    }
  });

  tray.on('double-click', () => mainWindow.show());
};