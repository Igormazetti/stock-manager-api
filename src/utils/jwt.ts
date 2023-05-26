import jwt from 'jsonwebtoken';

interface ITokenPayload {
  iat: number;
  exp: number;
  sub: string;
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

  validateToken = (token: string) => {
    try {
      const decoded = jwt.verify(token, secret);
      const { sub } = decoded as ITokenPayload;
      return sub;
    } catch (_err) {
      return undefined;
    }
  };
}
