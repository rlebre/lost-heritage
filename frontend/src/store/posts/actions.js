
export function fetchPosts({ commit }) {
    commit('getPostsListRequest');

    this.$axios
        .get(`${process.env.API}/posts`)
        .then(response => {
            commit('getPostsListSuccess', response.data);
        })
        .catch(error => {
            commit('getPostsListFailure', error);
        })
}