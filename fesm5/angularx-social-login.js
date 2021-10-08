import { __decorate, __param, __extends, __assign } from 'tslib';
import { Inject, Injectable, Optional, SkipSelf, NgModule } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { CommonModule } from '@angular/common';

/** @dynamic */
var SocialAuthService = /** @class */ (function () {
    function SocialAuthService(config) {
        var _this = this;
        this.providers = new Map();
        this.autoLogin = false;
        this._user = null;
        this._authState = new ReplaySubject(1);
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
        { type: undefined, decorators: [{ type: Inject, args: ['SocialAuthServiceConfig',] }] }
    ]; };
    SocialAuthService = SocialAuthService_1 = __decorate([
        Injectable(),
        __param(0, Inject('SocialAuthServiceConfig'))
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
        { type: SocialLoginModule, decorators: [{ type: Optional }, { type: SkipSelf }] }
    ]; };
    SocialLoginModule = SocialLoginModule_1 = __decorate([
        NgModule({
            imports: [
                CommonModule
            ],
            providers: [
                SocialAuthService
            ]
        }),
        __param(0, Optional()), __param(0, SkipSelf())
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

/**
 * Generated bundle index. Do not edit.
 */

export { AmazonLoginProvider, FacebookLoginProvider, GoogleLoginProvider, SocialAuthService, SocialLoginModule, SocialUser, BaseLoginProvider as ɵa };
//# sourceMappingURL=angularx-social-login.js.map
