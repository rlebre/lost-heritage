import { niceDate } from '../../helpers/niceDate';

export function postList(state: any) {
    return state.postList;
}

export function approvedPostsList(state: any) {
    return state.approvedPostsList.map((obj: any) => ({
        ...obj,
        approvedByUsername: obj.approvedBy.username,
        approvedByEmail: obj.approvedBy.email,
        approvedAt: niceDate(obj.approvedAt)
    }));
}

export function pendingPostsList(state: any) {
    return state.pendingPostsList;
}

export function declinedPostsList(state: any) {
    return state.declinedPostsList.map((obj: any) => ({
        ...obj,
        declinedByUsername: obj.declinedBy.username,
        declinedByEmail: obj.declinedBy.email,
        declinedAt: niceDate(obj.declinedAt)
    }));
}

export function postDetails(state: any) {
    return state.postDetails;
}

export function lastCreatedPost(state: any) {
    return state.postList[state.postList.length - 1];
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