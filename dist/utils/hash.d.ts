export default class Encrypt {
    encryptPassword: (password: string) => string;
    checkPassword: (password: string, passwordDb: string) => boolean;
}
