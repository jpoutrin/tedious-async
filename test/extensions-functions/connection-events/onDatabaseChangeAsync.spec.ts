import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import * as sinon from 'sinon';
import onDatabaseChangeAsync from '../../../src/extension-functions/connection-events/onDatabaseChangeAsync';
import Connection from '../../../src/index';
chai.use(chaiAsPromised);
const expect = chai.expect;

describe('Extention Functions', () => {
  describe('onDatabaseChangeAsync()', () => {
    let sandbox;
    let connectionStub;
    beforeEach('stubbing Connection', () => {
      sandbox = sinon.createSandbox();
      connectionStub = sandbox.createStubInstance(Connection);
    });

    afterEach('clearing sandbox', () => {
      sandbox.restore();
    });

    it('should resolve promise string', async () => {
      try {
        connectionStub.on = (event, callback) => callback('test');
        const onDebugResult = await onDatabaseChangeAsync(connectionStub)();
        expect(onDebugResult).to.eql('test');
      } catch (error) {
        expect(error).to.eql(undefined);
      }
    });

    it('should reject promise empty string', async () => {
      try {
        connectionStub.on = (event, callback) => callback('');
        const onDebugResult = await onDatabaseChangeAsync(connectionStub)();
      } catch (error) {
        expect(error).to.eql('');
      }
    });

    it('should reject promise when undefined', async () => {
      try {
        connectionStub.on = (event, callback) => callback(undefined);
        const onDebugResult = await onDatabaseChangeAsync(connectionStub)();
      } catch (error) {
        expect(error).to.eql(undefined);
      }
    });

    it('should reject promise when null', async () => {
      try {
        connectionStub.on = (event, callback) => callback(null);
        const onDebugResult = await onDatabaseChangeAsync(connectionStub)();
      } catch (error) {
        expect(error).to.eql(null);
      }
    });
  });
});
