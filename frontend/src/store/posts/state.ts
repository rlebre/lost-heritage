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

    likingPost: false,
    commentingPost: false,
    approvingPost: false,
    decliningPost: false,

    uploadedImages: [],
    uploadingImages: false,

    errors: {}
  }
}
