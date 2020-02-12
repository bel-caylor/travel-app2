import {testServer} from '../src/client/index.js';
require("regenerator-runtime");

test('test Server', async () => {
  await expect(testServer()).resolves.toBe('Server Running');
});
