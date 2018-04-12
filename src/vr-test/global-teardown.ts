module.exports = async function globalSetup() {
  // tslint:disable-next-line no-any
  (global as any).__VR_TEST__.teardown();
};
