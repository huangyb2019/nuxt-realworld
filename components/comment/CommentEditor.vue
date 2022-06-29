<template>
  <div>
    <form class="card comment-form" @submit.prevent>
      <div class="card-block">
        <textarea
          v-model="inputBody"
          class="form-control"
          placeholder="Write a comment..."
          rows="3"
        />
      </div>
      <div class="card-footer">
        <ProfileImage
          :url="loginUser.image"
          :class-name="'comment-author-img'"
          :alt="'author profile image'"
        />
        <button
          class="btn btn-sm btn-primary"
          type="submit"
          @click.prevent="onSubmitComment"
        >
          Post Comment
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import ProfileImage from '@/components/common/ProfileImage.vue'

export default {
  name: 'CommentEditor',
  components: {
    ProfileImage,
  },
  props: {
    loginUser: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      inputBody:'',
    }
  },
  methods: {
    onSubmitComment() {
        this.$emit('on-create-comment', this.inputBody)

      this.inputBody = ''
    }
  }
}
</script>
