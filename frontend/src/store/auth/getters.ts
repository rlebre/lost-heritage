export function getJwtToken(state: any) {
    return state.jwtToken;
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