export function likeComment(this: any, { commit }: any, commentd: string) {
    commit('likeCommentRequest');

    return this.$axios
        .post(`${process.env.API}/api/v1/comments/${commentd}/like`)
        .then((response: any) => {
            commit('likeCommentSuccess', response.data);
            return Promise.resolve(response.data);
        })
        .catch((error: any) => {
            commit('likeCommentFailure', error.response.data);
            return Promise.reject(error.response.data.errors);
        })
}