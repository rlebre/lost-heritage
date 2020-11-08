
export function postList(state: any) {
    return state.postList;
}

export function postListWithClickField(state: any) {
    return state.postList.map((obj: any) => ({
        ...obj,
        clicked: false
    }));
}

export function isLoadingPosts(state: any) {
    return state.loadingPosts;
}

export function isCreatingPosts(state: any) {
    return state.creatingPost;
}

export function isLikingPost(state: any) {
    return state.likingPost;
}

export function isCommentingPost(state: any) {
    return state.commentingPost;
}