const {createJsonDB} = require('./db-creation/db-creator')
const fs = require('fs');

const jsonServer = require('json-server');
const mockApiDir = 'mock-api';
const dbFile = `${mockApiDir}/db.json`;


function checkDbExistence() {
    if (fs.existsSync(dbFile)) {
      return Promise.resolve();
    } else {
      return createJsonDB();
    }
}

function runJsonServer() {
  const server = jsonServer.create();
  const router = jsonServer.router(dbFile, []);
  const middlewares = jsonServer.defaults([]);
  const port = 3004

  server.use(jsonServer.rewriter({
    "/news/:newsLink": "/:newsLink"
  }));
  server.use(middlewares);
  server.use(router);
  server.listen(port, () => {
    console.log(`JSON Server is running on port ${port}`);
  });
}

checkDbExistence()
  .catch((e) => {
    console.error(e);
    try {
      console.log('trying to use mock DB...');
      fs.copyFileSync(`${ dbFile }.example`, dbFile);
      console.log('starting server with mock DB...');
    } catch (e) {
      console.error(e);
      console.log('server will run with empty DB..')
    }
  })
  .finally(() => runJsonServer());
