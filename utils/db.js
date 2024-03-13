import { env } from 'process';
import { MongoClient } from 'mongodb';

/**
 * DBClient class for interacting with MongoDB.
 */
export class DBClient {
  /**
   * Creates an instance of DBClient.
   */
  constructor() {
    const host = env.DB_PORT || '127.0.0.1';
    const port = env.DB_HOST || 27017;
    const database = env.DB_DATABASE || 'files_manager';
    this.myClient = new MongoClient(`mongodb://${host}:${port}/${database}`);
    this.myClient.connect();
  }

  /**
   * Checks if the database connection is alive.
   * @returns {boolean} Returns true if the connection is alive, otherwise false.
   */
  isAlive() {
    return this.myClient.isConnected();
  }

  /**
   * Retrieves the number of users in the database.
   * @returns {Promise<number>} Returns a Promise with the number of users.
   */
  async nbUsers() {
    const myCollection = this.myClient.db().collection('users');
    return myCollection.countDocuments();
  }

  /**
   * Retrieves the number of files in the database.
   * @returns {Promise<number>} Returns a Promise with the number of files.
   */
  async nbFiles() {
    const myCollection = this.myClient.db().collection('files');
    return myCollection.countDocuments();
  }

  /**
   * Adds a new user to the database.
   * @param {string} email - The email of the new user.
   * @param {string} passwordHash - The password hash of the new user.
   * @returns {Promise<Object>} Returns a Promise with the result of the insertion operation.
   */
  async addUser(email, passwordHash) {
    const myCollection = this.myClient.db().collection('users');
    return myCollection.insertOne({ email, passwordHash });
  }

  /**
   * Updates the password hash of an existing user.
   * @param {string} email - The email of the user to update.
   * @param {string} newPasswordHash - The new password hash.
   * @returns {Promise<Object>} Returns a Promise with the result of the update operation.
   */
  async updateUserPassword(email, newPasswordHash) {
    const myCollection = this.myClient.db().collection('users');
    return myCollection.updateOne({ email }, { $set: { passwordHash: newPasswordHash } });
  }

  /**
   * Deletes a user from the database.
   * @param {string} email - The email of the user to delete.
   * @returns {Promise<Object>} Returns a Promise with the result of the deletion operation.
   */
  async deleteUser(email) {
    const myCollection = this.myClient.db().collection('users');
    return myCollection.deleteOne({ email });
  }
}

const dbClient = new DBClient();

export default dbClient;
