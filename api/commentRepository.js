export const commentRepository = (axios) => ({
  getCommentList(slug) {
    return axios.$get(`/articles/${slug}/comments`)
  },
  createComment({
    body,
    slug,
  }) {
    return axios.$post(`/articles/${slug}/comments`, {
      comment: { body },
    })
  },
  deleteComment({ slug, id }) {
    return axios.$delete(`/articles/${slug}/comments/${id}`)
  },
})
