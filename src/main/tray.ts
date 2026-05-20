import { app, Tray, Menu, nativeImage, BrowserWindow } from 'electron';
import { join } from 'path';

let tray: Tray | null = null;

export const createTray = (mainWindow: BrowserWindow) => {
  const iconPath = join(__dirname, '../../resources/icon.png'); 
  const icon = nativeImage.createFromPath(iconPath).resize({ width: 16, height: 16 });

  tray = new Tray(icon);

  const contextMenu = Menu.buildFromTemplate([
    { label: 'ICare v1.0.4', enabled: false },
    { type: 'separator' },
    { label: 'Show Dashboard', click: () => mainWindow.show() },
    { 
      label: 'Pause Timer', 
      type: 'checkbox', 
      click: (item) => {
        // Broadcast toggle to the main window
        mainWindow.webContents.send('timer:toggle', item.checked);
      } 
    },
    { type: 'separator' },
    { 
      label: 'Quit App', 
      click: () => {
        app.exit(0); 
      } 
    }
  ]);

  tray.setToolTip('ICare is watching...');
  tray.setContextMenu(contextMenu);
  tray.on('double-click', () => mainWindow.show());
};