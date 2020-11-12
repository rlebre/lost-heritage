export default function () {

  return {
    postList: [],
    filteredPostList: [],
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
