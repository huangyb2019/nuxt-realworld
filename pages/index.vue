<template>
  <div class="home-page">
    <Banner />
    <div class="container">
      <div class="row">
        <div class="col-md-9">
          <tab-navigation
            :tab-type="feedType"
            :tab-items="tabItems"
            @on-click-tab="getArticleListByFeed"
          />

          <!-- <article-list-loading v-if="fetchState.pending" /> -->

          <!-- <template v-if="isLogin"> -->
            <article-preview-list
              :article-list="articleList"
              @toggle-favorite-article="toggleFavoriteArticleByList"
            />
            <Pagination :total-count="articleCount" @fetch-data="fetchData" />
          <!-- </template> -->
        </div>

        <!-- <template v-if="!fetchState.pending && !fetchState.error"> -->
          <div class="col-md-3">
            <popular-tag-list
              :tag-list="tagList"
              @on-click-tag="getArticleListByTag"
            />
          </div>
        <!-- </template> -->
      </div>
    </div>
  </div>
</template>

<script>
import Banner from '../components/banner/Banner.vue'
import TabNavigation from '../components/articleList/TabNavigation.vue'
import PopularTagList from '../components/articleList/PopularTagList.vue'
import Pagination from '../components/common/Pagination.vue'
import { feedTypes } from '@/constants'
export default {
  name: 'StagePage',
  components: {
    Banner,
    TabNavigation,
    PopularTagList,
    Pagination
  },
  async asyncData({app}) {
    const data = await app.$repository.article.getArticleList({offset:0})
    return {articleList:data.articles,articleCount:data.articlesCount}
  },
  data() {
    return {
      feedType:'GLOBAL',
      tagList:["implementations","welcome","introduction","codebaseShow"],
      articleList:[],
      articleCount: 0
    }
  },
  computed: {
    tabItems() {
      const [, globalFeed] = feedTypes
      return this.$store.state.user.isLogin ? feedTypes : [globalFeed]
    }
  },
  methods: {
    async getArticleListByFeed(type) {

       const fetchArticleBy = {
          GLOBAL: 'getArticleList',
          YOUR: 'getFeedArticleList',
    }
    const data = await this.$repository.article[fetchArticleBy[type]]({offset:0})
    this.articleList = data.articles
    this.articleCount = data.articleCount || 0
    this.feedType = type
    },

   async toggleFavoriteArticleByList(article, articleIndex) {
      const response = await (article.favorited ? this.$repository.article.unFavoriteArticle(article.slug) : this.$repository.article.favoriteArticle(article.slug))
      if (response.article) {
      this.$set(this.articleList,articleIndex,response.article)
    }
    },
    fetchData() {

    },
    getArticleListByTag() {

    }
  }
}
</script>
