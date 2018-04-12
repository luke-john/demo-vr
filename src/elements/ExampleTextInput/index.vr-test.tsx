import * as React from "react";

import { takeSnapshot, largeViewport, smallViewport } from "../../vr-test";

import { ExampleTextInput } from "./";

const screenshotOptions = {
  clip: {
    width: 220,
    height: 80,
    x: 0,
    y: 0
  }
};

const component = <ExampleTextInput id="d" />;

it("large", async () => {
  // tslint:disable-next-line
  const componentSnapshotDesktop = await takeSnapshot(component, {
    viewport: largeViewport,
    screenshotOptions
  });

  expect(componentSnapshotDesktop).toMatchImageSnapshot();
});

it("small", async () => {
  const componentSnapshot = await takeSnapshot(component, {
    viewport: smallViewport,
    screenshotOptions
  });

  expect(componentSnapshot).toMatchImageSnapshot();
});
