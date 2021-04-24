export interface ILoginReq {
    email: string;
    password: string;
}

export interface Session {
    refreshToken: string;
    accessToken: string;
    idToken: string;
    user: Object;
}

export interface ResetPassword {
    code: string;
    email: string;
    password: string;
}

export interface IRefreshReq {
    cognitoUserName: string;
    refreshToken: string;
}
