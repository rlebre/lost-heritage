export default function () {

  return {
    postList: [],
    filteredPostList: [],

    pendingPostsList: [],
    declinedPostsList: [],

    postDetails: {},
    loadingPosts: false,

    creatingPost: false,
    createPostSuccess: false,
    editPostSuccess: false,

    likingPost: false,
    commentingPost: false,
    approvingPost: false,
    decliningPost: false,
    editingPost: false,

    uploadedImages: [],
    uploadingImages: false,

    errors: {}
  }
}
