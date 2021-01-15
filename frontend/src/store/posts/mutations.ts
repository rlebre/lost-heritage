// ---------- POST FETCH --------------
export function getPostsListRequest(state: any) {
    state.loadingPosts = true;
}

export function getPostsListSuccess(state: any, newPostsList: any) {
    state.loadingPosts = false;
    state.postList = newPostsList;
    state.errors = [];
}

export function getPostsListFailure(state: any, error: any) {
    state.loadingPosts = false;
    state.postList = [];
    state.errors = error.errors;
}

// ---------- POST DETAILS --------------
export function getPostDetailsRequest(state: any) {
    state.loadingPosts = true;
}

export function getPostDetailsSuccess(state: any, post: any) {
    state.loadingPosts = false;
    state.postDetails = post;
}

export function getPostDetailsFailure(state: any, error: any) {
    state.loadingPosts = false;
    state.postDetails = null;
    state.errors = error.errors;
}

// ---------- POST APPROVED FETCH --------------
export function getApprovedPostsRequest(state: any) {
    state.loadingPosts = true;
}

export function getApprovedPostsSuccess(state: any, newPostsList: any) {
    state.loadingPosts = false;
    state.approvedPostsList = newPostsList;
    state.errors = [];
}

export function getApprovedPostsFailure(state: any, error: any) {
    state.loadingPosts = false;
    state.approvedPostsList = [];
    state.errors = error.errors;
}

// ---------- POST PENDING FETCH --------------
export function getPendingPostsRequest(state: any) {
    state.loadingPosts = true;
}

export function getPendingPostsSuccess(state: any, newPostsList: any) {
    state.loadingPosts = false;
    state.pendingPostsList = newPostsList;
    state.errors = [];
}

export function getPendingPostsFailure(state: any, error: any) {
    state.loadingPosts = false;
    state.pendingPostsList = [];
    state.errors = error.errors;
}

// ---------- POST DECLINED FETCH --------------
export function getDeclinedPostsRequest(state: any) {
    state.loadingPosts = true;
}

export function getDeclinedPostsSuccess(state: any, newPostsList: any) {
    state.loadingPosts = false;
    state.declinedPostsList = newPostsList;
    state.errors = [];
}

export function getDeclinedPostsFailure(state: any, error: any) {
    state.loadingPosts = false;
    state.declinedPostsList = [];
    state.errors = error.errors;
}


// ---------- POST CREATE --------------
export function createPostRequest(state: any) {
    state.creatingPost = true;
}

export function createPostSuccess(state: any, newPost: any) {
    state.postList.push(newPost);
    state.errors = [];
    state.createPostSuccess = true;
    state.creatingPost = false;
}

export function createPostFailure(state: any, error: any) {
    state.createPostSuccess = false;
    state.creatingPost = false;
    state.errors = error.errors;
}


// ---------- POST EDIT --------------
export function editPostRequest(state: any) {
    state.creatingPost = true;
}

export function editPostSuccess(state: any, newPost: any) {
    const index = state.postList.map((post: any) => post._id).indexOf(newPost._id);
    state.postList.splice(index, 1, newPost);

    state.errors = [];
    state.editPostSuccess = true;
    state.editingPost = false;
}

export function editPostFailure(state: any, error: any) {
    state.editPostSuccess = false;
    state.editingPost = false;
    state.errors = error.errors;
}


// ---------- POST LIKE --------------
export function likePostRequest(state: any) {
    state.likingPost = true;
}

export function likePostSuccess(state: any, newPost: any) {
    state.likingPost = false;
    state.errors = [];

    const index = state.postList.map((post: any) => post._id).indexOf(newPost._id);
    state.postList.splice(index, 1, newPost);
}

export function likePostFailure(state: any, error: any) {
    state.likingPost = false;
    state.errors = error.errors;
}

// ---------- POST COMMENT --------------
export function commentPostRequest(state: any) {
    state.commentingPost = true;
}

export function commentPostSuccess(this: any, state: any, newPost: any) {
    state.commentingPost = false;
    state.errors = [];

    const index = state.postList.map((post: any) => post._id).indexOf(newPost._id);
    state.postList.splice(index, 1, newPost);
}

export function commentPostFailure(state: any, error: any) {
    state.commentingPost = false;
    state.errors = error.errors;
}


// ---------- POST SEARCH --------------
export function getFilteredPostsRequest(state: any) {
    state.loadingPosts = true;
}

export function getFilteredPostsSuccess(state: any, filteredPostList: any) {
    state.loadingPosts = false;
    state.filteredPostList = filteredPostList;
    state.errors = [];
}

export function getFilteredPostsFailure(state: any, error: any) {
    state.loadingPosts = false;
    state.filteredPostList = state.postList;
    state.errors = error.errors;
}

// ---------- POST APPROVE --------------
export function approvePostRequest(state: any) {
    state.approvingPost = true;
}

export function approvePostSuccess(state: any, newPost: any) {
    state.approvingPost = false;
    state.errors = [];

    let index = state.pendingPostsList.map((post: any) => post._id).indexOf(newPost._id);
    state.pendingPostsList.splice(index, 1);

    index = state.declinedPostsList.map((post: any) => post._id).indexOf(newPost._id);
    state.declinedPostsList.splice(index, 1);

    state.postList.push(newPost)
}

export function approvePostFailure(state: any, error: any) {
    state.approvingPost = false;
    state.errors = error.errors;
}

// ---------- POST DECLINE --------------
export function declinePostRequest(state: any) {
    state.decliningPost = true;
}

export function declinePostSuccess(state: any, newPost: any) {
    state.decliningPost = false;
    state.errors = [];

    let index = state.pendingPostsList.map((post: any) => post._id).indexOf(newPost._id);
    state.pendingPostsList.splice(index, 1);

    index = state.postList.map((post: any) => post._id).indexOf(newPost._id);
    state.postList.splice(index, 1);

    index = state.approvedPostsList.map((post: any) => post._id).indexOf(newPost._id);
    state.approvedPostsList.splice(index, 1);

    state.declinedPostsList.push(newPost)
}

export function declinePostFailure(state: any, error: any) {
    state.decliningPost = false;
    state.errors = error.errors;
}

// ---------- IMAGE UPLOAD --------------
export function imageUploadRequest(state: any) {
    state.uploadingImages = true;
}

export function imageUploadSuccess(state: any, uploadedImages: any) {
    state.uploadingImages = false;
    state.uploadedImages = uploadedImages;
}

export function imageUploadFailure(state: any, error: any) {
    state.uploadingImages = false;
    state.uploadedImages = [];
    state.errors = error.errors;
}

// ---------- IMAGE UPLOAD --------------
export function removeImageFromListRequest(state: any, imageKey: string) {
    state.uploadedImages = state.uploadedImages.filter((image: any) => image.key !== imageKey);
}
