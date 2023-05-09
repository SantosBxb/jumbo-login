import * as chai from 'chai';
import originalSinon from 'sinon';
import sinonChai from 'sinon-chai';
import chaiAsPromised from 'chai-as-promised';
import chaiThings from 'chai-things';
import chaiDateTime from 'chai-datetime';

chai.should();
chai.use(sinonChai);
chai.use(chaiAsPromised);
chai.use(chaiThings);
chai.use(chaiDateTime);

export const { assert, expect } = chai;
export const sinon = originalSinon;

export default {
  assert: chai.assert,
  expect: chai.expect,
  sinon: originalSinon,
};
