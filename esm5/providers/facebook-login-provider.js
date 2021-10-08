import { __assign, __extends } from "tslib";
import { BaseLoginProvider } from '../entities/base-login-provider';
import { SocialUser } from '../entities/social-user';
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
export { FacebookLoginProvider };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmFjZWJvb2stbG9naW4tcHJvdmlkZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyeC1zb2NpYWwtbG9naW4vIiwic291cmNlcyI6WyJwcm92aWRlcnMvZmFjZWJvb2stbG9naW4tcHJvdmlkZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBQ3BFLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUlyRDtJQUEyQyx5Q0FBaUI7SUFHMUQsK0JBQ1UsUUFBZ0IsRUFDaEIsV0FLUDtRQUxPLDRCQUFBLEVBQUE7WUFDTixLQUFLLEVBQUUsc0JBQXNCO1lBQzdCLE1BQU0sRUFBRSxPQUFPO1lBQ2YsTUFBTSxFQUFFLHlDQUF5QztZQUNqRCxPQUFPLEVBQUUsTUFBTTtTQUNoQjtRQVBILFlBU0UsaUJBQU8sU0FDUjtRQVRTLGNBQVEsR0FBUixRQUFRLENBQVE7UUFDaEIsaUJBQVcsR0FBWCxXQUFXLENBS2xCOztJQUdILENBQUM7SUFFRCwwQ0FBVSxHQUFWO1FBQUEsaUJBa0JDO1FBakJDLE9BQU8sSUFBSSxPQUFPLENBQUMsVUFBQyxPQUFPLEVBQUUsTUFBTTtZQUNqQyxLQUFJLENBQUMsVUFBVSxDQUNiLHFCQUFxQixDQUFDLFdBQVcsRUFDakMsNEJBQTBCLEtBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxZQUFTLEVBQzFEO2dCQUNFLEVBQUUsQ0FBQyxJQUFJLENBQUM7b0JBQ04sS0FBSyxFQUFFLEtBQUksQ0FBQyxRQUFRO29CQUNwQixnQkFBZ0IsRUFBRSxJQUFJO29CQUN0QixNQUFNLEVBQUUsSUFBSTtvQkFDWixLQUFLLEVBQUUsSUFBSTtvQkFDWCxPQUFPLEVBQUUsS0FBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPO2lCQUNsQyxDQUFDLENBQUM7Z0JBRUgsT0FBTyxFQUFFLENBQUM7WUFDWixDQUFDLENBQ0YsQ0FBQztRQUNKLENBQUMsQ0FBQyxD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QUFPLElBQUksT0FBTyxDQUFDLFVBQUMsT0FBTyxFQUFFLE1BQU07WUFDakMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxVQUFDLFFBQWE7Z0JBQ3RCLE9BQU8sRUFBRSxDQUFDO1lBQ1osQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFyR3NCLGlDQUFXLEdBQVcsVUFBVSxDQUFDO0lBc0cxRCw0QkFBQztDQUFBLEFBdkdELENBQTJDLGlCQUFpQixHQXVHM0Q7U0F2R1kscUJBQXFCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQmFzZUxvZ2luUHJvdmlkZXIgfSBmcm9tICcuLi9lbnRpdGllcy9iYXNlLWxvZ2luLXByb3ZpZGVyJztcclxuaW1wb3J0IHsgU29jaWFsVXNlciB9IGZyb20gJy4uL2VudGl0aWVzL3NvY2lhbC11c2VyJztcclxuXHJcbmRlY2xhcmUgbGV0IEZCOiBhbnk7XHJcblxyXG5leHBvcnQgY2xhc3MgRmFjZWJvb2tMb2dpblByb3ZpZGVyIGV4dGVuZHMgQmFzZUxvZ2luUHJvdmlkZXIge1xyXG4gIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgUFJPVklERVJfSUQ6IHN0cmluZyA9ICdGQUNFQk9PSyc7XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSBjbGllbnRJZDogc3RyaW5nLFxyXG4gICAgcHJpdmF0ZSBpbml0T3B0aW9uczogYW55ID0ge1xyXG4gICAgICBzY29wZTogJ2VtYWlsLHB1YmxpY19wcm9maWxlJyxcclxuICAgICAgbG9jYWxlOiAnZW5fVVMnLFxyXG4gICAgICBmaWVsZHM6ICduYW1lLGVtYWlsLHBpY3R1cmUsZmlyc3RfbmFtZSxsYXN0X25hbWUnLFxyXG4gICAgICB2ZXJzaW9uOiAndjQuMCcsXHJcbiAgICB9XHJcbiAgKSB7XHJcbiAgICBzdXBlcigpO1xyXG4gIH1cclxuXHJcbiAgaW5pdGlhbGl6ZSgpOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgIHRoaXMubG9hZFNjcmlwdChcclxuICAgICAgICBGYWNlYm9va0xvZ2luUHJvdmlkZXIuUFJPVklERVJfSUQsXHJcbiAgICAgICAgYC8vY29ubmVjdC5mYWNlYm9vay5uZXQvJHt0aGlzLmluaXRPcHRpb25zLmxvY2FsZX0vc2RrLmpzYCxcclxuICAgICAgICAoKSA9PiB7XHJcbiAgICAgICAgICBGQi5pbml0KHtcclxuICAgICAgICAgICAgYXBwSWQ6IHRoaXMuY2xpZW50SWQsXHJcbiAgICAgICAgICAgIGF1dG9Mb2dBcHBFdmVudHM6IHRydWUsXHJcbiAgICAgICAgICAgIGNvb2tpZTogdHJ1ZSxcclxuICAgICAgICAgICAgeGZibWw6IHRydWUsXHJcbiAgICAgICAgICAgIHZlcnNpb246IHRoaXMuaW5pdE9wdGlvbnMudmVyc2lvbixcclxuICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgIHJlc29sdmUoKTtcclxuICAgICAgICB9XHJcbiAgICAgICk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGdldExvZ2luU3RhdHVzKCk6IFByb21pc2U8U29jaWFsVXNlcj4ge1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgRkIuZ2V0TG9naW5TdGF0dXMoKHJlc3BvbnNlOiBhbnkpID0+IHtcclxuICAgICAgICBpZiAocmVzcG9uc2Uuc3RhdHVzID09PSAnY29ubmVjdGVkJykge1xyXG4gICAgICAgICAgbGV0IGF1dGhSZXNwb25zZSA9IHJlc3BvbnNlLmF1dGhSZXNwb25zZTtcclxuICAgICAgICAgIEZCLmFwaShgL21lP2ZpZWxkcz0ke3RoaXMuaW5pdE9wdGlvbnMuZmllbGRzfWAsIChmYlVzZXI6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgdXNlcjogU29jaWFsVXNlciA9IG5ldyBTb2NpYWxVc2VyKCk7XHJcblxyXG4gICAgICAgICAgICB1c2VyLmlkID0gZmJVc2VyLmlkO1xyXG4gICAgICAgICAgICB1c2VyLm5hbWUgPSBmYlVzZXIubmFtZTtcclxuICAgICAgICAgICAgdXNlci5lbWFpbCA9IGZiVXNlci5lbWFpbDtcclxuICAgICAgICAgICAgdXNlci5waG90b1VybCA9XHJcbiAgICAgICAgICAgICAgJ2h0dHBzOi8vZ3JhcGguZmFjZWJvb2suY29tLycgK1xyXG4gICAgICAgICAgICAgIGZiVXNlci5pZCArXHJcbiAgICAgICAgICAgICAgJy9waWN0dXJlP3R5cGU9bm9ybWFsJztcclxuICAgICAgICAgICAgdXNlci5maXJzdE5hbWUgPSBmYlVzZXIuZmlyc3RfbmFtZTtcclxuICAgICAgICAgICAgdXNlci5sYXN0TmFtZSA9IGZiVXNlci5sYXN0X25hbWU7XHJcbiAgICAgICAgICAgIHVzZXIuYXV0aFRva2VuID0gYXV0aFJlc3BvbnNlLmFjY2Vzc1Rva2VuO1xyXG5cclxuICAgICAgICAgICAgdXNlci5mYWNlYm9vayA9IGZiVXNlcjtcclxuXHJcbiAgICAgICAgICAgIHJlc29sdmUodXNlcik7XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgcmVqZWN0KCdObyB1c2VyIGlzIGN1cnJlbnRseSBsb2dnZWQgaW4uJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgc2lnbkluKHNpZ25Jbk9wdGlvbnM/OiBhbnkpOiBQcm9taXNlPFNvY2lhbFVzZXI+IHtcclxuICAgIGNvbnN0IG9wdGlvbnMgPSB7IC4uLnRoaXMuaW5pdE9wdGlvbnMsIC4uLnNpZ25Jbk9wdGlvbnMgfTtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgIEZCLmxvZ2luKChyZXNwb25zZTogYW55KSA9PiB7XHJcbiAgICAgICAgaWYgKHJlc3BvbnNlLmF1dGhSZXNwb25zZSkge1xyXG4gICAgICAgICAgbGV0IGF1dGhSZXNwb25zZSA9IHJlc3BvbnNlLmF1dGhSZXNwb25zZTtcclxuICAgICAgICAgIEZCLmFwaShgL21lP2ZpZWxkcz0ke29wdGlvbnMuZmllbGRzfWAsIChmYlVzZXI6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgdXNlcjogU29jaWFsVXNlciA9IG5ldyBTb2NpYWxVc2VyKCk7XHJcblxyXG4gICAgICAgICAgICB1c2VyLmlkID0gZmJVc2VyLmlkO1xyXG4gICAgICAgICAgICB1c2VyLm5hbWUgPSBmYlVzZXIubmFtZTtcclxuICAgICAgICAgICAgdXNlci5lbWFpbCA9IGZiVXNlci5lbWFpbDtcclxuICAgICAgICAgICAgdXNlci5waG90b1VybCA9XHJcbiAgICAgICAgICAgICAgJ2h0dHBzOi8vZ3JhcGguZmFjZWJvb2suY29tLycgK1xyXG4gICAgICAgICAgICAgIGZiVXNlci5pZCArXHJcbiAgICAgICAgICAgICAgJy9waWN0dXJlP3R5cGU9bm9ybWFsJztcclxuICAgICAgICAgICAgdXNlci5maXJzdE5hbWUgPSBmYlVzZXIuZmlyc3RfbmFtZTtcclxuICAgICAgICAgICAgdXNlci5sYXN0TmFtZSA9IGZiVXNlci5sYXN0X25hbWU7XHJcbiAgICAgICAgICAgIHVzZXIuYXV0aFRva2VuID0gYXV0aFJlc3BvbnNlLmFjY2Vzc1Rva2VuO1xyXG5cclxuICAgICAgICAgICAgdXNlci5mYWNlYm9vayA9IGZiVXNlcjtcclxuXHJcbiAgICAgICAgICAgIHJlc29sdmUodXNlcik7XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgcmVqZWN0KCdVc2VyIGNhbmNlbGxlZCBsb2dpbiBvciBkaWQgbm90IGZ1bGx5IGF1dGhvcml6ZS4nKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0sIG9wdGlvbnMpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBzaWduT3V0KCk6IFByb21pc2U8YW55PiB7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICBGQi5sb2dvdXQoKHJlc3BvbnNlOiBhbnkpID0+IHtcclxuICAgICAgICByZXNvbHZlKCk7XHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcbiAgfVxyXG59XHJcbiJdfQ==