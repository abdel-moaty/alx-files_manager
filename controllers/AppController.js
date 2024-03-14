import { Express } from 'express';
import { getRedisStatus, getDBStatus, countUsers, countFiles } from '../utils';

/**
 * Injects routes with their handlers to the given Express application.
 * @param {Express} api - Express application instance
 */
const injectRoutes = (api) => {
  /* Status endpoint */
  api.get('/status', async (req, res) => {
    try {
      /* Check Redis and DB status */
      const redisStatus = await getRedisStatus();
      const dbStatus = await getDBStatus();
      /* Send status response */
      res.status(200).json({ redis: redisStatus, db: dbStatus });
    } catch (error) {
      /* Send error response if any error occurs */
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  /* Stats endpoint */
  api.get('/stats', async (req, res) => {
    try {
      /* Count users and files */
      const usersCount = await countUsers();
      const filesCount = await countFiles();
      /* Send stats response */
      res.status(200).json({ users: usersCount, files: filesCount });
    } catch (error) {
      /* Send error response if any error occurs */
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
};

export default injectRoutes;
