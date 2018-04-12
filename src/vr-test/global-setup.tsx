import * as React from 'react';
import * as ReactDOMServer from 'react-dom/server';
import { ServerStyleSheet } from 'styled-components';
import * as puppeteer from 'puppeteer';

const chalk = require('chalk');

const buildPageHtml = (content: {
  componentHtml: string;
  styleTags: string;
}) => {
  return `
    <html>
      <head>
        ${content.styleTags}
      </head>
      <body>
        ${content.componentHtml}
      </body>
    </html>
  `;
};

export class VrTest {
  browser: puppeteer.Browser;

  constructor(browser: puppeteer.Browser) {
    this.browser = browser;
  }

  snapshotComponent = async (
    reactNode: React.ReactNode,
    options: {
      screenshotOptions?: puppeteer.ScreenshotOptions;
      viewport?: puppeteer.Viewport;
    } = {},
  ): Promise<Buffer> => {
    const page = await this.browser.newPage();
    page.setViewport(options.viewport || { width: 720, height: 1280 });
    const sheet = new ServerStyleSheet();

    const componentHtml = ReactDOMServer.renderToString(
      sheet.collectStyles(reactNode),
    );

    const styleTags = sheet.getStyleTags(); // or sheet.getStyleElement()
    const pageHtml = buildPageHtml({ componentHtml, styleTags });

    await page.goto(`data:text/html,${pageHtml}`, {
      waitUntil: 'networkidle0',
    });

    const screenshot = await page.screenshot(options.screenshotOptions);

    return screenshot;
  };

  async teardown() {
    await this.browser.close();
  }
}

module.exports = async function globalSetup() {
  // tslint:disable-next-line:no-console
  console.log(chalk.yellow('Global Setup.'));

  // tslint:disable-next-line:no-any
  const jestBrowser = await puppeteer.connect({
    browserWSEndpoint: 'ws://localhost:3000',
  });

  const vrTest = new VrTest(jestBrowser);

  // tslint:disable-next-line
  (global as any).__VR_TEST__ = vrTest;
};
