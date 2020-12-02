// ---------- LOGIN --------------
export function loginRequest(state: any) {
    state.loggingIn = true;
}

export function loginSuccess(state: any, jwtToken: any) {
    state.loggingIn = false;
    state.jwtToken = jwtToken.jwt;
    localStorage.setItem("user_token", jwtToken.jwt);
    state.errors = [];
}

export function loginFailure(state: any, error: any) {
    state.loggingIn = false;
    state.errors = error.errors;
}

// ---------- LOGOUT --------------
export function logout(state: any) {
    state.loggingoOut = false;
    state.jwtToken = null;
    localStorage.removeItem("user_token");
    state.errors = [];
}

// ---------- REGISTER --------------
export function registerRequest(state: any) {
    state.registering = true;
}

export function registerSuccess(state: any, jwtToken: any) {
    state.registering = false;
    state.errors = [];
}

export function registerFailure(state: any, error: any) {
    state.registering = false;
    state.errors = error.errors;
}