
export function getPostsListRequest(state) {
    state.loadingPosts = true;
}

export function getPostsListSuccess(state, newPostsList) {
    state.loadingPosts = false;
    state.postList = newPostsList;
}

export function getPostsListFailure(state) {
    state.loadingPosts = false;
    state.postList = [];
}