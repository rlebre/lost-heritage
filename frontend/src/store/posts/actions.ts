export function fetchPosts(this: any, { commit }: any) {
    commit('getPostsListRequest');

    return this.$axios
        .get(`${process.env.API}/api/v1/posts`)
        .then((response: any) => {
            commit('getPostsListSuccess', response.data);
            return Promise.resolve(response.data);
        })
        .catch((error: any) => {
            commit('getPostsListFailure', error.response.data);
            return Promise.reject(error.response.data.errors);
        })
}

export function fetchPostDetails(this: any, { commit }: any, postId: string) {
    commit('getPostDetailsRequest');

    return this.$axios
        .get(`${process.env.API}/api/v1/posts/${postId}`)
        .then((response: any) => {
            commit('getPostDetailsSuccess', response.data);
        })
        .catch((error: any) => {
            commit('getPostDetailsFailure', error.response.data);
        })
}

export function fetchApprovedPosts(this: any, { commit }: any) {
    commit('getApprovedPostsRequest');

    return this.$axios
        .get(`${process.env.API}/api/v1/posts/approved`)
        .then((response: any) => {
            commit('getApprovedPostsSuccess', response.data);
            return Promise.resolve(response.data);
        })
        .catch((error: any) => {
            commit('getApprovedPostsFailure', error.response.data);
            return Promise.reject(error.response.data.errors);
        })
}

export function fetchPendingPosts(this: any, { commit }: any) {
    commit('getPendingPostsRequest');

    return this.$axios
        .get(`${process.env.API}/api/v1/posts/pending`)
        .then((response: any) => {
            commit('getPendingPostsSuccess', response.data);
            return Promise.resolve(response.data);
        })
        .catch((error: any) => {
            commit('getPendingPostsFailure', error.response.data);
            return Promise.reject(error.response.data.errors);
        })
}

export function fetchDeclinedPosts(this: any, { commit }: any) {
    commit('getDeclinedPostsRequest');

    return this.$axios
        .get(`${process.env.API}/api/v1/posts/declined`)
        .then((response: any) => {
            commit('getDeclinedPostsSuccess', response.data);
            return Promise.resolve(response.data);
        })
        .catch((error: any) => {
            commit('getDeclinedPostsFailure', error.response.data);
            return Promise.reject(error.response.data.errors);
        })
}

export function createPost(this: any, { commit }: any, newPost: any) {
    commit('createPostRequest');

    return this.$axios
        .post(`${process.env.API}/api/v1/posts/createPost`, newPost)
        .then((response: any) => {
            commit('createPostSuccess', response.data);
            return Promise.resolve(response.data);
        })
        .catch((error: any) => {
            commit('createPostFailure', error.response.data);
            return Promise.reject(error.response.data.errors);
        })
}

export function editPost(this: any, { commit }: any, newPost: any) {
    commit('editPostRequest');

    return this.$axios
        .patch(`${process.env.API}/api/v1/posts/${newPost._id}`, newPost)
        .then((response: any) => {
            commit('editPostSuccess', response.data);
            return Promise.resolve(response.data);
        })
        .catch((error: any) => {
            commit('editPostFailure', error.response.data);
            return Promise.reject(error.response.data.errors);
        })
}

export function likePost(this: any, { commit }: any, postId: string) {
    commit('likePostRequest');

    return this.$axios
        .post(`${process.env.API}/api/v1/posts/${postId}/like`)
        .then((response: any) => {
            commit('likePostSuccess', response.data);
            return Promise.resolve(response.data);
        })
        .catch((error: any) => {
            commit('likePostFailure', error.response.data);
            return Promise.reject(error.response.data.errors);
        })
}


export function commentPost(this: any, { commit }: any, data: any) {
    commit('commentPostRequest');

    const { postId, comment } = data;

    return this.$axios
        .post(`${process.env.API}/api/v1/posts/${postId}/comment`, { comment })
        .then((response: any) => {
            commit('commentPostSuccess', response.data);
            return Promise.resolve(response.data);
        })
        .catch((error: any) => {
            commit('commentPostFailure', error.response.data);
            return Promise.reject(error.response.data.errors);
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

    return this.$axios
        .get(url, data)
        .then((response: any) => {
            commit('getFilteredPostsSuccess', response.data);
            return Promise.resolve(response.data);
        })
        .catch((error: any) => {
            commit('getFilteredPostsFailure', error.response.data);
            return Promise.reject(error.response.data.errors);
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

    return this.$axios
        .post(`${process.env.API}/api/v1/image/upload?postUid=${postUid}`, formData)
        .then((response: any) => {
            commit('imageUploadSuccess', response.data);
            return Promise.resolve(response.data);
        })
        .catch((error: any) => {
            commit('imageUploadFailure', error.response.data);
            return Promise.reject(error.response.data.errors);
        })
}

export function removeImageFromList(this: any, { commit }: any, data: any) {
    const { imageKey, postUid } = data;
    commit('removeImageFromListRequest', imageKey);

    return this.$axios.post(`${process.env.API}/api/v1/image/remove`, { key: imageKey, postUid })
        .catch((error: any) => {
            commit('imageUploadFailure', error.response.data);
            return Promise.reject(error.response.data.errors);
        })
}




export function approvePost(this: any, { commit }: any, postId: string) {
    commit('approvePostRequest');

    return this.$axios
        .post(`${process.env.API}/api/v1/posts/${postId}/approve`)
        .then((response: any) => {
            commit('approvePostSuccess', response.data);
            return Promise.resolve(response.data);
        })
        .catch((error: any) => {
            commit('approvePostFailure', error.response.data);
            return Promise.reject(error.response.data.errors);
        })
}

export function declinePost(this: any, { commit }: any, postId: string) {
    commit('declinePostRequest');

    return this.$axios
        .post(`${process.env.API}/api/v1/posts/${postId}/decline`)
        .then((response: any) => {
            commit('declinePostSuccess', response.data);
            return Promise.resolve(response.data);
        })
        .catch((error: any) => {
            commit('declinePostFailure', error.response.data);
            return Promise.reject(error.response.data.errors);
        })
}