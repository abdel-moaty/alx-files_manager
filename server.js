import express from 'express';
import startServer from './libs/boot';
import injectRoutes from './routes';

/* Create Express server instance */
const server = express();

/* Load middleware and routes */
injectRoutes(server);
startServer(server);

/* Export the server */
export default server;
