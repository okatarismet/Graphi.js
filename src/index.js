/* eslint-disable no-undef */
import dotenv from 'dotenv';
import http from 'http';
import express from 'express';
import { applyMiddleware, /*applyRoutes,*/ setRoutes } from './utils/index.js';

import { default as routeMap, listEndpoints } from './routes/routes.js';
import middlewares from './middlewares/index.js';

import checkPayloadFormat from './middlewares/checkPayloadFormat.js'

dotenv.config();

const PORT = parseInt(process.env.PORT, 10) || 9000;
const app = express();
process.on('uncaughtException', e => {
  console.log(e);
  process.exit(1);
});
process.on('unhandledRejection', (reason, promise) => {
  console.log('Unhandled Rejection at:', reason.stack || reason)
  process.exit(1);
});

applyMiddleware(middlewares, app);
app.use(checkPayloadFormat);
// app.use(authAccount);
setRoutes(routeMap, app);

const server = http.createServer(app);

console.log(listEndpoints())

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT} `);
});
export default server;