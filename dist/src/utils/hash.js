"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkPassword = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
class Encrypt {
    constructor() {
        this.encryptPassword = (password) => {
            const salt = bcrypt_1.default.genSaltSync(5);
            const encryptedPassword = bcrypt_1.default.hashSync(password, salt);
            return encryptedPassword;
        };
        this.checkPassword = (password, passwordDb) => bcrypt_1.default.compareSync(password, passwordDb);
    }
}
exports.default = Encrypt;
const checkPassword = (password, passwordDb) => bcrypt_1.default.compareSync(password, passwordDb);
exports.checkPassword = checkPassword;
//# sourceMappingURL=hash.js.map