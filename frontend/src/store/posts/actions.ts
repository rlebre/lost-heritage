export function fetchPosts(this: any, { commit }: any) {
    commit('getPostsListRequest');

    this.$axios
        .get(`${process.env.API}/api/v1/posts`)
        .then((response: any) => {
            commit('getPostsListSuccess', response.data);
        })
        .catch((error: any) => {
            commit('getPostsListFailure', error.response.data);
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
            commit('createPostFailure', error.response.data);
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
            commit('likePostFailure', error.response.data);
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
            commit('commentPostFailure', error.response.data);
        })
}

export function searchPosts(this: any, { commit }: any, data: any) {
    commit('getFilteredPostsRequest');

    const { query, sortBy, sortType } = data;

    let url = `${process.env.API}/api/v1/posts/`;
    if (query) {
        url = `${process.env.API}/api/v1/posts/search?query=${query}`

        url = sortBy ? url.concat(`&sortBy=${sortBy}`) : url;
        url = sortType ? url.concat(`&sortType=${sortType}`) : url;
    }

    this.$axios
        .get(url, data)
        .then((response: any) => {
            commit('getFilteredPostsSuccess', response.data);
        })
        .catch((error: any) => {
            commit('getFilteredPostsFailure', error.response.data);
        })
}




export function uploadImages(this: any, { commit }: any, data: any) {
    commit('imageUploadRequest');
    const { images, postUid } = data;

    const formData = new FormData();
    images.forEach((photo: any) => {
        formData.append(
            'image',
            photo
        );
    });

    this.$axios
        .post(`${process.env.API}/api/v1/image/upload?postUid=${postUid}`, formData)
        .then((response: any) => {
            commit('imageUploadSuccess', response.data);
        })
        .catch((error: any) => {
            commit('imageUploadFailure', error.response.data);
        })
}

export function removeImageFromList(this: any, { commit }: any, data: any) {
    const { imageKey, postUid } = data;
    commit('removeImageFromListRequest', imageKey);

    this.$axios.post(`${process.env.API}/api/v1/image/remove`, { key: imageKey, postUid })
        .catch((error: any) => {
            commit('imageUploadFailure', error.response.data);
        })
}