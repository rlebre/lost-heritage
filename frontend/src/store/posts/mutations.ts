
export function getPostsListRequest(state: any) {
    state.loadingPosts = true;
}

export function getPostsListSuccess(state: any, newPostsList: any) {
    state.loadingPosts = false;
    state.postList = newPostsList;
}

export function getPostsListFailure(state: any) {
    state.loadingPosts = false;
    state.postList = [];
}