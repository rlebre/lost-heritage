import * as jwt from 'jsonwebtoken';
import moment from 'moment';

class AuthService {
    tokenKey = 'auth_token'

    getToken() {
        return localStorage.getItem(this.tokenKey);
    }

    decode(token: any) {
        return jwt.decode(token);
    }

    getExpiration(token: any) {
        const exp = this.decode(token).exp;
        return moment.unix(exp);
    }

    getUsername() {
        return this.decode(this.getToken()).username;
    }

    isValid(token: any) {
        return moment().isBefore(this.getExpiration(token));
    }

    invalidateUser() {
        localStorage.removeItem(this.tokenKey);
    }

    saveToken(token: any) {
        localStorage.setItem(this.tokenKey, token);
    }

    isAuthenticated() {
        const token = this.getToken();

        return (token && this.isValid(token) ? true : false);
    }
}

export default new AuthService();