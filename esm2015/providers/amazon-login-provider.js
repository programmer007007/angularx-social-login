import { BaseLoginProvider } from '../entities/base-login-provider';
import { SocialUser } from '../entities/social-user';
export class AmazonLoginProvider extends BaseLoginProvider {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW1hem9uLWxvZ2luLXByb3ZpZGVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhcngtc29jaWFsLWxvZ2luLyIsInNvdXJjZXMiOlsicHJvdmlkZXJzL2FtYXpvbi1sb2dpbi1wcm92aWRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUNwRSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFJckQsTUFBTSxPQUFPLG1CQUFvQixTQUFRLGlCQUFpQjtJQUd4RCxZQUNVLFFBQWdCLEVBQ2hCLGNBQW1CO1FBQ3pCLEtBQUssRUFBRSxTQUFTO1FBQ2hCLFVBQVUsRUFBRTtZQUNWLE9BQU8sRUFBRSxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUU7U0FDOUI7UUFDRCxZQUFZLEVBQUUsUUFBUSxDQUFDLE1BQU07S0FDOUI7UUFFRCxLQUFLLEVBQUUsQ0FBQztRQVRBLGFBQVEsR0FBUixRQUFRLENBQVE7UUFDaEIsZ0JBQVcsR0FBWCxXQUFXLENBTWxCO0lBR0gsQ0FBQztJQUVELFVBQVU7UUFDUixJQUFJLFVBQVUsR0FBRyxJQUFJLENBQUM7UUFDdEIsSUFBSSxRQUFRLEVBQUU7WUFDWixVQUFVLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUMzQyxVQUFVLENBQUMsRUFBRSxHQUFHLGFBQWEsQ0FBQztZQUM5QixRQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsQ0FBQztTQUN2QztRQUVELE1BQU0sQ0FBQyxrQkFBa0IsR0FBRyxHQUFHLEVBQUU7WUFDL0IsTUFBTSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQzFDLENBQUMsQ0FBQztRQUVGLE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7WUFDckMsSUFBSSxDQUFDLFVBQVUsQ0FDYixrQkFBa0IsRUFDbEIscURBQXFELEVBQ3JELEdBQUcsRUFBRTtnQkFDSCxPQUFPLEVBQUUsQ0FBQztZQUNaLENBQUMsRUFDRCxVQUFVLENBQ1gsQ0FBQztRQUNKLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELGNBQWM7UUFDWixPQUFPLElBQUksT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO1lBQ3JDLE1BQU0sQ0FBQyxLQUFLLENBQUMsZUFBZSxDQUFDLEVBQUUsRUFBRSxDQUFDLFFBQVEsRUFBRSxFQUFFO2dCQUM1QyxJQUFJLFFBQVEsQ0FBQyxPQUFPLEVBQUU7b0JBQ3BCLElBQUksSUFBSSxHQUFlLElBQUksVUFBVSxFQUFFLENBQUM7b0JBRXhDLElBQUksQ0FBQyxFQUFFLEdBQUcsUUFBUSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUM7b0JBQ3RDLElBQUksQ0FBQyxJQUFJLEdBQUcsUUFBUSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUM7b0JBQ2xDLElBQUksQ0FBQyxLQUFLLEdBQUcsUUFBUSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUM7b0JBRTNDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztpQkFDZjtxQkFBTTtvQkFDTCxNQUFNLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO2lCQUN4QjtZQUNILENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQsTUFBTSxDQUFDLGFBQW1CO1FBQ3hCLE1BQU0sT0FBTyxtQ0FBUSxJQUFJLENBQUMsV0FBVyxHQUFLLGFBQWEsQ0FBRSxDQUFDO1FBQzFELE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7WUFDckMsTUFBTSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsT0FBTyxFQUFFLENBQUMsWUFBWSxFQUFFLEVBQUU7Z0JBQy9DLElBQUksWUFBWSxDQUFDLEtBQUssRUFBRTtvQkFDdEIsTUFBTSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQztpQkFDNUI7cUJBQU07b0JBQ0wsTUFBTSxDQUFDLEtBQUssQ0FBQyxlQUFlLENBQzFCLFlBQVksQ0FBQyxZQUFZLEVBQ3pCLENBQUMsUUFBUSxFQUFFLEVBQUU7d0JBQ1gsSUFBSSxJQUFJLEdBQWUsSUFBSSxVQUFVLEVBQUUsQ0FBQzt3QkFFeEMsSUFBSSxDQUFDLEVBQUUsR0FBRyxRQUFRLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQzt3QkFDdEMsSUFBSSxDQUFDLElBQUksR0FBRyxRQUFRLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQzt3QkFDbEMsSUFBSSxDQUFDLEtBQUssR0FBRyxRQUFRLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQzt3QkFDM0MsSUFBSSxDQUFDLFNBQVMsR0FBRyxZQUFZLENBQUMsWUFBWSxDQUFDO3dCQUUzQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7b0JBQ2hCLENBQUMsQ0FDRixDQUFDO2lCQUNIO1lBQ0gsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCxPQUFPLENBQUMsTUFBZ0I7UUFDdEIsT0FBTyxJQUFJLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtZQUNyQyxJQUFJO2dCQUNGLE1BQU0sQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUM7Z0JBQ3RCLE9BQU8sRUFBRSxDQUFDO2FBQ1g7WUFBQyxPQUFPLEdBQUcsRUFBRTtnQkFDWixNQUFNLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO2FBQ3JCO1FBQ0gsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDOztBQTNGc0IsK0JBQVcsR0FBVyxRQUFRLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBCYXNlTG9naW5Qcm92aWRlciB9IGZyb20gJy4uL2VudGl0aWVzL2Jhc2UtbG9naW4tcHJvdmlkZXInO1xyXG5pbXBvcnQgeyBTb2NpYWxVc2VyIH0gZnJvbSAnLi4vZW50aXRpZXMvc29jaWFsLXVzZXInO1xyXG5cclxuZGVjbGFyZSBsZXQgYW1hem9uOiBhbnksIHdpbmRvdzogYW55O1xyXG5cclxuZXhwb3J0IGNsYXNzIEFtYXpvbkxvZ2luUHJvdmlkZXIgZXh0ZW5kcyBCYXNlTG9naW5Qcm92aWRlciB7XHJcbiAgcHVibGljIHN0YXRpYyByZWFkb25seSBQUk9WSURFUl9JRDogc3RyaW5nID0gJ0FNQVpPTic7XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSBjbGllbnRJZDogc3RyaW5nLFxyXG4gICAgcHJpdmF0ZSBpbml0T3B0aW9uczogYW55ID0ge1xyXG4gICAgICBzY29wZTogJ3Byb2ZpbGUnLFxyXG4gICAgICBzY29wZV9kYXRhOiB7XHJcbiAgICAgICAgcHJvZmlsZTogeyBlc3NlbnRpYWw6IGZhbHNlIH0sXHJcbiAgICAgIH0sXHJcbiAgICAgIHJlZGlyZWN0X3VyaTogbG9jYXRpb24ub3JpZ2luLFxyXG4gICAgfVxyXG4gICkge1xyXG4gICAgc3VwZXIoKTtcclxuICB9XHJcblxyXG4gIGluaXRpYWxpemUoKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICBsZXQgYW1hem9uUm9vdCA9IG51bGw7XHJcbiAgICBpZiAoZG9jdW1lbnQpIHtcclxuICAgICAgYW1hem9uUm9vdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICBhbWF6b25Sb290LmlkID0gJ2FtYXpvbi1yb290JztcclxuICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChhbWF6b25Sb290KTtcclxuICAgIH1cclxuXHJcbiAgICB3aW5kb3cub25BbWF6b25Mb2dpblJlYWR5ID0gKCkgPT4ge1xyXG4gICAgICBhbWF6b24uTG9naW4uc2V0Q2xpZW50SWQodGhpcy5jbGllbnRJZCk7XHJcbiAgICB9O1xyXG5cclxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgIHRoaXMubG9hZFNjcmlwdChcclxuICAgICAgICAnYW1hem9uLWxvZ2luLXNkaycsXHJcbiAgICAgICAgJ2h0dHBzOi8vYXNzZXRzLmxvZ2lud2l0aGFtYXpvbi5jb20vc2RrL25hL2xvZ2luMS5qcycsXHJcbiAgICAgICAgKCkgPT4ge1xyXG4gICAgICAgICAgcmVzb2x2ZSgpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgYW1hem9uUm9vdFxyXG4gICAgICApO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBnZXRMb2dpblN0YXR1cygpOiBQcm9taXNlPFNvY2lhbFVzZXI+IHtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgIGFtYXpvbi5Mb2dpbi5yZXRyaWV2ZVByb2ZpbGUoJycsIChyZXNwb25zZSkgPT4ge1xyXG4gICAgICAgIGlmIChyZXNwb25zZS5zdWNjZXNzKSB7XHJcbiAgICAgICAgICBsZXQgdXNlcjogU29jaWFsVXNlciA9IG5ldyBTb2NpYWxVc2VyKCk7XHJcblxyXG4gICAgICAgICAgdXNlci5pZCA9IHJlc3BvbnNlLnByb2ZpbGUuQ3VzdG9tZXJJZDtcclxuICAgICAgICAgIHVzZXIubmFtZSA9IHJlc3BvbnNlLnByb2ZpbGUuTmFtZTtcclxuICAgICAgICAgIHVzZXIuZW1haWwgPSByZXNwb25zZS5wcm9maWxlLlByaW1hcnlFbWFpbDtcclxuXHJcbiAgICAgICAgICByZXNvbHZlKHVzZXIpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICByZWplY3QocmVzcG9uc2UuZXJyb3IpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHNpZ25JbihzaWduSW5PcHRpb25zPzogYW55KTogUHJvbWlzZTxTb2NpYWxVc2VyPiB7XHJcbiAgICBjb25zdCBvcHRpb25zID0geyAuLi50aGlzLmluaXRPcHRpb25zLCAuLi5zaWduSW5PcHRpb25zIH07XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICBhbWF6b24uTG9naW4uYXV0aG9yaXplKG9wdGlvbnMsIChhdXRoUmVzcG9uc2UpID0+IHtcclxuICAgICAgICBpZiAoYXV0aFJlc3BvbnNlLmVycm9yKSB7XHJcbiAgICAgICAgICByZWplY3QoYXV0aFJlc3BvbnNlLmVycm9yKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgYW1hem9uLkxvZ2luLnJldHJpZXZlUHJvZmlsZShcclxuICAgICAgICAgICAgYXV0aFJlc3BvbnNlLmFjY2Vzc190b2tlbixcclxuICAgICAgICAgICAgKHJlc3BvbnNlKSA9PiB7XHJcbiAgICAgICAgICAgICAgbGV0IHVzZXI6IFNvY2lhbFVzZXIgPSBuZXcgU29jaWFsVXNlcigpO1xyXG5cclxuICAgICAgICAgICAgICB1c2VyLmlkID0gcmVzcG9uc2UucHJvZmlsZS5DdXN0b21lcklkO1xyXG4gICAgICAgICAgICAgIHVzZXIubmFtZSA9IHJlc3BvbnNlLnByb2ZpbGUuTmFtZTtcclxuICAgICAgICAgICAgICB1c2VyLmVtYWlsID0gcmVzcG9uc2UucHJvZmlsZS5QcmltYXJ5RW1haWw7XHJcbiAgICAgICAgICAgICAgdXNlci5hdXRoVG9rZW4gPSBhdXRoUmVzcG9uc2UuYWNjZXNzX3Rva2VuO1xyXG5cclxuICAgICAgICAgICAgICByZXNvbHZlKHVzZXIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHNpZ25PdXQocmV2b2tlPzogYm9vbGVhbik6IFByb21pc2U8YW55PiB7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICB0cnkge1xyXG4gICAgICAgIGFtYXpvbi5Mb2dpbi5sb2dvdXQoKTtcclxuICAgICAgICByZXNvbHZlKCk7XHJcbiAgICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICAgIHJlamVjdChlcnIubWVzc2FnZSk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxufVxyXG4iXX0=