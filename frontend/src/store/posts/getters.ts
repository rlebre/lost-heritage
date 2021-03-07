import { niceDate } from '../../helpers/niceDate';

export function postList(state: any) {
    return state.postList;
}

export function postListHasNextPage(state: any) {
    return state.pages >= state.lastFetchedPage;
}

export function lastFetchedPage(state: any) {
    return state.lastFetchedPage;
}

export function approvedPostsList(state: any) {
    return state.approvedPostsList.map((obj: any) => ({
        ...obj,
        approvedByUsername: obj.approvedBy && obj.approvedBy.username,
        approvedByEmail: obj.approvedBy && obj.approvedBy.email,
        approvedAt: obj.approvedBy && niceDate(obj.approvedAt)
    }));
}

export function pendingPostsList(state: any) {
    return state.pendingPostsList;
}

export function declinedPostsList(state: any) {
    return state.declinedPostsList.map((obj: any) => ({
        ...obj,
        declinedByUsername: obj.declinedBy && obj.declinedBy.username || '',
        declinedByEmail: obj.declinedBy && obj.declinedBy.email || '',
        declinedAt: obj.declinedAt && niceDate(obj.declinedAt)
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