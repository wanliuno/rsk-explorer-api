"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = exports.RemascEvents = void 0;var rlp = _interopRequireWildcard(require("rlp"));function _getRequireWildcardCache() {if (typeof WeakMap !== "function") return null;var cache = new WeakMap();_getRequireWildcardCache = function () {return cache;};return cache;}function _interopRequireWildcard(obj) {if (obj && obj.__esModule) {return obj;}var cache = _getRequireWildcardCache();if (cache && cache.has(obj)) {return cache.get(obj);}var newObj = {};if (obj != null) {var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;for (var key in obj) {if (Object.prototype.hasOwnProperty.call(obj, key)) {var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;if (desc && (desc.get || desc.set)) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}}newObj.default = obj;if (cache) {cache.set(obj, newObj);}return newObj;}

class RemascEvents {
  decode(log) {
    let event = this.decodeEventName(log.topics[0]);
    // at the moment remasc emits only one event
    if (event === 'mining_fee_topic') {
      let [blockHash, value] = this.decodeData(log.data);
      let to = this.decodeAddress(log.topics[1]);
      log.event = event;
      log.args = [to, blockHash, value];
      log.abi = this.fakeAbi();
    }
    return log;
  }

  decodeEventName(name) {
    name = name.slice(0, 2) === '0x' ? name.slice(2, name.length) : name;
    return Buffer.from(name, 'hex').toString('ascii').replace(/\0/g, '');
  }

  decodeData(data) {
    return rlp.decode(data).map(d => '0x' + d.toString('hex').replace(/^0+/, ''));
  }

  decodeAddress(address) {
    return '0x' + address.slice(-40);
  }
  fakeAbi() {
    return {
      anonymous: false,
      inputs: [
      {
        indexed: true,
        name: 'to',
        type: 'address' },

      {
        indexed: false,
        name: 'blockHash',
        type: 'address' },

      {
        indexed: false,
        name: 'value',
        type: 'uint256' }],


      name: 'mining_fee_topic',
      type: 'event' };

  }}exports.RemascEvents = RemascEvents;


const remascEvents = new RemascEvents();var _default =
remascEvents;exports.default = _default;