"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
class Encrypt {
    encryptPassword = (password) => {
        const salt = bcrypt_1.default.genSaltSync(5);
        const encryptedPassword = bcrypt_1.default.hashSync(password, salt);
        return encryptedPassword;
    };
    checkPassword = (password, passwordDb) => bcrypt_1.default.compareSync(password, passwordDb);
}
exports.default = Encrypt;
//# sourceMappingURL=hash.js.map