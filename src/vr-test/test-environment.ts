const chalk = require('chalk');
const NodeEnvironment = require('jest-environment-node');

interface AssertedNodeEnvironment {
  // tslint:disable-next-line:no-any
  new (config: any): any;
}

const AssertedNodeEnvironment = NodeEnvironment as AssertedNodeEnvironment;

// tslint:disable-next-line no-console no-any
const vrTest = (global as any).__VR_TEST__;

class PuppeteerEnvironment extends AssertedNodeEnvironment {
  // tslint:disable-next-line:no-any
  constructor(config: any) {
    super(config);
  }

  async setup() {
    // tslint:disable-next-line:no-console
    console.log(chalk.yellow('Setup Test Environment.'));
    await super.setup();

    this.global.snapshotComponent = vrTest.snapshotComponent;
  }

  async teardown() {
    // tslint:disable-next-line:no-console
    console.log(chalk.yellow('Teardown Test Environment.'));
    await super.teardown();
  }

  // tslint:disable-next-line:no-any
  runScript(script: any) {
    return super.runScript(script);
  }
}

module.exports = PuppeteerEnvironment;
