/**
 * @file services/dbService.ts
 * @description This service provides a robust, promise-based wrapper around IndexedDB
 * for storing and retrieving large binary data like images. It replaces less reliable
 * or quota-limited storage options like localStorage, making it suitable for production applications.
 */

import { openDB, IDBPDatabase } from 'idb';

const DB_NAME = 'ImageCacheDB';
const STORE_NAME = 'images';
const DB_VERSION = 1;

/**
 * Converts a base64 string into a Blob object.
 * @param {string} b64Data - The base64 encoded data (without the data URL prefix).
 * @param {string} contentType - The MIME type of the data.
 * @param {number} sliceSize - The size of chunks to process.
 * @returns {Blob} The resulting Blob object.
 */
export const b64toBlob = (b64Data: string, contentType = '', sliceSize = 512): Blob => {
  const byteCharacters = atob(b64Data);
  const byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    const slice = byteCharacters.slice(offset, offset + sliceSize);
    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }

  return new Blob(byteArrays, { type: contentType });
};

/**
 * Gets a database connection. The `idb` library handles connection pooling and reuse internally.
 * @returns {Promise<IDBPDatabase>} A promise that resolves with the database instance.
 */
const getDb = (): Promise<IDBPDatabase> => {
  if (typeof window === 'undefined') {
    // Return a mock object for server-side or build environments to prevent errors.
    return Promise.reject(new Error("IndexedDB not available in this environment."));
  }
  
  // Directly return the promise from openDB.
  // The 'idb' library handles connection reuse internally, which is more robust
  // than a manual singleton implementation.
  return openDB(DB_NAME, DB_VERSION, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        // Create the object store for our images.
        db.createObjectStore(STORE_NAME);
      }
    },
  });
};

/**
 * A service object that encapsulates all IndexedDB operations for the image cache.
 */
export const dbService = {
  /**
   * Saves an image as a base64 string to the database.
   * @param {string} id - The unique identifier for the image (e.g., card ID).
   * @param {string} base64Data - The base64 encoded image data.
   */
  async saveImageBase64(id: string, base64Data: string): Promise<void> {
    try {
        const db = await getDb();
        await db.put(STORE_NAME, base64Data, id);
    } catch (error) {
        console.error("Failed to save base64 image to IndexedDB:", error);
    }
  },

  /**
   * Retrieves an image as a base64 string from the database.
   * @param {string} id - The ID of the image to retrieve.
   * @returns {Promise<string | undefined>} The base64 image string, or undefined if not found.
   */
  async getImageBase64(id: string): Promise<string | undefined> {
    try {
        const db = await getDb();
        return db.get(STORE_NAME, id);
    } catch (error) {
        console.error("Failed to get base64 image from IndexedDB:", error);
        return undefined;
    }
  },

  /**
   * Retrieves all images as base64 strings from the database.
   * @returns {Promise<{ id: string, base64: string }[]>} An array of objects containing image IDs and their base64 strings.
   */
  async getAllImagesBase64(): Promise<{ id: string, base64: string }[]> {
    try {
        const db = await getDb();
        const keys = await db.getAllKeys(STORE_NAME);
        const base64s = await db.getAll(STORE_NAME);
        return keys.map((key, index) => ({
        id: String(key),
        base64: String(base64s[index])
        }));
    } catch (error) {
        console.error("Failed to get all base64 images from IndexedDB:", error);
        return [];
    }
  },

  /**
   * Clears the entire image cache from the database.
   */
  async clearImages(): Promise<void> {
    try {
        const db = await getDb();
        await db.clear(STORE_NAME);
        console.log("IndexedDB 'images' store cleared successfully.");
    } catch (error) {
        console.error("Failed to clear IndexedDB:", error);
    }
  }
};
