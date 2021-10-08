import { __decorate, __param } from "tslib";
import { Injectable, Inject } from '@angular/core';
import { ReplaySubject } from 'rxjs';
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
export { SocialAuthService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhcngtc29jaWFsLWxvZ2luLyIsInNvdXJjZXMiOlsiYXV0aC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNuRCxPQUFPLEVBQWMsYUFBYSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBU2pELGVBQWU7QUFFZjtJQWtCRSwyQkFBK0MsTUFBa0U7UUFBakgsaUJBUUM7UUFwQk8sY0FBUyxHQUErQixJQUFJLEdBQUcsRUFBRSxDQUFDO1FBQ2xELGNBQVMsR0FBRyxLQUFLLENBQUM7UUFFbEIsVUFBSyxHQUFlLElBQUksQ0FBQztRQUN6QixlQUFVLEdBQThCLElBQUksYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRTdELGdCQUFXLEdBQUcsS0FBSyxDQUFDO1FBTzFCLElBQUksTUFBTSxZQUFZLE9BQU8sRUFBRTtZQUM3QixNQUFNLENBQUMsSUFBSSxDQUFDLFVBQUMsTUFBTTtnQkFDakIsS0FBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUMxQixDQUFDLENBQUMsQ0FBQztTQUNKO2FBQU07WUFDTCxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1NBQ3pCO0lBQ0gsQ0FBQzswQkExQlUsaUJBQWlCO0lBYzVCLHNCQUFJLHdDQUFTO2FBQWI7WUFDRSxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDeEMsQ0FBQzs7O09BQUE7SUFZTyxzQ0FBVSxHQUFsQixVQUFtQixNQUErQjtRQUFsRCxpQkE0QkM7UUEzQkMsSUFBSSxDQUFDLFNBQVMsR0FBRyxNQUFNLENBQUMsU0FBUyxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO1FBRTNFLE1BQU0sQ0FBQyxTQUFT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QUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDO2dCQUNwRCxJQUFJLGNBQWMsRUFBRTtvQkFDbEIsY0FBYzt5QkFDWCxPQUFPLENBQUMsTUFBTSxDQUFDO3lCQUNmLElBQUksQ0FBQzt3QkFDSixPQUFPLEVBQUUsQ0FBQzt3QkFFVixLQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQzt3QkFDbEIsS0FBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7b0JBQzdCLENBQUMsQ0FBQzt5QkFDRCxLQUFLLENBQUMsVUFBQyxHQUFHO3dCQUNULE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztvQkFDZCxDQUFDLENBQUMsQ0FBQztpQkFDTjtxQkFBTTtvQkFDTCxNQUFNLENBQUMsbUJBQWlCLENBQUMsNEJBQTRCLENBQUMsQ0FBQztpQkFDeEQ7YUFDRjtRQUNILENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQzs7SUE3R3VCLDhDQUE0QixHQUNsRCwwQkFBMEIsQ0FBQztJQUNMLG1DQUFpQixHQUFHLGVBQWUsQ0FBQztJQUNwQyxxQ0FBbUIsR0FBRywrQkFBK0IsQ0FBQzs7Z0RBY2pFLE1BQU0sU0FBQyx5QkFBeUI7O0lBbEJsQyxpQkFBaUI7UUFEN0IsVUFBVSxFQUFFO1FBbUJFLFdBQUEsTUFBTSxDQUFDLHlCQUF5QixDQUFDLENBQUE7T0FsQm5DLGlCQUFpQixDQStHN0I7SUFBRCx3QkFBQztDQUFBLEFBL0dELElBK0dDO1NBL0dZLGlCQUFpQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUsIEluamVjdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBSZXBsYXlTdWJqZWN0IH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IExvZ2luUHJvdmlkZXIgfSBmcm9tICcuL2VudGl0aWVzL2xvZ2luLXByb3ZpZGVyJztcclxuaW1wb3J0IHsgU29jaWFsVXNlciB9IGZyb20gJy4vZW50aXRpZXMvc29jaWFsLXVzZXInO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBTb2NpYWxBdXRoU2VydmljZUNvbmZpZyB7XHJcbiAgYXV0b0xvZ2luPzogYm9vbGVhbjtcclxuICBwcm92aWRlcnM6IHsgaWQ6IHN0cmluZzsgcHJvdmlkZXI6IExvZ2luUHJvdmlkZXIgfVtdO1xyXG59XHJcblxyXG4vKiogQGR5bmFtaWMgKi9cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgU29jaWFsQXV0aFNlcnZpY2Uge1xyXG4gIHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IEVSUl9MT0dJTl9QUk9WSURFUl9OT1RfRk9VTkQgPVxyXG4gICAgJ0xvZ2luIHByb3ZpZGVyIG5vdCBmb3VuZCc7XHJcbiAgcHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgRVJSX05PVF9MT0dHRURfSU4gPSAnTm90IGxvZ2dlZCBpbic7XHJcbiAgcHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgRVJSX05PVF9JTklUSUFMSVpFRCA9ICdMb2dpbiBwcm92aWRlcnMgbm90IHJlYWR5IHlldCc7XHJcblxyXG4gIHByaXZhdGUgcHJvdmlkZXJzOiBNYXA8c3RyaW5nLCBMb2dpblByb3ZpZGVyPiA9IG5ldyBNYXAoKTtcclxuICBwcml2YXRlIGF1dG9Mb2dpbiA9IGZhbHNlO1xyXG5cclxuICBwcml2YXRlIF91c2VyOiBTb2NpYWxVc2VyID0gbnVsbDtcclxuICBwcml2YXRlIF9hdXRoU3RhdGU6IFJlcGxheVN1YmplY3Q8U29jaWFsVXNlcj4gPSBuZXcgUmVwbGF5U3ViamVjdCgxKTtcclxuXHJcbiAgcHJpdmF0ZSBpbml0aWFsaXplZCA9IGZhbHNlO1xyXG5cclxuICBnZXQgYXV0aFN0YXRlKCk6IE9ic2VydmFibGU8U29jaWFsVXNlcj4ge1xyXG4gICAgcmV0dXJuIHRoaXMuX2F1dGhTdGF0ZS5hc09ic2VydmFibGUoKTtcclxuICB9XHJcblxyXG4gIGNvbnN0cnVjdG9yKEBJbmplY3QoJ1NvY2lhbEF1dGhTZXJ2aWNlQ29uZmlnJykgY29uZmlnOiBTb2NpYWxBdXRoU2VydmljZUNvbmZpZyB8IFByb21pc2U8U29jaWFsQXV0aFNlcnZpY2VDb25maWc+KSB7XHJcbiAgICBpZiAoY29uZmlnIGluc3RhbmNlb2YgUHJvbWlzZSkge1xyXG4gICAgICBjb25maWcudGhlbigoY29uZmlnKSA9PiB7XHJcbiAgICAgICAgdGhpcy5pbml0aWFsaXplKGNvbmZpZyk7XHJcbiAgICAgIH0pO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5pbml0aWFsaXplKGNvbmZpZyk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGluaXRpYWxpemUoY29uZmlnOiBTb2NpYWxBdXRoU2VydmljZUNvbmZpZykge1xyXG4gICAgdGhpcy5hdXRvTG9naW4gPSBjb25maWcuYXV0b0xvZ2luICE9PSB1bmRlZmluZWQgPyBjb25maWcuYXV0b0xvZ2luIDogZmFsc2U7XHJcblxyXG4gICAgY29uZmlnLnByb3ZpZGVycy5mb3JFYWNoKChpdGVtKSA9PiB7XHJcbiAgICAgIHRoaXMucHJvdmlkZXJzLnNldChpdGVtLmlkLCBpdGVtLnByb3ZpZGVyKTtcclxuICAgIH0pO1xyXG5cclxuICAgIFByb21pc2UuYWxsKFxyXG4gICAgICBBcnJheS5mcm9tKHRoaXMucHJvdmlkZXJzLnZhbHVlcygpKS5tYXAoKHByb3ZpZGVyKSA9PlxyXG4gICAgICAgIHByb3ZpZGVyLmluaXRpYWxpemUoKVxyXG4gICAgICApXHJcbiAgICApLnRoZW4oKCkgPT4ge1xyXG4gICAgICB0aGlzLmluaXRpYWxpemVkID0gdHJ1ZTtcclxuXHJcbiAgICAgIHRoaXMucHJvdmlkZXJzLmZvckVhY2goKHByb3ZpZGVyOiBMb2dpblByb3ZpZGVyLCBrZXk6IHN0cmluZykgPT4ge1xyXG4gICAgICAgIGlmICh0aGlzLmF1dG9Mb2dpbikge1xyXG4gICAgICAgICAgcHJvdmlkZXJcclxuICAgICAgICAgICAgLmdldExvZ2luU3RhdHVzKClcclxuICAgICAgICAgICAgLnRoZW4oKHVzZXI6IFNvY2lhbFVzZXIpID0+IHtcclxuICAgICAgICAgICAgICB1c2VyLnByb3ZpZGVyID0ga2V5O1xyXG5cclxuICAgICAgICAgICAgICB0aGlzLl91c2VyID0gdXNlcjtcclxuICAgICAgICAgICAgICB0aGlzLl9hdXRoU3RhdGUubmV4dCh1c2VyKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLmNhdGNoKGNvbnNvbGUuZGVidWcpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHNpZ25Jbihwcm92aWRlcklkOiBzdHJpbmcsIHNpZ25Jbk9wdGlvbnM/OiBhbnkpOiBQcm9taXNlPFNvY2lhbFVzZXI+IHtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgIGlmICghdGhpcy5pbml0aWFsaXplZCkge1xyXG4gICAgICAgIHJlamVjdChTb2NpYWxBdXRoU2VydmljZS5FUlJfTk9UX0lOSVRJQUxJWkVEKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBsZXQgcHJvdmlkZXJPYmplY3QgPSB0aGlzLnByb3ZpZGVycy5nZXQocHJvdmlkZXJJZCk7XHJcbiAgICAgICAgaWYgKHByb3ZpZGVyT2JqZWN0KSB7XHJcbiAgICAgICAgICBwcm92aWRlck9iamVjdFxyXG4gICAgICAgICAgICAuc2lnbkluKHNpZ25Jbk9wdGlvbnMpXHJcbiAgICAgICAgICAgIC50aGVuKCh1c2VyOiBTb2NpYWxVc2VyKSA9PiB7XHJcbiAgICAgICAgICAgICAgdXNlci5wcm92aWRlciA9IHByb3ZpZGVySWQ7XHJcbiAgICAgICAgICAgICAgcmVzb2x2ZSh1c2VyKTtcclxuXHJcbiAgICAgICAgICAgICAgdGhpcy5fdXNlciA9IHVzZXI7XHJcbiAgICAgICAgICAgICAgdGhpcy5fYXV0aFN0YXRlLm5leHQodXNlcik7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5jYXRjaCgoZXJyKSA9PiB7XHJcbiAgICAgICAgICAgICAgcmVqZWN0KGVycik7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICByZWplY3QoU29jaWFsQXV0aFNlcnZpY2UuRVJSX0xPR0lOX1BST1ZJREVSX05PVF9GT1VORCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHNpZ25PdXQocmV2b2tlOiBib29sZWFuID0gZmFsc2UpOiBQcm9taXNlPGFueT4ge1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgaWYgKCF0aGlzLmluaXRpYWxpemVkKSB7XHJcbiAgICAgICAgcmVqZWN0KFNvY2lhbEF1dGhTZXJ2aWNlLkVSUl9OT1RfSU5JVElBTElaRUQpO1xyXG4gICAgICB9IGVsc2UgaWYgKCF0aGlzLl91c2VyKSB7XHJcbiAgICAgICAgcmVqZWN0KFNvY2lhbEF1dGhTZXJ2aWNlLkVSUl9OT1RfTE9HR0VEX0lOKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBsZXQgcHJvdmlkZXJJZCA9IHRoaXMuX3VzZXIucHJvdmlkZXI7XHJcbiAgICAgICAgbGV0IHByb3ZpZGVyT2JqZWN0ID0gdGhpcy5wcm92aWRlcnMuZ2V0KHByb3ZpZGVySWQpO1xyXG4gICAgICAgIGlmIChwcm92aWRlck9iamVjdCkge1xyXG4gICAgICAgICAgcHJvdmlkZXJPYmplY3RcclxuICAgICAgICAgICAgLnNpZ25PdXQocmV2b2tlKVxyXG4gICAgICAgICAgICAudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xyXG5cclxuICAgICAgICAgICAgICB0aGlzLl91c2VyID0gbnVsbDtcclxuICAgICAgICAgICAgICB0aGlzLl9hdXRoU3RhdGUubmV4dChudWxsKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLmNhdGNoKChlcnIpID0+IHtcclxuICAgICAgICAgICAgICByZWplY3QoZXJyKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHJlamVjdChTb2NpYWxBdXRoU2VydmljZS5FUlJfTE9HSU5fUFJPVklERVJfTk9UX0ZPVU5EKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxufVxyXG4iXX0=