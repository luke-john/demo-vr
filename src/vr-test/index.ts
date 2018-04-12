import { VrTest } from './global-setup';

// required due to typescript definitions bug
import { ReactElement, ReactPortal } from 'react';
export { ReactElement, ReactPortal };
import { ScreenshotOptions, Viewport } from 'puppeteer';
export { ScreenshotOptions, Viewport };

export const largeViewport = { width: 1280, height: 1000 };
export const smallViewport = { width: 720, height: 1280 };

// tslint:disable-next-line:no-any
export const takeSnapshot = (global as any)
  .snapshotComponent as VrTest['snapshotComponent'];
