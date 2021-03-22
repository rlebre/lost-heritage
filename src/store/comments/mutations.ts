// ---------- COMMENT LIKE --------------
export function likeCommentRequest(state: any) {
    state.likingComment = true;
}

export function likeCommentSuccess(state: any, newComment: any) {
    state.likingComment = false;
    state.likeCommentSuccess = true;
    state.errors = [];
}

export function likeCommentFailure(state: any, error: any) {
    state.likingComment = false;
    state.likeCommentSucces = false;
    state.likeCommentError = error.errors[0];
}