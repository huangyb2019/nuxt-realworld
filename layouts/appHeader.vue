<template>
 <nav class="navbar navbar-light">
    <div class="container">
      <nuxt-link to="/" class="navbar-brand">conduit</nuxt-link>

      <auth-navigation-bar
        v-if="isLogin"
        :user-name="user.username"
        :image="user.image"
      />
      <navigation-bar v-else />
    </div>
  </nav>
</template>

<script>
import { mapState } from 'vuex'
import AuthNavigationBar from '../components/common/AuthNavigationBar';
import NavigationBar from '../components/common/NavigationBar.vue';
export default {
name:'AppHeader',
components: {
  AuthNavigationBar,
  NavigationBar
},
computed: {
  ...mapState('user',['isLogin','user'])
},
}
</script>
