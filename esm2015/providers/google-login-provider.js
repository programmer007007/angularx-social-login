import { BaseLoginProvider } from '../entities/base-login-provider';
import { SocialUser } from '../entities/social-user';
export class GoogleLoginProvider extends BaseLoginProvider {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ29vZ2xlLWxvZ2luLXByb3ZpZGVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhcngtc29jaWFsLWxvZ2luLyIsInNvdXJjZXMiOlsicHJvdmlkZXJzL2dvb2dsZS1sb2dpbi1wcm92aWRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUNwRSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFJckQsTUFBTSxPQUFPLG1CQUFvQixTQUFRLGlCQUFpQjtJQUt4RCxZQUNVLFFBQWdCLEVBQ2hCLGNBQW1CLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRTtRQUU3QyxLQUFLLEVBQUUsQ0FBQztRQUhBLGFBQVEsR0FBUixRQUFRLENBQVE7UUFDaEIsZ0JBQVcsR0FBWCxXQUFXLENBQTBCO0lBRy9DLENBQUM7SUFFRCxVQUFVO1FBQ1IsT0FBTyxJQUFJLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtZQUNyQyxJQUFJLENBQUMsVUFBVSxDQUNiLG1CQUFtQixDQUFDLFdBQVcsRUFDL0Isd0NBQXdDLEVBQ3hDLEdBQUcsRUFBRTtnQkFDSCxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxHQUFHLEVBQUU7b0JBQ3RCLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLGlDQUN2QixJQUFJLENBQUMsV0FBVyxLQUNuQixTQUFTLEVBQUUsSUFBSSxDQUFDLFFBQVEsSUFDeEIsQ0FBQztvQkFFSCxJQUFJLENBQUMsS0FBSzt5QkFDUCxJQUFJLENBQUMsR0FBRyxFQUFFO3dCQUNULE9BQU8sRUFBRSxDQUFDO29CQUNaLENBQUMsQ0FBQzt5QkFDRCxLQUFLLENBQUMsQ0FBQyxHQUFRLEVBQUUsRUFBRTt3QkFDbEIsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO29CQUNkLENBQUMsQ0FBQyxDQUFDO2dCQUNQ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QkFDWCxJQUFJLENBQUMsQ0FBQyxHQUFRLEVBQUUsRUFBRTtnQkFDakIsSUFBSSxHQUFHLEVBQUU7b0JBQ1AsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2lCQUNiO3FCQUFNO29CQUNMLE9BQU8sRUFBRSxDQUFDO2lCQUNYO1lBQ0gsQ0FBQyxDQUFDO2lCQUNELEtBQUssQ0FBQyxDQUFDLEdBQVEsRUFBRSxFQUFFO2dCQUNsQixNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDZCxDQUFDLENBQUMsQ0FBQztRQUNQLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQzs7QUFoSXNCLCtCQUFXLEdBQVcsUUFBUSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQmFzZUxvZ2luUHJvdmlkZXIgfSBmcm9tICcuLi9lbnRpdGllcy9iYXNlLWxvZ2luLXByb3ZpZGVyJztcclxuaW1wb3J0IHsgU29jaWFsVXNlciB9IGZyb20gJy4uL2VudGl0aWVzL3NvY2lhbC11c2VyJztcclxuXHJcbmRlY2xhcmUgbGV0IGdhcGk6IGFueTtcclxuXHJcbmV4cG9ydCBjbGFzcyBHb29nbGVMb2dpblByb3ZpZGVyIGV4dGVuZHMgQmFzZUxvZ2luUHJvdmlkZXIge1xyXG4gIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgUFJPVklERVJfSUQ6IHN0cmluZyA9ICdHT09HTEUnO1xyXG5cclxuICBwcm90ZWN0ZWQgYXV0aDI6IGFueTtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIGNsaWVudElkOiBzdHJpbmcsXHJcbiAgICBwcml2YXRlIGluaXRPcHRpb25zOiBhbnkgPSB7IHNjb3BlOiAnZW1haWwnIH1cclxuICApIHtcclxuICAgIHN1cGVyKCk7XHJcbiAgfVxyXG5cclxuICBpbml0aWFsaXplKCk6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgdGhpcy5sb2FkU2NyaXB0KFxyXG4gICAgICAgIEdvb2dsZUxvZ2luUHJvdmlkZXIuUFJPVklERVJfSUQsXHJcbiAgICAgICAgJ2h0dHBzOi8vYXBpcy5nb29nbGUuY29tL2pzL3BsYXRmb3JtLmpzJyxcclxuICAgICAgICAoKSA9PiB7XHJcbiAgICAgICAgICBnYXBpLmxvYWQoJ2F1dGgyJywgKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmF1dGgyID0gZ2FwaS5hdXRoMi5pbml0KHtcclxuICAgICAgICAgICAgICAuLi50aGlzLmluaXRPcHRpb25zLFxyXG4gICAgICAgICAgICAgIGNsaWVudF9pZDogdGhpcy5jbGllbnRJZCxcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmF1dGgyXHJcbiAgICAgICAgICAgICAgLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xyXG4gICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgLmNhdGNoKChlcnI6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XHJcbiAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGdldExvZ2luU3RhdHVzKCk6IFByb21pc2U8U29jaWFsVXNlcj4ge1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgaWYgKHRoaXMuYXV0aDIuaXNTaWduZWRJbi5nZXQoKSkge1xyXG4gICAgICAgIGxldCB1c2VyOiBTb2NpYWxVc2VyID0gbmV3IFNvY2lhbFVzZXIoKTtcclxuICAgICAgICBsZXQgcHJvZmlsZSA9IHRoaXMuYXV0aDIuY3VycmVudFVzZXIuZ2V0KCkuZ2V0QmFzaWNQcm9maWxlKCk7XHJcbiAgICAgICAgbGV0IHRva2VuID0gdGhpcy5hdXRoMi5jdXJyZW50VXNlci5nZXQoKS5nZXRBdXRoUmVzcG9uc2UodHJ1ZSlcclxuICAgICAgICAgIC5hY2Nlc3NfdG9rZW47XHJcbiAgICAgICAgbGV0IGJhY2tlbmRUb2tlbiA9IHRoaXMuYXV0aDIuY3VycmVudFVzZXIuZ2V0KCkuZ2V0QXV0aFJlc3BvbnNlKHRydWUpXHJcbiAgICAgICAgICAuaWRfdG9rZW47XHJcblxyXG4gICAgICAgIHVzZXIuaWQgPSBwcm9maWxlLmdldElkKCk7XHJcbiAgICAgICAgdXNlci5uYW1lID0gcHJvZmlsZS5nZXROYW1lKCk7XHJcbiAgICAgICAgdXNlci5lbWFpbCA9IHByb2ZpbGUuZ2V0RW1haWwoKTtcclxuICAgICAgICB1c2VyLnBob3RvVXJsID0gcHJvZmlsZS5nZXRJbWFnZVVybCgpO1xyXG4gICAgICAgIHVzZXIuZmlyc3ROYW1lID0gcHJvZmlsZS5nZXRHaXZlbk5hbWUoKTtcclxuICAgICAgICB1c2VyLmxhc3ROYW1lID0gcHJvZmlsZS5nZXRGYW1pbHlOYW1lKCk7XHJcbiAgICAgICAgdXNlci5hdXRoVG9rZW4gPSB0b2tlbjtcclxuICAgICAgICB1c2VyLmlkVG9rZW4gPSBiYWNrZW5kVG9rZW47XHJcbiAgICAgICAgcmVzb2x2ZSh1c2VyKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICByZWplY3QoJ05vIHVzZXIgaXMgY3VycmVudGx5IGxvZ2dlZCBpbi4nKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBzaWduSW4oc2lnbkluT3B0aW9ucz86IGFueSk6IFByb21pc2U8U29jaWFsVXNlcj4ge1xyXG4gICAgY29uc3Qgb3B0aW9ucyA9IHsgLi4udGhpcy5pbml0T3B0aW9ucywgLi4uc2lnbkluT3B0aW9ucyB9O1xyXG5cclxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgIGNvbnN0IG9mZmxpbmVBY2Nlc3M6IGJvb2xlYW4gPSBvcHRpb25zICYmIG9wdGlvbnMub2ZmbGluZV9hY2Nlc3M7XHJcbiAgICAgIGxldCBwcm9taXNlID0gIW9mZmxpbmVBY2Nlc3NcclxuICAgICAgICA/IHRoaXMuYXV0aDIuc2lnbkluKHNpZ25Jbk9wdGlvbnMpXHJcbiAgICAgICAgOiB0aGlzLmF1dGgyLmdyYW50T2ZmbGluZUFjY2VzcyhzaWduSW5PcHRpb25zKTtcclxuXHJcbiAgICAgIHByb21pc2VcclxuICAgICAgICAudGhlbihcclxuICAgICAgICAgIChyZXNwb25zZTogYW55KSA9PiB7XHJcbiAgICAgICAgICAgIGxldCB1c2VyOiBTb2NpYWxVc2VyID0gbmV3IFNvY2lhbFVzZXIoKTtcclxuICAgICAgICAgICAgbGV0IHByb2ZpbGUgPSB0aGlzLmF1dGgyLmN1cnJlbnRVc2VyLmdldCgpLmdldEJhc2ljUHJvZmlsZSgpO1xyXG4gICAgICAgICAgICBsZXQgdG9rZW4gPSB0aGlzLmF1dGgyLmN1cnJlbnRVc2VyLmdldCgpLmdldEF1dGhSZXNwb25zZSh0cnVlKVxyXG4gICAgICAgICAgICAgIC5hY2Nlc3NfdG9rZW47XHJcbiAgICAgICAgICAgIGxldCBiYWNrZW5kVG9rZW4gPSB0aGlzLmF1dGgyLmN1cnJlbnRVc2VyXHJcbiAgICAgICAgICAgICAgLmdldCgpXHJcbiAgICAgICAgICAgICAgLmdldEF1dGhSZXNwb25zZSh0cnVlKS5pZF90b2tlbjtcclxuXHJcbiAgICAgICAgICAgIHVzZXIuaWQgPSBwcm9maWxlLmdldElkKCk7XHJcbiAgICAgICAgICAgIHVzZXIubmFtZSA9IHByb2ZpbGUuZ2V0TmFtZSgpO1xyXG4gICAgICAgICAgICB1c2VyLmVtYWlsID0gcHJvZmlsZS5nZXRFbWFpbCgpO1xyXG4gICAgICAgICAgICB1c2VyLnBob3RvVXJsID0gcHJvZmlsZS5nZXRJbWFnZVVybCgpO1xyXG4gICAgICAgICAgICB1c2VyLmZpcnN0TmFtZSA9IHByb2ZpbGUuZ2V0R2l2ZW5OYW1lKCk7XHJcbiAgICAgICAgICAgIHVzZXIubGFzdE5hbWUgPSBwcm9maWxlLmdldEZhbWlseU5hbWUoKTtcclxuICAgICAgICAgICAgdXNlci5hdXRoVG9rZW4gPSB0b2tlbjtcclxuICAgICAgICAgICAgdXNlci5pZFRva2VuID0gYmFja2VuZFRva2VuO1xyXG5cclxuICAgICAgICAgICAgaWYgKHJlc3BvbnNlICYmIHJlc3BvbnNlLmNvZGUpIHtcclxuICAgICAgICAgICAgICB1c2VyLmF1dGhvcml6YXRpb25Db2RlID0gcmVzcG9uc2UuY29kZTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmVzb2x2ZSh1c2VyKTtcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICAoY2xvc2VkOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgcmVqZWN0KGNsb3NlZCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgKVxyXG4gICAgICAgIC5jYXRjaCgoZXJyOiBhbnkpID0+IHtcclxuICAgICAgICAgIHJlamVjdChlcnIpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBzaWduT3V0KHJldm9rZT86IGJvb2xlYW4pOiBQcm9taXNlPGFueT4ge1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgbGV0IHNpZ25PdXRQcm9taXNlOiBQcm9taXNlPGFueT47XHJcblxyXG4gICAgICBpZiAocmV2b2tlKSB7XHJcbiAgICAgICAgc2lnbk91dFByb21pc2UgPSB0aGlzLmF1dGgyLmRpc2Nvbm5lY3QoKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBzaWduT3V0UHJvbWlzZSA9IHRoaXMuYXV0aDIuc2lnbk91dCgpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBzaWduT3V0UHJvbWlzZVxyXG4gICAgICAgIC50aGVuKChlcnI6IGFueSkgPT4ge1xyXG4gICAgICAgICAgaWYgKGVycikge1xyXG4gICAgICAgICAgICByZWplY3QoZXJyKTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJlc29sdmUoKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgICAgIC5jYXRjaCgoZXJyOiBhbnkpID0+IHtcclxuICAgICAgICAgIHJlamVjdChlcnIpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcbiAgfVxyXG59XHJcbiJdfQ==