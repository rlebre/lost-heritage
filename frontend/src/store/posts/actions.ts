export function fetchPosts(this: any, { commit }: any) {
    commit('getPostsListRequest');

    this.$axios
        .get(`${process.env.API}/api/v1/posts`)
        .then((response: any) => {
            commit('getPostsListSuccess', response.data);
        })
        .catch((error: any) => {
            commit('getPostsListFailure', error);
        })
}

export function createPost(this: any, { commit }: any, newPost: any) {
    commit('createPostRequest');

    this.$axios
        .post(`${process.env.API}/api/v1/posts/createPost`, newPost)
        .then((response: any) => {
            commit('createPostSuccess', response.data);
        })
        .catch((error: any) => {
            commit('createPostFailure', error);
        })
}


export function likePost(this: any, { commit }: any, postId: string) {
    commit('likePostRequest');

    this.$axios
        .post(`${process.env.API}/api/v1/posts/${postId}/like`)
        .then((response: any) => {
            commit('likePostSuccess', response.data);
        })
        .catch((error: any) => {
            commit('likePostFailure', error);
        })
}


export function commentPost(this: any, { commit }: any, data: any) {
    commit('commentPostRequest');

    const { postId, comment } = data;

    this.$axios
        .post(`${process.env.API}/api/v1/posts/${postId}/comment`, { comment })
        .then((response: any) => {
            commit('commentPostSuccess', response.data);
        })
        .catch((error: any) => {
            commit('commentPostFailure', error);
        })
}