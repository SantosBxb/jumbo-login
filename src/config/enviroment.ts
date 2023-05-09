interface GetEnvValue<T> {
  key: string;
  defaultValue: T;
}

/**
 * Gets the value from an environment variable: `process.env[key]`. If the value is undefined,
 * `defaultValue` is returned instead.
 * @param {object} args
 * @param {string} args.key
 * @param {(string|number|boolean)} [args.defaultValue]
 * @param {string} [args.type=string]
 * @returns {(string|number|boolean)}
 * @private
 */
function getEnvValue<T extends string | number | boolean>({
  key,
  defaultValue,
}: GetEnvValue<T>): T {
  let result: string | boolean | number = process.env[key] || '';

  if (!result) {
    return defaultValue;
  }
  if (typeof defaultValue === 'boolean') {
    result = result === 'true';
  } else if (typeof defaultValue === 'number') {
    result = Number(result);
  }
  return result as T;
}

export default {
  jumbo: {
    baseUrl: getEnvValue<string>({
      key: 'JUMBO_BASE_URL',
      defaultValue: 'https://jumbo.cl',
    }),
    startUrl: getEnvValue<string>({
      key: 'JUMBO_START_URL',
      defaultValue:
        'https://apijumboweb.smdigital.cl/user/api/v1/vtexid/pub/authentication/start',
    }),
    loginUrl: getEnvValue<string>({
      key: 'JUMBO_LOGIN_URL',
      defaultValue:
        'https://apijumboweb.smdigital.cl/user/api/v1/vtexid/pub/authentication/classic/validate',
    }),
    apiKey: getEnvValue<string>({
      key: 'JUMBO_API_KEY',
      defaultValue: 'IuimuMneIKJd3tapno2Ag1c1WcAES97j',
    }),
  },
};
