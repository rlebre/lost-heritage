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


// ---------- POST CREATE --------------
export function createPostRequest(state: any) {
    state.creatingPost = true;
}

export function createPostSuccess(state: any, newPost: any) {
    state.createPostSuccess = true;
    state.creatingPost = false;
    state.postList.push(newPost);
    state.errors = [];
}

export function createPostFailure(state: any, error: any) {
    state.createPostSuccess = false;
    state.creatingPost = false;
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
