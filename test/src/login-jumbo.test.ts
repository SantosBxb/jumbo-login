import jumboClient from '../../src/helpers/jumbo-client';
import loginJumbo from '../../src/login-jumbo';
import * as helpers from '../../src/helpers/get-auth-token';
import { expect, sinon } from '../chai.commons';
import enviroment from '../../src/config/enviroment';

const {
  jumbo: { loginUrl },
} = enviroment;

const dataBehavior = {
  success: {
    token: 'some-token',
    user: {
      firstName: 'Juan',
      lastName: 'Soto',
      email: 'some-email.com',
      homePhone: 'some',
    },
    authStatus: 'Success',
    allData: {
      token: 'some-token',
      user: {},
      authClient: {},
      authStatus: 'Success',
    },
  },
  error: {
    authStatus: 'WrongCredentials',
    promptMFA: false,
    clientToken: null,
    authCookie: null,
    accountAuthCookie: null,
    expiresIn: 0,
    userId: null,
    phoneNumber: null,
    scope: null,
  },
  expectedOutput: {
    allData: {
      allData: {
        authClient: {},
        authStatus: 'Success',
        token: 'some-token',
        user: {},
      },
      authStatus: 'Success',
      token: 'some-token',
      user: {
        email: 'some-email.com',
        firstName: 'Juan',
        homePhone: 'some',
        lastName: 'Soto',
      },
    },
    email: 'some-email.com',
    firstName: 'Juan',
    homePhone: 'some',
    lastName: 'Soto',
    token: 'some-token',
  },
};

const authenticationToken = 'some-token';
const user = 'some.user@email.com';
const password = 'password';

describe('LoginJumbo', () => {
  let postStub: sinon.SinonStub;
  let getAuthTokenStub: sinon.SinonStub;

  beforeEach(() => {
    postStub = sinon.stub(jumboClient, 'post');
    getAuthTokenStub = sinon.stub(helpers, 'getAuthToken');
  });

  afterEach(() => {
    postStub.restore();
    getAuthTokenStub.restore();
  });

  it('[SUCCESS] should return the user data when login is successful', async () => {
    const response = dataBehavior.success;

    postStub.resolves({ data: response });
    getAuthTokenStub.resolves(authenticationToken);

    const result = await loginJumbo({
      user,
      password,
    });

    expect(result).to.deep.equal(dataBehavior.expectedOutput);
    expect(getAuthTokenStub).to.have.been.calledOnce;
    expect(postStub).to.have.been.calledOnce;
    expect(postStub).to.have.been.calledWith(loginUrl, {
      authenticationToken,
      login: user,
      password,
    });
  });

  it('[ERROR] should throw an error when login fails', async () => {
    const expectedError = new Error('Invalid credentials');

    postStub.rejects(expectedError);
    getAuthTokenStub.resolves(authenticationToken);

    try {
      await loginJumbo({
        user,
        password,
      });
      expect.fail();
    } catch (error) {
      expect(error).to.be.equal(expectedError);
      expect(getAuthTokenStub).to.have.been.calledOnce;
      expect(postStub).to.have.been.calledOnce;
      expect(postStub).to.have.been.calledWith(loginUrl, {
        authenticationToken,
        login: user,
        password,
      });
    }
  });

  it('[ERROR] should throw an error when getAuthToken fails', async () => {
    const expectedError = new Error('Invalid credentials');

    getAuthTokenStub.rejects(expectedError);

    try {
      await loginJumbo({
        user,
        password,
      });
      expect.fail();
    } catch (error) {
      expect(error).to.be.equal(expectedError);
      expect(getAuthTokenStub).to.have.been.calledOnce;
      expect(postStub).to.have.been.not.called;
    }
  });

  it('[ERROR] should throw an error when AuthStatus is not Success', async () => {
    const response = dataBehavior.error;

    postStub.resolves({ data: response });
    getAuthTokenStub.resolves(authenticationToken);

    try {
      await loginJumbo({
        user,
        password,
      });
      expect.fail();
    } catch (error) {
      expect(error).to.be.equal(response);
      expect(getAuthTokenStub).to.have.been.calledOnce;
      expect(postStub).to.have.been.calledOnce;
      expect(postStub).to.have.been.calledWith(loginUrl, {
        authenticationToken,
        login: user,
        password,
      });
    }
  });
});
