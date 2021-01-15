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

export function fetchPostDetails(this: any, { commit }: any, postId: string) {
    commit('getPostDetailsRequest');

    this.$axios
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

    this.$axios
        .get(`${process.env.API}/api/v1/posts/approved`)
        .then((response: any) => {
            commit('getApprovedPostsSuccess', response.data);
        })
        .catch((error: any) => {
            commit('getApprovedPostsFailure', error.response.data);
        })
}

export function fetchPendingPosts(this: any, { commit }: any) {
    commit('getPendingPostsRequest');

    this.$axios
        .get(`${process.env.API}/api/v1/posts/pending`)
        .then((response: any) => {
            commit('getPendingPostsSuccess', response.data);
        })
        .catch((error: any) => {
            commit('getPendingPostsFailure', error.response.data);
        })
}

export function fetchDeclinedPosts(this: any, { commit }: any) {
    commit('getDeclinedPostsRequest');

    this.$axios
        .get(`${process.env.API}/api/v1/posts/declined`)
        .then((response: any) => {
            commit('getDeclinedPostsSuccess', response.data);
        })
        .catch((error: any) => {
            commit('getDeclinedPostsFailure', error.response.data);
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

export function editPost(this: any, { commit }: any, newPost: any) {
    commit('editPostRequest');

    this.$axios
        .patch(`${process.env.API}/api/v1/posts/${newPost._id}`, newPost)
        .then((response: any) => {
            commit('editPostSuccess', response.data);
        })
        .catch((error: any) => {
            commit('editPostFailure', error.response.data);
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




export function approvePost(this: any, { commit }: any, postId: string) {
    commit('approvePostRequest');

    this.$axios
        .post(`${process.env.API}/api/v1/posts/${postId}/approve`)
        .then((response: any) => {
            commit('approvePostSuccess', response.data);
        })
        .catch((error: any) => {
            commit('approvePostFailure', error.response.data);
        })
}

export function declinePost(this: any, { commit }: any, postId: string) {
    commit('declinePostRequest');

    this.$axios
        .post(`${process.env.API}/api/v1/posts/${postId}/decline`)
        .then((response: any) => {
            commit('declinePostSuccess', response.data);
        })
        .catch((error: any) => {
            commit('declinePostFailure', error.response.data);
        })
}