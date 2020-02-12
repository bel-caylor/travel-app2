import {testServer} from '../src/client/js/testServer.js';
require("regenerator-runtime");

test('test Server', async () => {
  await expect(testServer()).resolves.toBe('Server Running');
});
