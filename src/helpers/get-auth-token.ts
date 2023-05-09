import enviroment from '../config/enviroment';
import jumboClient from './jumbo-client';

const {
  jumbo: { startUrl },
} = enviroment;

/**
 * Gets the authentication token.
 * @returns {Promise<string>}
 */
export async function getAuthToken(): Promise<string> {
  try {
    const response = await jumboClient.get(startUrl);
    const token = response.data.authenticationToken;
    if (!token) {
      throw response.data;
    }
    return response.data.authenticationToken;
  } catch (error) {
    console.error('Error getting authentication token');
    throw error;
  }
}
