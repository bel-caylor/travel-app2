require("regenerator-runtime");
const fetch = require("node-fetch");
const port = 'http://localhost:3000';

const testServer = async () => {
  const response = await fetch(`${port}/test`);
  try {
    const newData = await response.json();
    console.log(newData);
    return 'Server Running';
  }catch(error) {
    console.log("error", error);
  }
};

export {testServer};
