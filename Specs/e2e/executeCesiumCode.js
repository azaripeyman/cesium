/**
 * Executes a callback in the context of a standalone Cesium application.
 *
 * When the callback in invoked, CesiumJS is loaded and assigned to the global <code>Cesium</code> variable.
 * @param {Page} page The playwright page
 * @param {Function} callback Cesium code to invoke
 * @return {Promise<*>} A promise which resolves when script has been loaded and the callback is complete
 */
async function executeCesiumCode(page, callback) {
  await page.goto(`/Specs/e2e/standalone.html`);
  await page.addScriptTag({
    content: `
window.complete = false;
await (${callback.toString()})();
window.complete = true;
      `,
    type: "module",
  });

  await page.waitForFunction(() => window.complete);
}

export default executeCesiumCode;
