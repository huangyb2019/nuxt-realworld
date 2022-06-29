<template>
  <div v-if="articleList.length">
    <div
      v-for="(article, articleIndex) in articleList"
      :key="articleIndex"
      class="article-preview"
    >
      <div class="article-meta">
        <nuxt-link :to="`/profile/${article.author.username}`">
          <ProfileImage
            :url="article.author.image"
            :alt="'author profile image'"
          />
        </nuxt-link>
        <div class="info">
          <nuxt-link :to="`/profile/${article.author.username}`" class="author">
            {{ article.author.username }}
          </nuxt-link>
          <span class="date">
            {{ new Date(article.createdAt).toDateString() }}
          </span>
        </div>
        <button
          class="btn btn-sm pull-xs-right"
          :class="{
            'btn-outline-primary': !article.favorited,
            'btn-primary': article.favorited,
          }"
          @click="toggleFavorite(article, articleIndex)"
        >
          <i class="ion-heart" />
          {{ article.favoritesCount }}
        </button>
      </div>
      <nuxt-link :to="`/article/${article.slug}`" class="preview-link">
        <h1>{{ article.title }}</h1>
        <p>{{ article.description }}</p>
        <span>Read more...</span>

        <ArticleTagList
          v-if="article.tagList.length"
          :tag-list="article.tagList"
        />
      </nuxt-link>
    </div>
  </div>

  <div v-else class="article-preview">No articles are here... yet.</div>
</template>

<script>
import ArticleTagList from '../article/ArticleTagList.vue';
import ProfileImage from '../common/ProfileImage.vue';
export default {
  name: 'ArticlePreviewList',
  components: {
    ArticleTagList,
    ProfileImage
  },
  props: {
      articleList: {
      type: Array,
      required: true,
    },
  },
  methods: {
    toggleFavorite(article, articleIndex) {
      if(!this.$store.state.user.isLogin) {
        this.$router.push('/login')
        return undefined
      }
      this.$emit('toggle-favorite-article', article, articleIndex)
    }
  }
}
</script>
