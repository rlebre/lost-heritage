
export function postList(state: any) {
    return state.postList;
}

export function postListWithClickField(state: any) {
    return state.postList.map((obj: any) => ({
        ...obj,
        clicked: false
    }));
}

export function filteredPostList(state: any) {
    return state.filteredPostList.map((obj: any) => ({
        ...obj,
        clicked: false
    }));
}

export function isLoadingPosts(state: any) {
    return state.loadingPosts;
}

export function isCreatingPost(state: any) {
    return state.creatingPost;
}

export function isCreatePostSuccess(state: any) {
    return state.createPostSuccess;
}

export function isLikingPost(state: any) {
    return state.likingPost;
}

export function isCommentingPost(state: any) {
    return state.commentingPost;
}


export function uploadedImages(state: any) {
    return state.uploadedImages;
}

export function isUploadingImages(state: any) {
    return state.uploadingImages;
}

export function errors(state: any) {
    return state.errors;
}