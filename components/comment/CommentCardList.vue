<template>
  <div>
    <div v-for="(comment, index) in commentList" :key="index" class="card">
      <div class="card-block">
        <p class="card-text">{{ comment.body }}</p>
      </div>
      <div class="card-footer">
        <nuxt-link
          :to="`/profile/${comment.author.username}`"
          class="comment-author"
        >
          <ProfileImage
            :url="comment.author.image"
            :class-name="'comment-author-img'"
            :alt="'author profile image'"
          />
        </nuxt-link>
        <nuxt-link
          :to="`/profile/${comment.author.username}`"
          class="comment-author"
        >
          {{ comment.author.username }}
        </nuxt-link>
        <span class="date-posted">{{
          new Date(comment.createdAt).toDateString()
        }}</span>
        <span class="mod-options">
          <i
            v-if="loginUser.username === comment.author.username"
            class="ion-trash-a"
            @click="$emit('on-delete-comment', comment.id)"
          />
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import ProfileImage from '@/components/common/ProfileImage.vue'

/**
 *
 * TODO
 *
 * 1. Body Parser ??
 *
 */
export default {
  name: 'CommentCardList',
  components: {
    ProfileImage,
  },
  props: {
    commentList: {
      type: Array,
      required: false,
      default: () => [],
    },
    loginUser: {
      type: Object,
      required: true,
    },
  },
}
</script>
