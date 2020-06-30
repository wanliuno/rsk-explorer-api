"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = exports.BlocksBase = void 0;var _blocksCollections = require("./blocksCollections");
var _types = require("./types");
var _nod3Connect = require("./nod3Connect");
var _NativeContracts = _interopRequireDefault(require("./NativeContracts"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

class BlocksBase {
  constructor(db, { log, initConfig, debug } = {}) {
    this.initConfig = initConfig || {};
    this.db = db;
    this.collections = db ? (0, _blocksCollections.getDbBlocksCollections)(db) : undefined;
    this.nod3 = _nod3Connect.nod3Router;
    log = log || console;
    this.log = log;
    if (debug) _nod3Connect.nod3Router.setDebug((0, _nod3Connect.nod3Log)(log));
    this.et = _types.events;
    this.actions = _types.actions;
    this.nativeContracts = (0, _NativeContracts.default)(initConfig);
    this.net = this.initConfig.net;
  }}exports.BlocksBase = BlocksBase;var _default =


BlocksBase;exports.default = _default;