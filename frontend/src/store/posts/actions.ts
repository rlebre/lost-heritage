
export function fetchPosts(this: any, { commit }: any) {
    commit('getPostsListRequest');

    this.$axios
        .get(`${process.env.API}/posts`)
        .then((response: any) => {
            commit('getPostsListSuccess', response.data);
        })
        .catch((error: any) => {
            commit('getPostsListFailure', error);
        })
}