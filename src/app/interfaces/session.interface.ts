export interface ILoginReq {
    email: string;
    password: string;
}

export interface ISignUpReq {
    firstName: string;
    lastName: string;
    userName: string;
    email: string;
    phoneNumber: string;
    password: string;
}

export interface IVerifyReq {
    cognitoUserName: string;
    code: number;
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
