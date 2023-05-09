import enviroment from './config/enviroment';
import {
  LoginJumboInput,
  LoginJumboOutput,
  LoginJumboResponse,
} from './login-jumbo.types';
import jumboClient from './helpers/jumbo-client';
import { getAuthToken } from './helpers/get-auth-token';

const {
  jumbo: { loginUrl },
} = enviroment;

enum AuthStatus {
  success = 'Success',
}

/**
 * Login to jumbo Given a user and password.
 * It is assumed that an apikey already exists to communicate with the jumbo api.
 * @param {LoginJumboInput} input - Input
 * @param {string} input.user - Jumbo user
 * @param {string} input.password - User password
 * @returns {Promise<LoginJumboOutput>}
 */
async function loginJumbo({
  user,
  password,
}: LoginJumboInput): Promise<LoginJumboOutput> {
  try {
    const authenticationToken = await getAuthToken();

    const response = await jumboClient.post<LoginJumboResponse>(loginUrl, {
      authenticationToken,
      login: user,
      password,
    });

    const data = response.data;

    if (data.authStatus !== AuthStatus.success) {
      throw data;
    }

    return {
      token: data.token,
      firstName: data.user.firstName,
      lastName: data.user.lastName,
      email: data.user.email,
      homePhone: data.user.homePhone,
      allData: data,
    };
  } catch (error) {
    console.error('Error login Jumbo');
    throw error;
  }
}

export default loginJumbo;
