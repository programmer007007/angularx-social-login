import { __decorate, __param } from "tslib";
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SocialAuthService } from './auth.service';
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
export { SocialLoginModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic29jaWFsbG9naW4ubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhcngtc29jaWFsLWxvZ2luLyIsInNvdXJjZXMiOlsic29jaWFsbG9naW4ubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQ0wsUUFBUSxFQUNSLFFBQVEsRUFDUixRQUFRLEVBRVQsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBRS9DLE9BQU8sRUFBRSxpQkFBaUIsRUFBMkIsTUFBTSxnQkFBZ0IsQ0FBQztBQVU1RTtJQWNFLDJCQUFvQyxZQUErQjtRQUNqRSxJQUFJLFlBQVksRUFBRTtZQUNoQixNQUFNLElBQUksS0FBSyxDQUNiLHNFQUFzRSxDQUFDLENBQUM7U0FDM0U7SUFDSCxDQUFDOzBCQW5CVSxpQkFBaUI7SUFDZCw0QkFBVSxHQUF4QixVQUF5QixNQUErQjtRQUN0RCxPQUFPO1lBQ0wsUUFBUSxFQUFFLG1CQUFpQjtZQUMzQixTQUFTLEVBQUU7Z0JBQ1QsaUJBQWlCO2dCQUNqQjtvQkFDRSxPQUFPLEVBQUUseUJBQXlCO29CQUNsQyxRQUFRLEVBQUUsTUFBTTtpQkFDakI7YUFDRjtTQUNGLENBQUM7SUFDSixDQUFDOzs7Z0JBRWlELGlCQUFpQix1QkFBdEQsUUFBUSxZQUFJLFFBQVE7O0lBZHRCLGlCQUFpQjtRQVI3QixRQUFRLENBQUM7WUFDUixPQUFPLEVBQUU7Z0JBQ1AsWUFBWTthQUNiO1lBQ0QsU0FBUyxFQUFFO2dCQUNULGlCQUFpQjthQUNsQjtTQUNGLENBQUM7UUFlYSxXQUFBLFFBQVEsRUFBRSxDQUFBLEVBQUUsV0FBQSxRQUFRLEVBQUUsQ0FBQTtPQWR4QixpQkFBaUIsQ0FvQjdCO0lBQUQsd0JBQUM7Q0FBQSxBQXBCRCxJQW9CQztTQXBCWSxpQkFBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xyXG4gIE5nTW9kdWxlLFxyXG4gIE9wdGlvbmFsLFxyXG4gIFNraXBTZWxmLFxyXG4gIE1vZHVsZVdpdGhQcm92aWRlcnNcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuXHJcbmltcG9ydCB7IFNvY2lhbEF1dGhTZXJ2aWNlLCBTb2NpYWxBdXRoU2VydmljZUNvbmZpZyB9IGZyb20gJy4vYXV0aC5zZXJ2aWNlJztcclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgaW1wb3J0czogW1xyXG4gICAgQ29tbW9uTW9kdWxlXHJcbiAgXSxcclxuICBwcm92aWRlcnM6IFtcclxuICAgIFNvY2lhbEF1dGhTZXJ2aWNlXHJcbiAgXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgU29jaWFsTG9naW5Nb2R1bGUge1xyXG4gIHB1YmxpYyBzdGF0aWMgaW5pdGlhbGl6ZShjb25maWc6IFNvY2lhbEF1dGhTZXJ2aWNlQ29uZmlnKTogTW9kdWxlV2l0aFByb3ZpZGVycyB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBuZ01vZHVsZTogU29jaWFsTG9naW5Nb2R1bGUsXHJcbiAgICAgIHByb3ZpZGVyczogW1xyXG4gICAgICAgIFNvY2lhbEF1dGhTZXJ2aWNlLFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIHByb3ZpZGU6ICdTb2NpYWxBdXRoU2VydmljZUNvbmZpZycsXHJcbiAgICAgICAgICB1c2VWYWx1ZTogY29uZmlnXHJcbiAgICAgICAgfVxyXG4gICAgICBdXHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgY29uc3RydWN0b3IoQE9wdGlvbmFsKCkgQFNraXBTZWxmKCkgcGFyZW50TW9kdWxlOiBTb2NpYWxMb2dpbk1vZHVsZSkge1xyXG4gICAgaWYgKHBhcmVudE1vZHVsZSkge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXHJcbiAgICAgICAgJ1NvY2lhbExvZ2luTW9kdWxlIGlzIGFscmVhZHkgbG9hZGVkLiBJbXBvcnQgaXQgaW4gdGhlIEFwcE1vZHVsZSBvbmx5Jyk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiJdfQ==