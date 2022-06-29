import { LIMIT_LIST_ITEM } from '@/constants'
export const articleRepository = (axios) => ({
  getArticle(slug) {
    return axios.$get(`/articles/${slug}`)
  },
  getArticleList({
    tag,
    author,
    favorited,
    limit = LIMIT_LIST_ITEM,
    offset = 0,
  }) {
    const defaultParam = {
      ...(tag && { tag }),
      ...(author && { author }),
      ...(favorited && { favorited }),
    }

    return axios.$get('/articles', {
      params: { ...defaultParam, limit, offset },
    })
  },
  getFeedArticleList({
    limit = LIMIT_LIST_ITEM,
    offset = 0,
  }) {
    return axios.$get('/articles/feed', {
      params: {
        limit,
        offset,
      },
    })
  },
  createArticle(payload) {
    return axios.$post('/articles', { article: payload })
  },
  updateArticle(request) {
    return axios.$put(`/articles/${request.slug}`, { article: request.payload })
  },
  deleteArticle(slug) {
    return axios.$delete(`/articles/${slug}`)
  },
  favoriteArticle(slug) {
    return axios.$post(`/articles/${slug}/favorite`)
  },
  unFavoriteArticle(slug) {
    return axios.$delete(`/articles/${slug}/favorite`)
  },
})
