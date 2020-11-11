// ---------- POST FETCH --------------
export function getPostsListRequest(state: any) {
    state.loadingPosts = true;
}

export function getPostsListSuccess(state: any, newPostsList: any) {
    state.loadingPosts = false;
    state.postList = newPostsList;
}

export function getPostsListFailure(state: any, error: any) {
    state.loadingPosts = false;
    state.postList = [];
}


// ---------- POST CREATE --------------
export function createPostRequest(state: any) {
    state.creatingPost = true;
}

export function createPostSuccess(state: any, newPost: any) {
    state.creatingPost = false;
    state.postList.push(newPost);
}

export function createPostFailure(state: any, error: any) {
    state.creatingPost = false;
}

// ---------- POST LIKE --------------
export function likePostRequest(state: any) {
    state.likingPost = true;
}

export function likePostSuccess(state: any, newPost: any) {
    state.likingPost = false;

    const index = state.postList.map((post: any) => post._id).indexOf(newPost._id);
    state.postList.splice(index, 1, newPost);
}

export function likePostFailure(state: any, error: any) {
    state.likingPost = false;
}

// ---------- POST COMMENT --------------
export function commentPostRequest(state: any) {
    state.commentingPost = true;
}

export function commentPostSuccess(this: any, state: any, newPost: any) {
    state.commentingPost = false;

    const index = state.postList.map((post: any) => post._id).indexOf(newPost._id);
    state.postList.splice(index, 1, newPost);
}

export function commentPostFailure(state: any, error: any) {
    state.commentingPost = false;
}


// ---------- POST SEARCH --------------
export function getFilteredPostsRequest(state: any) {
    state.loadingPosts = true;
}

export function getFilteredPostsSuccess(state: any, filteredPostList: any) {
    state.loadingPosts = false;
    state.filteredPostList = filteredPostList;
}

export function getFilteredPostsFailure(state: any, error: any) {
    state.loadingPosts = false;
    state.filteredPostList = state.postList;
}