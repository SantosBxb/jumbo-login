import axios from 'axios';
import enviroment from '../config/enviroment';

const {
  jumbo: { apiKey },
} = enviroment;

/** Jumbo client with proper setup */
const jumboClient = axios.create({
  headers: {
    'x-api-key': apiKey,
  },
});

export default jumboClient;
