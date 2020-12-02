export function login(this: any, { commit }: any, credentials: any) {
    commit('loginRequest');

    return this.$axios
        .post(`${process.env.API}/api/v1/users/login`, credentials)
        .then((response: any) => {
            const token = response.data;
            commit('loginSuccess', token);
            return Promise.resolve(token);
        })
        .catch((error: any) => {
            const errors = error.response.data.errors;
            commit('loginFailure', errors);
            return Promise.reject(errors);
        });
}

export function logout(this: any, { commit }: any) {
    commit('logout');
}

export function register(this: any, { commit }: any, userData: any) {
    commit('registerRequest');

    this.$axios
        .post(`${process.env.API}/api/v1/users/register`, userData)
        .then((response: any) => {
            commit('registerSuccess', response.data);
        })
        .catch((error: any) => {
            commit('registerFailure', error.response.data);
        })
}