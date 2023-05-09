import { SinonStub } from 'sinon';
import { getAuthToken } from '../../../src/helpers/get-auth-token';
import { expect, sinon } from '../../chai.commons';
import jumboClient from '../../../src/helpers/jumbo-client';

describe('getAuthToken', () => {
  let jumboClientGetStub: SinonStub;

  const authToken = 'authentication-token';
  const response = {
    data: {
      authenticationToken: authToken,
    },
  };

  beforeEach(() => {
    jumboClientGetStub = sinon.stub(jumboClient, 'get');
  });

  afterEach(() => {
    jumboClientGetStub.restore();
  });

  it('[SUCCESS] should return authentication token from jumboClient', async () => {
    try {
      jumboClientGetStub.resolves(response);
      const result = await getAuthToken();

      expect(result).to.equal(authToken);
      expect(jumboClientGetStub).to.have.been.calledOnce;
    } catch (error) {
      expect(error).to.be.undefined;
    }
  });

  it('[ERROR] should throw an error if authentication token is not present in the response', async () => {
    const errorResponse = {
      data: {},
    };
    jumboClientGetStub.resolves(errorResponse);

    try {
      await getAuthToken();
    } catch (error) {
      expect(error).to.equal(errorResponse.data);
      expect(jumboClientGetStub).to.have.been.calledOnce;
    }
  });

  it('[ERROR] should throw an error if jumboClient fails', async () => {
    const errorMessage = 'Failed to get authentication token';
    jumboClientGetStub.rejects(new Error(errorMessage));

    try {
      await getAuthToken();
    } catch (err) {
      const error = err as Error;
      expect(error.message).to.equal(errorMessage);
      expect(jumboClientGetStub).to.have.been.calledOnce;
    }
  });
});
