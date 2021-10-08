var SocialAuthService_1;
import { __decorate, __param } from "tslib";
import { Injectable, Inject } from '@angular/core';
import { ReplaySubject } from 'rxjs';
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
SocialAuthService.ERR_LOGIN_PROVIDER_NOT_FOUND = 'Login provider not found';
SocialAuthService.ERR_NOT_LOGGED_IN = 'Not logged in';
SocialAuthService.ERR_NOT_INITIALIZED = 'Login providers not ready yet';
SocialAuthService.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: ['SocialAuthServiceConfig',] }] }
];
SocialAuthService = SocialAuthService_1 = __decorate([
    Injectable(),
    __param(0, Inject('SocialAuthServiceConfig'))
], SocialAuthService);
export { SocialAuthService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhcngtc29jaWFsLWxvZ2luLyIsInNvdXJjZXMiOlsiYXV0aC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDbkQsT0FBTyxFQUFjLGFBQWEsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQVNqRCxlQUFlO0FBRWYsSUFBYSxpQkFBaUIseUJBQTlCLE1BQWEsaUJBQWlCO0lBa0I1QixZQUErQyxNQUFrRTtRQVp6RyxjQUFTLEdBQStCLElBQUksR0FBRyxFQUFFLENBQUM7UUFDbEQsY0FBUyxHQUFHLEtBQUssQ0FBQztRQUVsQixVQUFLLEdBQWUsSUFBSSxDQUFDO1FBQ3pCLGVBQVUsR0FBOEIsSUFBSSxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFN0QsZ0JBQVcsR0FBRyxLQUFLLENBQUM7UUFPMUIsSUFBSSxNQUFNLFlBQVksT0FBTyxFQUFFO1lBQzdCLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLEVBQUUsRUFBRTtnQkFDckIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUMxQixDQUFDLENBQUMsQ0FBQztTQUNKO2FBQU07WUFDTCxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1NBQ3pCO0lBQ0gsQ0FBQztJQVpELElBQUksU0FBUztRQUNYLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUN4QyxDQUFDO0lBWU8sVUFBVSxDQUFDLE1BQStCO1FBQ2hELElBQUksQ0FBQyxTQUFTLEdBQUcsTUFBTSxDQUFDLFNBQVMsS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQztRQUUzRSxNQUFNLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFD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R0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDO2dCQUNwRCxJQUFJLGNBQWMsRUFBRTtvQkFDbEIsY0FBYzt5QkFDWCxPQUFPLENBQUMsTUFBTSxDQUFDO3lCQUNmLElBQUksQ0FBQyxHQUFHLEVBQUU7d0JBQ1QsT0FBTyxFQUFFLENBQUM7d0JBRVYsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7d0JBQ2xCLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO29CQUM3QixDQUFDLENBQUM7eUJBQ0QsS0FBSyxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUU7d0JBQ2IsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO29CQUNkLENBQUMsQ0FBQyxDQUFDO2lCQUNOO3FCQUFNO29CQUNMLE1BQU0sQ0FBQyxtQkFBaUIsQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDO2lCQUN4RDthQUNGO1FBQ0gsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0NBQ0YsQ0FBQTtBQTlHeUIsOENBQTRCLEdBQ2xELDBCQUEwQixDQUFDO0FBQ0wsbUNBQWlCLEdBQUcsZUFBZSxDQUFDO0FBQ3BDLHFDQUFtQixHQUFHLCtCQUErQixDQUFDOzs0Q0FjakUsTUFBTSxTQUFDLHlCQUF5Qjs7QUFsQmxDLGlCQUFpQjtJQUQ3QixVQUFVLEVBQUU7SUFtQkUsV0FBQSxNQUFNLENBQUMseUJBQXlCLENBQUMsQ0FBQTtHQWxCbkMsaUJBQWlCLENBK0c3QjtTQS9HWSxpQkFBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlLCBJbmplY3QgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgUmVwbGF5U3ViamVjdCB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBMb2dpblByb3ZpZGVyIH0gZnJvbSAnLi9lbnRpdGllcy9sb2dpbi1wcm92aWRlcic7XHJcbmltcG9ydCB7IFNvY2lhbFVzZXIgfSBmcm9tICcuL2VudGl0aWVzL3NvY2lhbC11c2VyJztcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgU29jaWFsQXV0aFNlcnZpY2VDb25maWcge1xyXG4gIGF1dG9Mb2dpbj86IGJvb2xlYW47XHJcbiAgcHJvdmlkZXJzOiB7IGlkOiBzdHJpbmc7IHByb3ZpZGVyOiBMb2dpblByb3ZpZGVyIH1bXTtcclxufVxyXG5cclxuLyoqIEBkeW5hbWljICovXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIFNvY2lhbEF1dGhTZXJ2aWNlIHtcclxuICBwcml2YXRlIHN0YXRpYyByZWFkb25seSBFUlJfTE9HSU5fUFJPVklERVJfTk9UX0ZPVU5EID1cclxuICAgICdMb2dpbiBwcm92aWRlciBub3QgZm91bmQnO1xyXG4gIHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IEVSUl9OT1RfTE9HR0VEX0lOID0gJ05vdCBsb2dnZWQgaW4nO1xyXG4gIHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IEVSUl9OT1RfSU5JVElBTElaRUQgPSAnTG9naW4gcHJvdmlkZXJzIG5vdCByZWFkeSB5ZXQnO1xyXG5cclxuICBwcml2YXRlIHByb3ZpZGVyczogTWFwPHN0cmluZywgTG9naW5Qcm92aWRlcj4gPSBuZXcgTWFwKCk7XHJcbiAgcHJpdmF0ZSBhdXRvTG9naW4gPSBmYWxzZTtcclxuXHJcbiAgcHJpdmF0ZSBfdXNlcjogU29jaWFsVXNlciA9IG51bGw7XHJcbiAgcHJpdmF0ZSBfYXV0aFN0YXRlOiBSZXBsYXlTdWJqZWN0PFNvY2lhbFVzZXI+ID0gbmV3IFJlcGxheVN1YmplY3QoMSk7XHJcblxyXG4gIHByaXZhdGUgaW5pdGlhbGl6ZWQgPSBmYWxzZTtcclxuXHJcbiAgZ2V0IGF1dGhTdGF0ZSgpOiBPYnNlcnZhYmxlPFNvY2lhbFVzZXI+IHtcclxuICAgIHJldHVybiB0aGlzLl9hdXRoU3RhdGUuYXNPYnNlcnZhYmxlKCk7XHJcbiAgfVxyXG5cclxuICBjb25zdHJ1Y3RvcihASW5qZWN0KCdTb2NpYWxBdXRoU2VydmljZUNvbmZpZycpIGNvbmZpZzogU29jaWFsQXV0aFNlcnZpY2VDb25maWcgfCBQcm9taXNlPFNvY2lhbEF1dGhTZXJ2aWNlQ29uZmlnPikge1xyXG4gICAgaWYgKGNvbmZpZyBpbnN0YW5jZW9mIFByb21pc2UpIHtcclxuICAgICAgY29uZmlnLnRoZW4oKGNvbmZpZykgPT4ge1xyXG4gICAgICAgIHRoaXMuaW5pdGlhbGl6ZShjb25maWcpO1xyXG4gICAgICB9KTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuaW5pdGlhbGl6ZShjb25maWcpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBpbml0aWFsaXplKGNvbmZpZzogU29jaWFsQXV0aFNlcnZpY2VDb25maWcpIHtcclxuICAgIHRoaXMuYXV0b0xvZ2luID0gY29uZmlnLmF1dG9Mb2dpbiAhPT0gdW5kZWZpbmVkID8gY29uZmlnLmF1dG9Mb2dpbiA6IGZhbHNlO1xyXG5cclxuICAgIGNvbmZpZy5wcm92aWRlcnMuZm9yRWFjaCgoaXRlbSkgPT4ge1xyXG4gICAgICB0aGlzLnByb3ZpZGVycy5zZXQoaXRlbS5pZCwgaXRlbS5wcm92aWRlcik7XHJcbiAgICB9KTtcclxuXHJcbiAgICBQcm9taXNlLmFsbChcclxuICAgICAgQXJyYXkuZnJvbSh0aGlzLnByb3ZpZGVycy52YWx1ZXMoKSkubWFwKChwcm92aWRlcikgPT5cclxuICAgICAgICBwcm92aWRlci5pbml0aWFsaXplKClcclxuICAgICAgKVxyXG4gICAgKS50aGVuKCgpID0+IHtcclxuICAgICAgdGhpcy5pbml0aWFsaXplZCA9IHRydWU7XHJcblxyXG4gICAgICB0aGlzLnByb3ZpZGVycy5mb3JFYWNoKChwcm92aWRlcjogTG9naW5Qcm92aWRlciwga2V5OiBzdHJpbmcpID0+IHtcclxuICAgICAgICBpZiAodGhpcy5hdXRvTG9naW4pIHtcclxuICAgICAgICAgIHByb3ZpZGVyXHJcbiAgICAgICAgICAgIC5nZXRMb2dpblN0YXR1cygpXHJcbiAgICAgICAgICAgIC50aGVuKCh1c2VyOiBTb2NpYWxVc2VyKSA9PiB7XHJcbiAgICAgICAgICAgICAgdXNlci5wcm92aWRlciA9IGtleTtcclxuXHJcbiAgICAgICAgICAgICAgdGhpcy5fdXNlciA9IHVzZXI7XHJcbiAgICAgICAgICAgICAgdGhpcy5fYXV0aFN0YXRlLm5leHQodXNlcik7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5jYXRjaChjb25zb2xlLmRlYnVnKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBzaWduSW4ocHJvdmlkZXJJZDogc3RyaW5nLCBzaWduSW5PcHRpb25zPzogYW55KTogUHJvbWlzZTxTb2NpYWxVc2VyPiB7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICBpZiAoIXRoaXMuaW5pdGlhbGl6ZWQpIHtcclxuICAgICAgICByZWplY3QoU29jaWFsQXV0aFNlcnZpY2UuRVJSX05PVF9JTklUSUFMSVpFRCk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgbGV0IHByb3ZpZGVyT2JqZWN0ID0gdGhpcy5wcm92aWRlcnMuZ2V0KHByb3ZpZGVySWQpO1xyXG4gICAgICAgIGlmIChwcm92aWRlck9iamVjdCkge1xyXG4gICAgICAgICAgcHJvdmlkZXJPYmplY3RcclxuICAgICAgICAgICAgLnNpZ25JbihzaWduSW5PcHRpb25zKVxyXG4gICAgICAgICAgICAudGhlbigodXNlcjogU29jaWFsVXNlcikgPT4ge1xyXG4gICAgICAgICAgICAgIHVzZXIucHJvdmlkZXIgPSBwcm92aWRlcklkO1xyXG4gICAgICAgICAgICAgIHJlc29sdmUodXNlcik7XHJcblxyXG4gICAgICAgICAgICAgIHRoaXMuX3VzZXIgPSB1c2VyO1xyXG4gICAgICAgICAgICAgIHRoaXMuX2F1dGhTdGF0ZS5uZXh0KHVzZXIpO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAuY2F0Y2goKGVycikgPT4ge1xyXG4gICAgICAgICAgICAgIHJlamVjdChlcnIpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgcmVqZWN0KFNvY2lhbEF1dGhTZXJ2aWNlLkVSUl9MT0dJTl9QUk9WSURFUl9OT1RfRk9VTkQpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBzaWduT3V0KHJldm9rZTogYm9vbGVhbiA9IGZhbHNlKTogUHJvbWlzZTxhbnk+IHtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgIGlmICghdGhpcy5pbml0aWFsaXplZCkge1xyXG4gICAgICAgIHJlamVjdChTb2NpYWxBdXRoU2VydmljZS5FUlJfTk9UX0lOSVRJQUxJWkVEKTtcclxuICAgICAgfSBlbHNlIGlmICghdGhpcy5fdXNlcikge1xyXG4gICAgICAgIHJlamVjdChTb2NpYWxBdXRoU2VydmljZS5FUlJfTk9UX0xPR0dFRF9JTik7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgbGV0IHByb3ZpZGVySWQgPSB0aGlzLl91c2VyLnByb3ZpZGVyO1xyXG4gICAgICAgIGxldCBwcm92aWRlck9iamVjdCA9IHRoaXMucHJvdmlkZXJzLmdldChwcm92aWRlcklkKTtcclxuICAgICAgICBpZiAocHJvdmlkZXJPYmplY3QpIHtcclxuICAgICAgICAgIHByb3ZpZGVyT2JqZWN0XHJcbiAgICAgICAgICAgIC5zaWduT3V0KHJldm9rZSlcclxuICAgICAgICAgICAgLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICAgIHJlc29sdmUoKTtcclxuXHJcbiAgICAgICAgICAgICAgdGhpcy5fdXNlciA9IG51bGw7XHJcbiAgICAgICAgICAgICAgdGhpcy5fYXV0aFN0YXRlLm5leHQobnVsbCk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5jYXRjaCgoZXJyKSA9PiB7XHJcbiAgICAgICAgICAgICAgcmVqZWN0KGVycik7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICByZWplY3QoU29jaWFsQXV0aFNlcnZpY2UuRVJSX0xPR0lOX1BST1ZJREVSX05PVF9GT1VORCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcbn1cclxuIl19
