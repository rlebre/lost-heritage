
export function postList(state) {
    return state.postList;
}
export function postListForMap(state) {
    return state.postList.map(obj => ({
        ...obj,
        clicked: false
    }));
}

export function isLoadingPosts(state) {
    return state.loadingPosts;
}