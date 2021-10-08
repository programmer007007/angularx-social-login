import { __decorate, __param } from 'tslib';
import { Inject, Injectable, Optional, SkipSelf, NgModule } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { CommonModule } from '@angular/common';

import * as ɵngcc0 from '@angular/core';
var SocialAuthService_1;
/** @dynamic */
let SocialAuthService = SocialAuthService_1 = class SocialAuthService {
    constructor(config) {
        this.providers = new Map();
        this.autoLogin = false;
        this._user = null;
        this._authState = new ReplaySubject(1);
        this.initialized = false;
        if (config instanceof Promise) {
            config.then((config) => {
                this.initialize(config);
            });
        }
        else {
            this.initialize(config);
        }
    }
    get authState() {
        return this._authState.asObservable();
    }
    initialize(config) {
        this.autoLogin = config.autoLogin !== undefined ? config.autoLogin : false;
        config.providers.forEach((item) => {
            this.providers.set(item.id, item.provider);
        });
        Promise.all(Array.from(this.providers.values()).map((provider) => provider.initialize())).then(() => {
            this.initialized = true;
            this.providers.forEach((provider, key) => {
                if (this.autoLogin) {
                    provider
                        .getLoginStatus()
                        .then((user) => {
                        user.provider = key;
                        this._user = user;
                        this._authState.next(user);
                    })
                        .catch(console.debug);
                }
            });
        });
    }
    signIn(providerId, signInOptions) {
        return new Promise((resolve, reject) => {
            if (!this.initialized) {
                reject(SocialAuthService_1.ERR_NOT_INITIALIZED);
            }
            else {
                let providerObject = this.providers.get(providerId);
                if (providerObject) {
                    providerObject
                        .signIn(signInOptions)
                        .then((user) => {
                        user.provider = providerId;
                        resolve(user);
                        this._user = user;
                        this._authState.next(user);
                    })
                        .catch((err) => {
                        reject(err);
                    });
                }
                else {
                    reject(SocialAuthService_1.ERR_LOGIN_PROVIDER_NOT_FOUND);
                }
            }
        });
    }
    signOut(revoke = false) {
        return new Promise((resolve, reject) => {
            if (!this.initialized) {
                reject(SocialAuthService_1.ERR_NOT_INITIALIZED);
            }
            else if (!this._user) {
                reject(SocialAuthService_1.ERR_NOT_LOGGED_IN);
            }
            else {
                let providerId = this._user.provider;
                let providerObject = this.providers.get(providerId);
                if (providerObject) {
                    providerObject
                        .signOut(revoke)
                        .then(() => {
                        resolve();
                        this._user = null;
                        this._authState.next(null);
                    })
                        .catch((err) => {
                        reject(err);
                    });
                }
                else {
                    reject(SocialAuthService_1.ERR_LOGIN_PROVIDER_NOT_FOUND);
                }
            }
        });
    }
};
SocialAuthService.ɵfac = function SocialAuthService_Factory(t) { return new (t || SocialAuthService)(ɵngcc0.ɵɵinject('SocialAuthServiceConfig')); };
SocialAuthService.ɵprov = ɵngcc0.ɵɵdefineInjectable({ token: SocialAuthService, factory: function (t) { return SocialAuthService.ɵfac(t); } });
SocialAuthService.ERR_LOGIN_PROVIDER_NOT_FOUND = 'Login provider not found';
SocialAuthService.ERR_NOT_LOGGED_IN = 'Not logged in';
SocialAuthService.ERR_NOT_INITIALIZED = 'Login providers not ready yet';
SocialAuthService.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: ['SocialAuthServiceConfig',] }] }
];
SocialAuthService = SocialAuthService_1 = __decorate([ __param(0, Inject('SocialAuthServiceConfig'))
], SocialAuthService);

var SocialLoginModule_1;
let SocialLoginModule = SocialLoginModule_1 = class SocialLoginModule {
    constructor(parentModule) {
        if (parentModule) {
            throw new Error('SocialLoginModule is already loaded. Import it in the AppModule only');
        }
    }
    static initialize(config) {
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
    }
};
SocialLoginModule.ɵfac = function SocialLoginModule_Factory(t) { return new (t || SocialLoginModule)(ɵngcc0.ɵɵinject(SocialLoginModule, 12)); };
SocialLoginModule.ɵmod = ɵngcc0.ɵɵdefineNgModule({ type: SocialLoginModule });
SocialLoginModule.ɵinj = ɵngcc0.ɵɵdefineInjector({ providers: [
        SocialAuthService
    ], imports: [[
            CommonModule
        ]] });
SocialLoginModule.ctorParameters = () => [
    { type: SocialLoginModule, decorators: [{ type: Optional }, { type: SkipSelf }] }
];
SocialLoginModule = SocialLoginModule_1 = __decorate([ __param(0, Optional()), __param(0, SkipSelf())
], SocialLoginModule);
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && ɵngcc0.ɵsetClassMetadata(SocialAuthService, [{
        type: Injectable
    }], function () { return [{ type: undefined, decorators: [{
                type: Inject,
                args: ['SocialAuthServiceConfig']
            }] }]; }, null); })();
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && ɵngcc0.ɵɵsetNgModuleScope(SocialLoginModule, { imports: function () { return [CommonModule]; } }); })();
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && ɵngcc0.ɵsetClassMetadata(SocialLoginModule, [{
        type: NgModule,
        args: [{
                imports: [
                    CommonModule
                ],
                providers: [
                    SocialAuthService
                ]
            }]
    }], function () { return [{ type: SocialLoginModule, decorators: [{
                type: Optional
            }, {
                type: SkipSelf
            }] }]; }, null); })();

class SocialUser {
}

class BaseLoginProvider {
    constructor() { }
    loadScript(id, src, onload, parentElement = null) {
        // get document if platform is only browser
        if (typeof document !== 'undefined' && !document.getElementById(id)) {
            let signInJS = document.createElement('script');
            signInJS.async = true;
            signInJS.src = src;
            signInJS.onload = onload;
            if (!parentElement) {
                parentElement = document.head;
            }
            parentElement.appendChild(signInJS);
        }
    }
}

class GoogleLoginProvider extends BaseLoginProvider {
    constructor(clientId, initOptions = { scope: 'email' }) {
        super();
        this.clientId = clientId;
        this.initOptions = initOptions;
    }
    initialize() {
        return new Promise((resolve, reject) => {
            this.loadScript(GoogleLoginProvider.PROVIDER_ID, 'https://apis.google.com/js/platform.js', () => {
                gapi.load('auth2', () => {
                    this.auth2 = gapi.auth2.init(Object.assign(Object.assign({}, this.initOptions), { client_id: this.clientId }));
                    this.auth2
                        .then(() => {
                        resolve();
                    })
                        .catch((err) => {
                        reject(err);
                    });
                });
            });
        });
    }
    getLoginStatus() {
        return new Promise((resolve, reject) => {
            if (this.auth2.isSignedIn.get()) {
                let user = new SocialUser();
                let profile = this.auth2.currentUser.get().getBasicProfile();
                let token = this.auth2.currentUser.get().getAuthResponse(true)
                    .access_token;
                let backendToken = this.auth2.currentUser.get().getAuthResponse(true)
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
    }
    signIn(signInOptions) {
        const options = Object.assign(Object.assign({}, this.initOptions), signInOptions);
        return new Promise((resolve, reject) => {
            const offlineAccess = options && options.offline_access;
            let promise = !offlineAccess
                ? this.auth2.signIn(signInOptions)
                : this.auth2.grantOfflineAccess(signInOptions);
            promise
                .then((response) => {
                let user = new SocialUser();
                let profile = this.auth2.currentUser.get().getBasicProfile();
                let token = this.auth2.currentUser.get().getAuthResponse(true)
                    .access_token;
                let backendToken = this.auth2.currentUser
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
            }, (closed) => {
                reject(closed);
            })
                .catch((err) => {
                reject(err);
            });
        });
    }
    signOut(revoke) {
        return new Promise((resolve, reject) => {
            let signOutPromise;
            if (revoke) {
                signOutPromise = this.auth2.disconnect();
            }
            else {
                signOutPromise = this.auth2.signOut();
            }
            signOutPromise
                .then((err) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve();
                }
            })
                .catch((err) => {
                reject(err);
            });
        });
    }
}
GoogleLoginProvider.PROVIDER_ID = 'GOOGLE';

class FacebookLoginProvider extends BaseLoginProvider {
    constructor(clientId, initOptions = {
        scope: 'email,public_profile',
        locale: 'en_US',
        fields: 'name,email,picture,first_name,last_name',
        version: 'v4.0',
    }) {
        super();
        this.clientId = clientId;
        this.initOptions = initOptions;
    }
    initialize() {
        return new Promise((resolve, reject) => {
            this.loadScript(FacebookLoginProvider.PROVIDER_ID, `//connect.facebook.net/${this.initOptions.locale}/sdk.js`, () => {
                FB.init({
                    appId: this.clientId,
                    autoLogAppEvents: true,
                    cookie: true,
                    xfbml: true,
                    version: this.initOptions.version,
                });
                resolve();
            });
        });
    }
    getLoginStatus() {
        return new Promise((resolve, reject) => {
            FB.getLoginStatus((response) => {
                if (response.status === 'connected') {
                    let authResponse = response.authResponse;
                    FB.api(`/me?fields=${this.initOptions.fields}`, (fbUser) => {
                        let user = new SocialUser();
                        user.id = fbUser.id;
                        user.name = fbUser.name;
                        user.email = fbUser.email;
                        user.photoUrl =
                            'https://graph.facebook.com/' +
                                fbUser.id +
                                '/picture?type=normal';
                        user.firstName = fbUser.first_name;
                        user.lastName = fbUser.last_name;
                        user.authToken = authResponse.accessToken;
                        user.facebook = fbUser;
                        resolve(user);
                    });
                }
                else {
                    reject('No user is currently logged in.');
                }
            });
        });
    }
    signIn(signInOptions) {
        const options = Object.assign(Object.assign({}, this.initOptions), signInOptions);
        return new Promise((resolve, reject) => {
            FB.login((response) => {
                if (response.authResponse) {
                    let authResponse = response.authResponse;
                    FB.api(`/me?fields=${options.fields}`, (fbUser) => {
                        let user = new SocialUser();
                        user.id = fbUser.id;
                        user.name = fbUser.name;
                        user.email = fbUser.email;
                        user.photoUrl =
                            'https://graph.facebook.com/' +
                                fbUser.id +
                                '/picture?type=normal';
                        user.firstName = fbUser.first_name;
                        user.lastName = fbUser.last_name;
                        user.authToken = authResponse.accessToken;
                        user.facebook = fbUser;
                        resolve(user);
                    });
                }
                else {
                    reject('User cancelled login or did not fully authorize.');
                }
            }, options);
        });
    }
    signOut() {
        return new Promise((resolve, reject) => {
            FB.logout((response) => {
                resolve();
            });
        });
    }
}
FacebookLoginProvider.PROVIDER_ID = 'FACEBOOK';

class AmazonLoginProvider extends BaseLoginProvider {
    constructor(clientId, initOptions = {
        scope: 'profile',
        scope_data: {
            profile: { essential: false },
        },
        redirect_uri: location.origin,
    }) {
        super();
        this.clientId = clientId;
        this.initOptions = initOptions;
    }
    initialize() {
        let amazonRoot = null;
        if (document) {
            amazonRoot = document.createElement('div');
            amazonRoot.id = 'amazon-root';
            document.body.appendChild(amazonRoot);
        }
        window.onAmazonLoginReady = () => {
            amazon.Login.setClientId(this.clientId);
        };
        return new Promise((resolve, reject) => {
            this.loadScript('amazon-login-sdk', 'https://assets.loginwithamazon.com/sdk/na/login1.js', () => {
                resolve();
            }, amazonRoot);
        });
    }
    getLoginStatus() {
        return new Promise((resolve, reject) => {
            amazon.Login.retrieveProfile('', (response) => {
                if (response.success) {
                    let user = new SocialUser();
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
    }
    signIn(signInOptions) {
        const options = Object.assign(Object.assign({}, this.initOptions), signInOptions);
        return new Promise((resolve, reject) => {
            amazon.Login.authorize(options, (authResponse) => {
                if (authResponse.error) {
                    reject(authResponse.error);
                }
                else {
                    amazon.Login.retrieveProfile(authResponse.access_token, (response) => {
                        let user = new SocialUser();
                        user.id = response.profile.CustomerId;
                        user.name = response.profile.Name;
                        user.email = response.profile.PrimaryEmail;
                        user.authToken = authResponse.access_token;
                        resolve(user);
                    });
                }
            });
        });
    }
    signOut(revoke) {
        return new Promise((resolve, reject) => {
            try {
                amazon.Login.logout();
                resolve();
            }
            catch (err) {
                reject(err.message);
            }
        });
    }
}
AmazonLoginProvider.PROVIDER_ID = 'AMAZON';

/**
 * Generated bundle index. Do not edit.
 */

export { AmazonLoginProvider, FacebookLoginProvider, GoogleLoginProvider, SocialAuthService, SocialLoginModule, SocialUser, BaseLoginProvider as ɵa };

//# sourceMappingURL=angularx-social-login.js.map