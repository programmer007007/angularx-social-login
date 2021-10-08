var SocialLoginModule_1;
import { __decorate, __param } from "tslib";
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SocialAuthService } from './auth.service';
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
SocialLoginModule.ctorParameters = () => [
    { type: SocialLoginModule, decorators: [{ type: Optional }, { type: SkipSelf }] }
];
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
export { SocialLoginModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic29jaWFsbG9naW4ubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhcngtc29jaWFsLWxvZ2luLyIsInNvdXJjZXMiOlsic29jaWFsbG9naW4ubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsT0FBTyxFQUNMLFFBQVEsRUFDUixRQUFRLEVBQ1IsUUFBUSxFQUVULE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUUvQyxPQUFPLEVBQUUsaUJBQWlCLEVBQTJCLE1BQU0sZ0JBQWdCLENBQUM7QUFVNUUsSUFBYSxpQkFBaUIseUJBQTlCLE1BQWEsaUJBQWlCO0lBYzVCLFlBQW9DLFlBQStCO1FBQ2pFLElBQUksWUFBWSxFQUFFO1lBQ2hCLE1BQU0sSUFBSSxLQUFLLENBQ2Isc0VBQXNFLENBQUMsQ0FBQztTQUMzRTtJQUNILENBQUM7SUFsQk0sTUFBTSxDQUFDLFVBQVUsQ0FBQyxNQUErQjtRQUN0RCxPQUFPO1lBQ0wsUUFBUSxFQUFFLG1CQUFpQjtZQUMzQixTQUFTLEVBQUU7Z0JBQ1QsaUJBQWlCO2dCQUNqQjtvQkFDRSxPQUFPLEVBQUUseUJBQXlCO29CQUNsQyxRQUFRLEVBQUUsTUFBTTtpQkFDakI7YUFDRjtTQUNGLENBQUM7SUFDSixDQUFDO0NBUUYsQ0FBQTs7WUFObUQsaUJBQWlCLHVCQUF0RCxRQUFRLFlBQUksUUFBUTs7QUFkdEIsaUJBQWlCO0lBUjdCLFFBQVEsQ0FBQztRQUNSLE9BQU8sRUFBRTtZQUNQLFlBQVk7U0FDYjtRQUNELFNBQVMsRUFBRTtZQUNULGlCQUFpQjtTQUNsQjtLQUNGLENBQUM7SUFlYSxXQUFBLFFBQVEsRUFBRSxDQUFBLEVBQUUsV0FBQSxRQUFRLEVBQUUsQ0FBQTtHQWR4QixpQkFBaUIsQ0FvQjdCO1NBcEJZLGlCQUFpQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgTmdNb2R1bGUsXHJcbiAgT3B0aW9uYWwsXHJcbiAgU2tpcFNlbGYsXHJcbiAgTW9kdWxlV2l0aFByb3ZpZGVyc1xyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5cclxuaW1wb3J0IHsgU29jaWFsQXV0aFNlcnZpY2UsIFNvY2lhbEF1dGhTZXJ2aWNlQ29uZmlnIH0gZnJvbSAnLi9hdXRoLnNlcnZpY2UnO1xyXG5cclxuQE5nTW9kdWxlKHtcclxuICBpbXBvcnRzOiBbXHJcbiAgICBDb21tb25Nb2R1bGVcclxuICBdLFxyXG4gIHByb3ZpZGVyczogW1xyXG4gICAgU29jaWFsQXV0aFNlcnZpY2VcclxuICBdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBTb2NpYWxMb2dpbk1vZHVsZSB7XHJcbiAgcHVibGljIHN0YXRpYyBpbml0aWFsaXplKGNvbmZpZzogU29jaWFsQXV0aFNlcnZpY2VDb25maWcpOiBNb2R1bGVXaXRoUHJvdmlkZXJzIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIG5nTW9kdWxlOiBTb2NpYWxMb2dpbk1vZHVsZSxcclxuICAgICAgcHJvdmlkZXJzOiBbXHJcbiAgICAgICAgU29jaWFsQXV0aFNlcnZpY2UsXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgcHJvdmlkZTogJ1NvY2lhbEF1dGhTZXJ2aWNlQ29uZmlnJyxcclxuICAgICAgICAgIHVzZVZhbHVlOiBjb25maWdcclxuICAgICAgICB9XHJcbiAgICAgIF1cclxuICAgIH07XHJcbiAgfVxyXG5cclxuICBjb25zdHJ1Y3RvcihAT3B0aW9uYWwoKSBAU2tpcFNlbGYoKSBwYXJlbnRNb2R1bGU6IFNvY2lhbExvZ2luTW9kdWxlKSB7XHJcbiAgICBpZiAocGFyZW50TW9kdWxlKSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcihcclxuICAgICAgICAnU29jaWFsTG9naW5Nb2R1bGUgaXMgYWxyZWFkeSBsb2FkZWQuIEltcG9ydCBpdCBpbiB0aGUgQXBwTW9kdWxlIG9ubHknKTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuIl19