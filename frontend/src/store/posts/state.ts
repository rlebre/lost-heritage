export default function () {

  return {
    postList: [],
    filteredPostList: [],
    postDetails: {},
    loadingPosts: false,

    creatingPost: false,
    createPostSuccess: false,

    likingPost: false,
    commentingPost: false,

    uploadedImages: [],
    uploadingImages: false,

    errors: {}
  }
}
