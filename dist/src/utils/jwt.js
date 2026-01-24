"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const secret = process.env.JWT_SECRET || 'secret';
class Token {
    constructor() {
        this.createToken = (id) => {
            const token = jsonwebtoken_1.default.sign({ data: id }, secret, {
                expiresIn: '30d',
                algorithm: 'HS256',
            });
            return token;
        };
        this.createUserToken = (payload) => {
            const token = jsonwebtoken_1.default.sign(payload, secret, {
                expiresIn: '30d',
                algorithm: 'HS256',
            });
            return token;
        };
        this.validateToken = (token) => {
            try {
                const decoded = jsonwebtoken_1.default.verify(token, secret);
                const { data } = decoded;
                return data;
            }
            catch (_err) {
                return undefined;
            }
        };
        this.validateUserToken = (token) => {
            try {
                const decoded = jsonwebtoken_1.default.verify(token, secret);
                if (decoded.id && decoded.type && decoded.companyId) {
                    return decoded;
                }
                return undefined;
            }
            catch (_err) {
                return undefined;
            }
        };
    }
}
exports.default = Token;
//# sourceMappingURL=jwt.js.map