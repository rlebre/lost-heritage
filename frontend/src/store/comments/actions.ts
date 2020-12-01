export function likeComment(this: any, { commit }: any, commentd: string) {
    commit('likeCommentRequest');

    this.$axios
        .post(`${process.env.API}/api/v1/comments/${commentd}/like`)
        .then((response: any) => {
            commit('likeCommentSuccess', response.data);
        })
        .catch((error: any) => {
            commit('likeCommentFailure', error.response.data);
        })
}