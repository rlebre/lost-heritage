import * as jwt from 'jsonwebtoken';

export function getJwtToken(state: any) {
    return state.jwtToken;
}

export function getUsername(state: any) {
    return state.jwtToken ? jwt.decode(state.jwtToken).username : null;
}

export function isLoggingIn(state: any) {
    return state.loggingIn;
}

export function isLoggingOut(state: any) {
    return state.loggingOut;
}

export function registering(state: any) {
    return state.registering;
}

export function errors(state: any) {
    return state.errors;
}