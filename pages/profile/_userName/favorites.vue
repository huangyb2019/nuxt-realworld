<template>
  <!-- <article-list-loading v-if="fetchState.pending" /> -->

  <article-preview-list
    :article-list="articleList"
    @toggle-favorite-article="toggleFavoriteArticleByList"
  />
</template>

<script>
import ArticlePreviewList from '@/components/articleList/ArticlePreviewList.vue'
// import ArticleListLoading from '@/components/articleList/ArticleListLoading.vue'

export default {
  name: 'ProfileFavoritePage',
  components: {
    ArticlePreviewList,
    // ArticleListLoading,
  },
  async asyncData({ $repository, params, query }) {
    const { articles, articlesCount } =
      await $repository.article.getArticleList({
        favorited: params.userName,
      })
    return { articleList: articles, articlesCount }
  },
  methods: {
    toggleFavoriteArticleByList() {},
  },
}
</script>
