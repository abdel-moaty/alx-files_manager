import { promisify } from 'util';
import { createClient } from 'redis';

/**
 * Represents a Redis client for managing key-value pairs.
 */
class RedisClient {
  /**
   * Creates a new RedisClient instance and establishes a connection to Redis.
   * Any connection errors are logged to the console.
   */
  constructor() {
    this.client = createClient();
    this.client.on('error', (err) => {
      console.error('Redis client failed to connect:', err.message || err.toString());
    });
  }

  /**
   * Checks if the client is currently connected to the Redis server.
   * @returns {boolean} - True if the client is connected, false otherwise.
   */
  isAlive() {
    return this.client.connected;
  }

  /**
   * Retrieves the value associated with the specified key from Redis.
   * @param {string} key - The key to retrieve the value for.
   * @returns {Promise<string|null>} - A promise resolving to the value associated with the key.
   */
  async get(key) {
    return promisify(this.client.get).bind(this.client)(key);
  }

  /**
   * Stores the specified key-value pair in Redis with an expiration time.
   * @param {string} key - The key for the new entry.
   * @param {string|number|boolean} value - The value to store.
   * @param {number} duration - The expiration time in seconds.
   * @returns {Promise<void>} - A promise that resolves when the operation completes.
   */
  async set(key, value, duration) {
    await promisify(this.client.setex).bind(this.client)(key, duration, value);
  }

  /**
   * Deletes the value associated with the specified key from Redis.
   * @param {string} key - The key to delete.
   * @returns {Promise<void>} - A promise that resolves when the operation completes.
   */
  async del(key) {
    await promisify(this.client.del).bind(this.client)(key);
  }
}

const redisClient = new RedisClient();

export default redisClient;
