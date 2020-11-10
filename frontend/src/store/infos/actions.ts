export function fetchExistingCounties(this: any, { commit }: any) {
    commit('getExistingCountiesListRequest');

    this.$axios
        .get(`${process.env.API}/api/v1/infos/existing-counties`)
        .then((response: any) => {
            commit('getExistingCountiesSuccess', response.data);
        })
        .catch((error: any) => {
            commit('getExistingCountiesFailure', error);
        })
}
