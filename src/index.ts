import loginJumbo from './login-jumbo';

/** The user's credentials */
const input = {
  user: '',
  password: '',
};

(async function () {
  try {
    const result = await loginJumbo(input);
    console.log({ result });
  } catch (error) {
    console.error('Login error', error);
  }
})();
