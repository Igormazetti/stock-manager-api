import jwt from 'jsonwebtoken';

interface ITokenPayload {
  iat: number;
  exp: number;
  data: string;
}

export interface INewTokenPayload {
  iat: number;
  exp: number;
  id: string;
  type: 'company' | 'employee';
  companyId: string;
}

const secret = process.env.JWT_SECRET || 'secret';

export default class Token {
  createToken = (id: string) => {
    const token = jwt.sign({ data: id }, secret, {
      expiresIn: '30d',
      algorithm: 'HS256',
    });
    return token;
  };

  createUserToken = (payload: { id: string; type: 'company' | 'employee'; companyId: string }) => {
    const token = jwt.sign(payload, secret, {
      expiresIn: '30d',
      algorithm: 'HS256',
    });
    return token;
  };

  validateToken = (token: string) => {
    try {
      const decoded = jwt.verify(token, secret);
      const { data } = decoded as ITokenPayload;
      return data;
    } catch (_err) {
      return undefined;
    }
  };

  validateUserToken = (token: string): INewTokenPayload | undefined => {
    try {
      const decoded = jwt.verify(token, secret) as INewTokenPayload;
      if (decoded.id && decoded.type && decoded.companyId) {
        return decoded;
      }
      return undefined;
    } catch (_err) {
      return undefined;
    }
  };
}
