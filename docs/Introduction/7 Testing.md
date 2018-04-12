## Visual Regression Tests

We use visual regression tests to give us confidence in our components visual behaviour when making changes.

Visual regression tests should be setup for components in adjacent `{ComponentName}.vr-test.tsx` files, and generate snapshots into an adjacent **image_snapshots** folder.

### Running visual regression tests locally

When running the visual regression tests in development it requires you to be running the `browserless/chrome` docker image locally running on port `8080`.

```sh
yarn run vr-test
```

#### docker setup

This command only needs to be run once when.

```sh
docker pull browserless/chrome
```

#### run the docker machine

Once this command has been run, you can leave it running in the background for future test runs, or terminate and rerun before running tests again.

```sh
docker run --shm-size=1gb -p 3000:3000 browserless/chrome
```

### Example Usage

```md
* /ElementName
  * /**image_snapshots**
    * elementname-vr-test-tsx-execution-one-large-1.snap.png
    * elementname-vr-test-tsx-execution-one-small-1.snap.png
    * elementname-vr-test-tsx-execution-two-large-1.snap.png
    * elementname-vr-test-tsx-execution-two-small-1.snap.png
  * index.tsx
  * styled.tsx
  * ElementName.test.tsx
  * ElementName.vr-test.tsx
```

```tsx
// ElementName.vr-test.tsx
import { takeSnapshot, largeViewport, smallViewport } from '../../../vr-test';

const screenshotOptions = {
  clip: {
    width: 250,
    height: 100,
    x: 0,
    y: 0,
  },
};

describe('execution-one', () => {
  const componentExecutionOne = <Component execution="one" />

  it('large', async () => {
    const snapshot = await takeSnapshot(componentExecutionOne, {
      viewport: largeViewport,
      screenshotOptions,
    });

    expect(snapshot).toMatchImageSnapshot();
  })
  it('small', async () => {
    const snapshot = await takeSnapshot(componentExecutionOne, {
      viewport: largeViewport,
      screenshotOptions,
    });

    expect(snapshot).toMatchImageSnapshot();
  })
}

describe('execution-two', () => {
  const componentExecutionTwo = <Component execution="two" />

  it('large', async () => {
    const snapshot = await takeSnapshot(componentExecutionTwo, {
      viewport: largeViewport,
      screenshotOptions,
    });

    expect(snapshot).toMatchImageSnapshot();
  })
  it('small', async () => {
    const snapshot = await takeSnapshot(componentExecutionTwo, {
      viewport: largeViewport,
      screenshotOptions,
    });

    expect(snapshot).toMatchImageSnapshot();
  })
}
```
