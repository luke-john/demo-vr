const {
  configureToMatchImageSnapshot,
} = require('@wanamu/jest-image-snapshot');

const customConfig = { threshold: 0 };
const toMatchImageSnapshot = configureToMatchImageSnapshot({
  customDiffConfig: customConfig,
});

expect.extend({ toMatchImageSnapshot });
