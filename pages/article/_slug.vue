<template>
  <div>
    <div class="article-page">
      <article-banner>
        <template #title>
          {{ article.title }}
        </template>
        >
        <template #article-meta>
          <ArticleMeta
            :article="article"
            :author="article.author"
            :is-my-article="isMyArticle"
            @on-toggle-follow-user="fetchToggleFollowUser"
            @on-toggle-favorite-article="fetchToggleFavoriteArticle"
            @on-delete-article="onDeleteArticle"
          />
        </template>
      </article-banner>
      <div class="container page">
        <div class="row article-content">
          <div class="col-xs-12">
            <!-- eslint-disable-next-line vue/no-v-html -->
            <div v-html="$md.render(article.body)" />

            <ArticleTagList
              v-if="article.tagList.length"
              :tag-list="article.tagList"
            />
          </div>
        </div>
        <hr />
        <div class="article-actions">
          <ArticleMeta
            :article="article"
            :author="article.author"
            :is-my-article="isMyArticle"
            @on-toggle-follow-user="fetchToggleFollowUser"
            @on-toggle-favorite-article="fetchToggleFavoriteArticle"
          />
        </div>
        <div class="row">
          <div class="col-xs-12 col-md-8 offset-md-2">
            <template v-if="isLogin">
              <error-list v-if="errors" :errors="errors" />

              <comment-editor
                :login-user="user"
                @on-create-comment="handleCreateComment"
              />
              <comment-card-list
                v-if="commentList.length"
                :comment-list="commentList"
                :login-user="user"
                @on-delete-comment="onDeleteComment"
              />
            </template>
            <p v-else>
              <nuxt-link to="/login">Sign in</nuxt-link> or
              <nuxt-link to="/register">sign up</nuxt-link> to add comments on
              this article.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import ArticleBanner from '@/components/article/ArticleBanner.vue'
import ArticleMeta from '@/components/article/ArticleMeta.vue'
import ArticleTagList from '@/components/article/ArticleTagList.vue'
import CommentCardList from '@/components/comment/CommentCardList.vue'
import CommentEditor from '@/components/comment/CommentEditor.vue'
import ErrorList from '@/components/common/ErrorList.vue'
export default {
  name: 'SlugPage',
  components: {
    ArticleMeta,
    ArticleTagList,
    CommentEditor,
    CommentCardList,
    ErrorList,
    ArticleBanner
  },
  async asyncData({ $repository, route, params, query }) {
    const { article } = await $repository.article.getArticle(params?.slug)
    if (query?.options === 'withOutComment') {
      return { article }
    }
    const { comments: commentList } = await $repository.comment.getCommentList(
      params?.slug
    )
    return { article, commentList }
  },
  data() {
    return {
      article: '',
      commentList: [],
      errors: false
    }
  },
  computed: {
    ...mapState('user', ['isLogin', 'user']),
    isMyArticle() {
      return this.article.author.username === this.user.username
    }
  },
  methods: {
    async fetchToggleFollowUser() {
      const author = this.article.author
      this.article.author = author.following
        ? (await this.$repository.profile.unFollowUser(author.username)).profile
        : (await this.$repository.profile.followUser(author.username)).profile
    },
    async fetchToggleFavoriteArticle() {
      const toggleFavoriteArticle = ({ slug, favorited }) => {
        if (favorited) {
          return this.$repository.article.unFavoriteArticle(slug)
        }

        return this.$repository.article.favoriteArticle(slug)
      }

      const response = await toggleFavoriteArticle({
        slug: this.$route.params.slug,
        favorited: this.article.favorited
      })

      if ('article' in response) {
        this.article = response.article
      }
    },
    async handleCreateComment(body) {
      const response = await this.$repository.comment.createComment({
        slug: this.$route.params.slug,
        body
      })
      if ('comment' in response) {
        this.commentList.unshift(response.comment)
      }
    },
    async onDeleteComment(id) {
      await this.$repository.comment.deleteComment({
        slug: this.$route.params.slug,
        id
      })
      //  const { comments } = await this.$repository.comment.getCommentList(this.$route.params.slug)

      this.commentList = this.commentList.filter((item) => item.id !== id)
    },
    async onDeleteArticle() {
      await this.$repository.article.deleteArticle(this.$route.params.slug)
      this.$router.replace('/')
    }
  }
}
</script>
