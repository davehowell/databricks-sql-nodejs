"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var tls = require('tls');
var constants = require('constants');
var TlsTransport = /** @class */ (function () {
    function TlsTransport(host, port, options) {
        if (options === void 0) { options = {}; }
        var _a, _b, _c;
        this.host = host;
        this.port = port;
        this.options = __assign({ secureProtocol: 'SSLv23_method', secureOptions: constants.SSL_OP_NO_SSLv2 | constants.SSL_OP_NO_SSLv3, rejectUnauthorized: false, ca: (_a = options) === null || _a === void 0 ? void 0 : _a.ca, cert: (_b = options) === null || _b === void 0 ? void 0 : _b.cert, key: (_c = options) === null || _c === void 0 ? void 0 : _c.key }, options);
    }
    TlsTransport.prototype.setOptions = function (option, value) {
        var _a;
        this.options = __assign(__assign({}, this.options), (_a = {}, _a[option] = value, _a));
    };
    TlsTransport.prototype.getOptions = function () {
        return {};
    };
    TlsTransport.prototype.getTransport = function () {
        return this.connection;
    };
    TlsTransport.prototype.connect = function () {
        this.connection = tls.connect(this.port, this.host, this.options);
        this.connection.setMaxSendFragment(65536);
        this.connection.setNoDelay(true);
    };
    ;
    TlsTransport.prototype.addListener = function (eventName, listener) {
        if (eventName === 'connect') {
            return this.connection.addListener('secureConnect', listener);
        }
        else {
            return this.connection.addListener(eventName, listener);
        }
    };
    TlsTransport.prototype.removeListener = function (eventName, listener) {
        if (eventName === 'connect') {
            return this.connection.removeListener('secureConnect', listener);
        }
        else {
            return this.connection.removeListener(eventName, listener);
        }
    };
    TlsTransport.prototype.write = function (data) {
        return this.connection.write(data);
    };
    TlsTransport.prototype.end = function () {
        return this.connection.end();
    };
    TlsTransport.prototype.emit = function (eventName) {
        if (eventName === 'connect') {
            this.connection.emit('secureConnect');
        }
        else {
            this.connection.emit(eventName);
        }
    };
    return TlsTransport;
}());
exports.default = TlsTransport;
//# sourceMappingURL=TlsTransport.js.map