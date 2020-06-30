"use strict";
var _config = _interopRequireDefault(require("../lib/config"));
var _nod = require("nod3");function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

check(_config.default.source).then(() => {
  console.log('done');
  process.exit(0);
});

async function check(sources) {
  try {
    sources = !Array.isArray(sources) ? [sources] : sources;
    for (let source of sources) {
      let { url } = source;
      console.log(url);
      let nod3 = new _nod.Nod3(new _nod.Nod3.providers.HttpProvider(url));
      let { hash } = await nod3.eth.getBlock('latest');
      if (!hash) throw new Error(`Cannot get last block from ${url}`);
      let trace = await nod3.trace.block(hash);
      if (!trace) throw new Error(`Invalid trace from ${url}`);
    }
  } catch (err) {
    console.error(err);
    process.exit(9);
  }
}