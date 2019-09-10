// import/require spectron

// write tests for electron application using the electron suite
function sum(a, b) {
  return a + b;
}

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});

// const { Application } = require('spectron');
// const { assert } = require('chai');
// const path = require('path');
// const electronPath = require('electron');
//
// const electronBinary = path.join(__dirname, '..', 'node_modules', '.bin', 'electron');
// const baseDir = path.join(path.join(__dirname, '..', 'src', 'main', 'main.js'));
// console.log('electronBin ===> ', electronBinary);
// console.log('baseDir ===> ', baseDir);
//
// const sleep = time => new Promise(resolve => setTimeout(resolve, time));
//
// describe('Application launch', function () {
//   this.timeout(20000);
//
//   const app = new Application({
//     path: electronBinary,
//     args: [baseDir],
//   });
//
//   before(function () {
//     return app.start();
//   });
//
//   after(function () {
//     return app.stop();
//   });
//
//   it('opens main window with title Kre8', async () => {
//     await app.client.waitUntilWindowLoaded();
//     const window = await app.client.windowByIndex(0);
//     const title = await app.client.getTitle();
//     const result = await app.client.getWindowCount();
//     assert.strictEqual(result, 1);
//     assert.strictEqual(title, 'Kre8');
//   });
//
//   it('does not have the developer tools open', async () => {
//     const result = await app.client.browserWindow.isDevToolsOpened();
//     assert.isFalse(result);
//   });
// });
