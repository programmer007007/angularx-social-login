(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('rxjs'), require('@angular/common')) :
    typeof define === 'function' && define.amd ? define('angularx-social-login', ['exports', '@angular/core', 'rxjs', '@angular/common'], factory) :
    (global = global || self, factory(global['angularx-social-login'] = {}, global.ng.core, global.rxjs, global.ng.common));
}(this, (function (exports, core, rxjs, common) { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */
    /* global Reflect, Promise */

    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };

    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    var __assign = function() {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

    function __rest(s, e) {
        var t = {};
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
            t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
                if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                    t[p[i]] = s[p[i]];
            }
        return t;
    }

    function __decorate(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    }

    function __param(paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    }

    function __metadata(metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
    }

    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (_) try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0: case 1: t = op; break;
                    case 4: _.label++; return { value: op[1], done: false };
                    case 5: _.label++; y = op[1]; op = [0]; continue;
                    case 7: op = _.ops.pop(); _.trys.pop(); continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                        if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                        if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                        if (t[2]) _.ops.pop();
                        _.trys.pop(); continue;
                }
                op = body.call(thisArg, _);
            } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
            if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
        }
    }

    function __createBinding(o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        o[k2] = m[k];
    }

    function __exportStar(m, exports) {
        for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) exports[p] = m[p];
    }

    function __values(o) {
        var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
        if (m) return m.call(o);
        if (o && typeof o.length === "number") return {
            next: function () {
                if (o && i >= o.length) o = void 0;
                return { value: o && o[i++], done: !o };
            }
        };
        throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    }

    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m) return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
        }
        catch (error) { e = { error: error }; }
        finally {
            try {
                if (r && !r.done && (m = i["return"])) m.call(i);
            }
            finally { if (e) throw e.error; }
        }
        return ar;
    }

    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }

    function __spreadArrays() {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    };

    function __await(v) {
        return this instanceof __await ? (this.v = v, this) : new __await(v);
    }

    function __asyncGenerator(thisArg, _arguments, generator) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var g = generator.apply(thisArg, _arguments || []), i, q = [];
        return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
        function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
        function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
        function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
        function fulfill(value) { resume("next", value); }
        function reject(value) { resume("throw", value); }
        function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
    }

    function __asyncDelegator(o) {
        var i, p;
        return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
        function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
    }

    function __asyncValues(o) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var m = o[Symbol.asyncIterator], i;
        return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
        function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
        function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
    }

    function __makeTemplateObject(cooked, raw) {
        if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
        return cooked;
    };

    function __importStar(mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
        result.default = mod;
        return result;
    }

    function __importDefault(mod) {
        return (mod && mod.__esModule) ? mod : { default: mod };
    }

    function __classPrivateFieldGet(receiver, privateMap) {
        if (!privateMap.has(receiver)) {
            throw new TypeError("attempted to get private field on non-instance");
        }
        return privateMap.get(receiver);
    }

    function __classPrivateFieldSet(receiver, privateMap, value) {
        if (!privateMap.has(receiver)) {
            throw new TypeError("attempted to set private field on non-instance");
        }
        privateMap.set(receiver, value);
        return value;
    }

    /** @dynamic */
    var SocialAuthService = /** @class */ (function () {
        function SocialAuthService(config) {
            var _this = this;
            this.providers = new Map();
            this.autoLogin = false;
            this._user = null;
            this._authState = new rxjs.ReplaySubject(1);
            this.initialized = false;
            if (config instanceof Promise) {
                config.then(function (config) {
                    _this.initialize(config);
                });
            }
            else {
                this.initialize(config);
            }
        }
        SocialAuthService_1 = SocialAuthService;
        Object.defineProperty(SocialAuthService.prototype, "authState", {
            get: function () {
                return this._authState.asObservable();
            },
            enumerable: true,
            configurable: true
        });
        SocialAuthService.prototype.initialize = function (config) {
            var _this = this;
            this.autoLogin = config.autoLogin !== undefined ? config.autoLogin : false;
            config.providers.forEach(function (item) {
                _this.providers.set(item.id, item.provider);
            });
            Promise.all(Array.from(this.providers.values()).map(function (provider) {
                return provider.initialize();
            })).then(function () {
                _this.initialized = true;
                _this.providers.forEach(function (provider, key) {
                    if (_this.autoLogin) {
                        provider
                            .getLoginStatus()
                            .then(function (user) {
                            user.provider = key;
                            _this._user = user;
                            _this._authState.next(user);
                        })
                            .catch(console.debug);
                    }
                });
            });
        };
        SocialAuthService.prototype.signIn = function (providerId, signInOptions) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                if (!_this.initialized) {
                    reject(SocialAuthService_1.ERR_NOT_INITIALIZED);
                }
                else {
                    var providerObject = _this.providers.get(providerId);
                    if (providerObject) {
                        providerObject
                            .signIn(signInOptions)
                            .then(function (user) {
                            user.provider = providerId;
                            resolve(user);
                            _this._user = user;
                            _this._authState.next(user);
                        })
                            .catch(function (err) {
                            reject(err);
                        });
                    }
                    else {
                        reject(SocialAuthService_1.ERR_LOGIN_PROVIDER_NOT_FOUND);
                    }
                }
            });
        };
        SocialAuthService.prototype.signOut = function (revoke) {
            var _this = this;
            if (revoke === void 0) { revoke = false; }
            return new Promise(function (resolve, reject) {
                if (!_this.initialized) {
                    reject(SocialAuthService_1.ERR_NOT_INITIALIZED);
                }
                else if (!_this._user) {
                    reject(SocialAuthService_1.ERR_NOT_LOGGED_IN);
                }
                else {
                    var providerId = _this._user.provider;
                    var providerObject = _this.providers.get(providerId);
                    if (providerObject) {
                        providerObject
                            .signOut(revoke)
                            .then(function () {
                            resolve();
                            _this._user = null;
                            _this._authState.next(null);
                        })
                            .catch(function (err) {
                            reject(err);
                        });
                    }
                    else {
                        reject(SocialAuthService_1.ERR_LOGIN_PROVIDER_NOT_FOUND);
                    }
                }
            });
        };
        var SocialAuthService_1;
        SocialAuthService.ERR_LOGIN_PROVIDER_NOT_FOUND = 'Login provider not found';
        SocialAuthService.ERR_NOT_LOGGED_IN = 'Not logged in';
        SocialAuthService.ERR_NOT_INITIALIZED = 'Login providers not ready yet';
        SocialAuthService.ctorParameters = function () { return [
            { type: undefined, decorators: [{ type: core.Inject, args: ['SocialAuthServiceConfig',] }] }
        ]; };
        SocialAuthService = SocialAuthService_1 = __decorate([
            core.Injectable(),
            __param(0, core.Inject('SocialAuthServiceConfig'))
        ], SocialAuthService);
        return SocialAuthService;
    }());

    var SocialLoginModule = /** @class */ (function () {
        function SocialLoginModule(parentModule) {
            if (parentModule) {
                throw new Error('SocialLoginModule is already loaded. Import it in the AppModule only');
            }
        }
        SocialLoginModule_1 = SocialLoginModule;
        SocialLoginModule.initialize = function (config) {
            return {
                ngModule: SocialLoginModule_1,
                providers: [
                    SocialAuthService,
                    {
                        provide: 'SocialAuthServiceConfig',
                        useValue: config
                    }
                ]
            };
        };
        var SocialLoginModule_1;
        SocialLoginModule.ctorParameters = function () { return [
            { type: SocialLoginModule, decorators: [{ type: core.Optional }, { type: core.SkipSelf }] }
        ]; };
        SocialLoginModule = SocialLoginModule_1 = __decorate([
            core.NgModule({
                imports: [
                    common.CommonModule
                ],
                providers: [
                    SocialAuthService
                ]
            }),
            __param(0, core.Optional()), __param(0, core.SkipSelf())
        ], SocialLoginModule);
        return SocialLoginModule;
    }());

    var SocialUser = /** @class */ (function () {
        function SocialUser() {
        }
        return SocialUser;
    }());

    var BaseLoginProvider = /** @class */ (function () {
        function BaseLoginProvider() {
        }
        BaseLoginProvider.prototype.loadScript = function (id, src, onload, parentElement) {
            if (parentElement === void 0) { parentElement = null; }
            // get document if platform is only browser
            if (typeof document !== 'undefined' && !document.getElementById(id)) {
                var signInJS = document.createElement('script');
                signInJS.async = true;
                signInJS.src = src;
                signInJS.onload = onload;
                if (!parentElement) {
                    parentElement = document.head;
                }
                parentElement.appendChild(signInJS);
            }
        };
        return BaseLoginProvider;
    }());

    var GoogleLoginProvider = /** @class */ (function (_super) {
        __extends(GoogleLoginProvider, _super);
        function GoogleLoginProvider(clientId, initOptions) {
            if (initOptions === void 0) { initOptions = { scope: 'email' }; }
            var _this = _super.call(this) || this;
            _this.clientId = clientId;
            _this.initOptions = initOptions;
            return _this;
        }
        GoogleLoginProvider.prototype.initialize = function () {
            var _this = this;
            return new Promise(function (resolve, reject) {
                _this.loadScript(GoogleLoginProvider.PROVIDER_ID, 'https://apis.google.com/js/platform.js', function () {
                    gapi.load('auth2', function () {
                        _this.auth2 = gapi.auth2.init(__assign(__assign({}, _this.initOptions), { client_id: _this.clientId }));
                        _this.auth2
                            .then(function () {
                            resolve();
                        })
                            .catch(function (err) {
                            reject(err);
                        });
                    });
                });
            });
        };
        GoogleLoginProvider.prototype.getLoginStatus = function () {
            var _this = this;
            return new Promise(function (resolve, reject) {
                if (_this.auth2.isSignedIn.get()) {
                    var user = new SocialUser();
                    var profile = _this.auth2.currentUser.get().getBasicProfile();
                    var token = _this.auth2.currentUser.get().getAuthResponse(true)
                        .access_token;
                    var backendToken = _this.auth2.currentUser.get().getAuthResponse(true)
                        .id_token;
                    user.id = profile.getId();
                    user.name = profile.getName();
                    user.email = profile.getEmail();
                    user.photoUrl = profile.getImageUrl();
                    user.firstName = profile.getGivenName();
                    user.lastName = profile.getFamilyName();
                    user.authToken = token;
                    user.idToken = backendToken;
                    resolve(user);
                }
                else {
                    reject('No user is currently logged in.');
                }
            });
        };
        GoogleLoginProvider.prototype.signIn = function (signInOptions) {
            var _this = this;
            var options = __assign(__assign({}, this.initOptions), signInOptions);
            return new Promise(function (resolve, reject) {
                var offlineAccess = options && options.offline_access;
                var promise = !offlineAccess
                    ? _this.auth2.signIn(signInOptions)
                    : _this.auth2.grantOfflineAccess(signInOptions);
                promise
                    .then(function (response) {
                    var user = new SocialUser();
                    var profile = _this.auth2.currentUser.get().getBasicProfile();
                    var token = _this.auth2.currentUser.get().getAuthResponse(true)
                        .access_token;
                    var backendToken = _this.auth2.currentUser
                        .get()
                        .getAuthResponse(true).id_token;
                    user.id = profile.getId();
                    user.name = profile.getName();
                    user.email = profile.getEmail();
                    user.photoUrl = profile.getImageUrl();
                    user.firstName = profile.getGivenName();
                    user.lastName = profile.getFamilyName();
                    user.authToken = token;
                    user.idToken = backendToken;
                    if (response && response.code) {
                        user.authorizationCode = response.code;
                    }
                    resolve(user);
                }, function (closed) {
                    reject(closed);
                })
                    .catch(function (err) {
                    reject(err);
                });
            });
        };
        GoogleLoginProvider.prototype.signOut = function (revoke) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var signOutPromise;
                if (revoke) {
                    signOutPromise = _this.auth2.disconnect();
                }
                else {
                    signOutPromise = _this.auth2.signOut();
                }
                signOutPromise
                    .then(function (err) {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve();
                    }
                })
                    .catch(function (err) {
                    reject(err);
                });
            });
        };
        GoogleLoginProvider.PROVIDER_ID = 'GOOGLE';
        return GoogleLoginProvider;
    }(BaseLoginProvider));

    var FacebookLoginProvider = /** @class */ (function (_super) {
        __extends(FacebookLoginProvider, _super);
        function FacebookLoginProvider(clientId, initOptions) {
            if (initOptions === void 0) { initOptions = {
                scope: 'email,public_profile',
                locale: 'en_US',
                fields: 'name,email,picture,first_name,last_name',
                version: 'v4.0',
            }; }
            var _this = _super.call(this) || this;
            _this.clientId = clientId;
            _this.initOptions = initOptions;
            return _this;
        }
        FacebookLoginProvider.prototype.initialize = function () {
            var _this = this;
            return new Promise(function (resolve, reject) {
                _this.loadScript(FacebookLoginProvider.PROVIDER_ID, "//connect.facebook.net/" + _this.initOptions.locale + "/sdk.js", function () {
                    FB.init({
                        appId: _this.clientId,
                        autoLogAppEvents: true,
                        cookie: true,
                        xfbml: true,
                        version: _this.initOptions.version,
                    });
                    resolve();
                });
            });
        };
        FacebookLoginProvider.prototype.getLoginStatus = function () {
            var _this = this;
            return new Promise(function (resolve, reject) {
                FB.getLoginStatus(function (response) {
                    if (response.status === 'connected') {
                        var authResponse_1 = response.authResponse;
                        FB.api("/me?fields=" + _this.initOptions.fields, function (fbUser) {
                            var user = new SocialUser();
                            user.id = fbUser.id;
                            user.name = fbUser.name;
                            user.email = fbUser.email;
                            user.photoUrl =
                                'https://graph.facebook.com/' +
                                    fbUser.id +
                                    '/picture?type=normal';
                            user.firstName = fbUser.first_name;
                            user.lastName = fbUser.last_name;
                            user.authToken = authResponse_1.accessToken;
                            user.facebook = fbUser;
                            resolve(user);
                        });
                    }
                    else {
                        reject('No user is currently logged in.');
                    }
                });
            });
        };
        FacebookLoginProvider.prototype.signIn = function (signInOptions) {
            var options = __assign(__assign({}, this.initOptions), signInOptions);
            return new Promise(function (resolve, reject) {
                FB.login(function (response) {
                    if (response.authResponse) {
                        var authResponse_2 = response.authResponse;
                        FB.api("/me?fields=" + options.fields, function (fbUser) {
                            var user = new SocialUser();
                            user.id = fbUser.id;
                            user.name = fbUser.name;
                            user.email = fbUser.email;
                            user.photoUrl =
                                'https://graph.facebook.com/' +
                                    fbUser.id +
                                    '/picture?type=normal';
                            user.firstName = fbUser.first_name;
                            user.lastName = fbUser.last_name;
                            user.authToken = authResponse_2.accessToken;
                            user.facebook = fbUser;
                            resolve(user);
                        });
                    }
                    else {
                        reject('User cancelled login or did not fully authorize.');
                    }
                }, options);
            });
        };
        FacebookLoginProvider.prototype.signOut = function () {
            return new Promise(function (resolve, reject) {
                FB.logout(function (response) {
                    resolve();
                });
            });
        };
        FacebookLoginProvider.PROVIDER_ID = 'FACEBOOK';
        return FacebookLoginProvider;
    }(BaseLoginProvider));

    var AmazonLoginProvider = /** @class */ (function (_super) {
        __extends(AmazonLoginProvider, _super);
        function AmazonLoginProvider(clientId, initOptions) {
            if (initOptions === void 0) { initOptions = {
                scope: 'profile',
                scope_data: {
                    profile: { essential: false },
                },
                redirect_uri: location.origin,
            }; }
            var _this = _super.call(this) || this;
            _this.clientId = clientId;
            _this.initOptions = initOptions;
            return _this;
        }
        AmazonLoginProvider.prototype.initialize = function () {
            var _this = this;
            var amazonRoot = null;
            if (document) {
                amazonRoot = document.createElement('div');
                amazonRoot.id = 'amazon-root';
                document.body.appendChild(amazonRoot);
            }
            window.onAmazonLoginReady = function () {
                amazon.Login.setClientId(_this.clientId);
            };
            return new Promise(function (resolve, reject) {
                _this.loadScript('amazon-login-sdk', 'https://assets.loginwithamazon.com/sdk/na/login1.js', function () {
                    resolve();
                }, amazonRoot);
            });
        };
        AmazonLoginProvider.prototype.getLoginStatus = function () {
            return new Promise(function (resolve, reject) {
                amazon.Login.retrieveProfile('', function (response) {
                    if (response.success) {
                        var user = new SocialUser();
                        user.id = response.profile.CustomerId;
                        user.name = response.profile.Name;
                        user.email = response.profile.PrimaryEmail;
                        resolve(user);
                    }
                    else {
                        reject(response.error);
                    }
                });
            });
        };
        AmazonLoginProvider.prototype.signIn = function (signInOptions) {
            var options = __assign(__assign({}, this.initOptions), signInOptions);
            return new Promise(function (resolve, reject) {
                amazon.Login.authorize(options, function (authResponse) {
                    if (authResponse.error) {
                        reject(authResponse.error);
                    }
                    else {
                        amazon.Login.retrieveProfile(authResponse.access_token, function (response) {
                            var user = new SocialUser();
                            user.id = response.profile.CustomerId;
                            user.name = response.profile.Name;
                            user.email = response.profile.PrimaryEmail;
                            user.authToken = authResponse.access_token;
                            resolve(user);
                        });
                    }
                });
            });
        };
        AmazonLoginProvider.prototype.signOut = function (revoke) {
            return new Promise(function (resolve, reject) {
                try {
                    amazon.Login.logout();
                    resolve();
                }
                catch (err) {
                    reject(err.message);
                }
            });
        };
        AmazonLoginProvider.PROVIDER_ID = 'AMAZON';
        return AmazonLoginProvider;
    }(BaseLoginProvider));

    exports.AmazonLoginProvider = AmazonLoginProvider;
    exports.FacebookLoginProvider = FacebookLoginProvider;
    exports.GoogleLoginProvider = GoogleLoginProvider;
    exports.SocialAuthService = SocialAuthService;
    exports.SocialLoginModule = SocialLoginModule;
    exports.SocialUser = SocialUser;
    exports.??a = BaseLoginProvider;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=angularx-social-login.umd.js.map
