import { Observable } from 'rxjs';
import { LoginProvider } from './entities/login-provider';
import { SocialUser } from './entities/social-user';
import * as ɵngcc0 from '@angular/core';
export interface SocialAuthServiceConfig {
    autoLogin?: boolean;
    providers: {
        id: string;
        provider: LoginProvider;
    }[];
}
/** @dynamic */
export declare class SocialAuthService {
    private static readonly ERR_LOGIN_PROVIDER_NOT_FOUND;
    private static readonly ERR_NOT_LOGGED_IN;
    private static readonly ERR_NOT_INITIALIZED;
    private providers;
    private autoLogin;
    private _user;
    private _authState;
    private initialized;
    get authState(): Observable<SocialUser>;
    constructor(config: SocialAuthServiceConfig | Promise<SocialAuthServiceConfig>);
    private initialize;
    signIn(providerId: string, signInOptions?: any): Promise<SocialUser>;
    signOut(revoke?: boolean): Promise<any>;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<SocialAuthService, never>;
    static ɵprov: ɵngcc0.ɵɵInjectableDef<SocialAuthService>;
}

//# sourceMappingURL=auth.service.d.ts.map