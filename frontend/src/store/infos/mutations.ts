// ---------- EXISTING COUNTIES FETCH --------------
export function getExistingCountiesListRequest(state: any) {
    state.loadingExistingCounties = true;
}

export function getExistingCountiesSuccess(state: any, existingCounties: any) {
    state.loadingExistingCounties = false;
    state.existingCounties = existingCounties;
}

export function getExistingCountiesFailure(state: any, error: any) {
    state.loadingExistingCounties = false;
    state.existingCounties = [];
}
