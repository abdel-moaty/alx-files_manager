import { Express } from 'express';
import AppController from '../controllers/AppController';

/**
 * Injects routes with their handlers to the given Express application.
 * @param {Express} api - Express application instance
 */
const injectRoutes = (api) => {
  /* Status endpoint */
  api.get('/status', AppController.getStatus);
  
  /* Stats endpoint */
  api.get('/stats', AppController.getStats);
};

export default injectRoutes;
