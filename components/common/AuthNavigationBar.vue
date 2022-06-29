<template>
  <ul class="nav navbar-nav pull-xs-right">
    <li class="nav-item">
      <nuxt-link to="/" class="nav-link">Home</nuxt-link>
    </li>
    <li class="nav-item">
      <nuxt-link to="/editor" class="nav-link">
        <i class="ion-compose" /> New Post
      </nuxt-link>
    </li>
    <li class="nav-item">
      <nuxt-link to="/settings" class="nav-link">
        <i class="ion-gear-a" /> Settings
      </nuxt-link>
    </li>
    <li class="nav-item">
      <nuxt-link :to="`/profile/${userName}`" class="nav-link">
        <ProfileImage
          :url="image"
          :class-name="'user-pic'"
          :alt="'user profile image'"
        />
        {{ userName }}
      </nuxt-link>
    </li>
  </ul>
</template>

<script>
import { mapState } from 'vuex'
import ProfileImage from './ProfileImage.vue'
export default {
  name: 'AuthNavigationBar',
  components : {
    ProfileImage
  },
  computed: {
    ...mapState('user',{
      userName: state => state.user.username,
      image: state => state.user.image
    })
  }
}
</script>
