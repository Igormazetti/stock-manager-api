export interface INewTokenPayload {
    iat: number;
    exp: number;
    id: string;
    type: 'company' | 'employee';
    companyId: string;
}
export default class Token {
    createToken: (id: string) => string;
    createUserToken: (payload: {
        id: string;
        type: 'company' | 'employee';
        companyId: string;
    }) => string;
    validateToken: (token: string) => string | undefined;
    validateUserToken: (token: string) => INewTokenPayload | undefined;
}
