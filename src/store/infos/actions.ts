export function fetchExistingCounties(this: any, { commit }: any) {
    commit('getExistingCountiesListRequest');

    return this.$axios
        .get(`${process.env.API}/api/v1/infos/existing-counties`)
        .then((response: any) => {
            commit('getExistingCountiesSuccess', response.data);
            return Promise.resolve(response.data);
        })
        .catch((error: any) => {
            commit('getExistingCountiesFailure', error.response.data.errors);
            return Promise.reject(error.response.data.errors);
        })
}
