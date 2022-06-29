<template>
  <div class="profile-page">
    <profile-banner :profile="profile">
      <template #edit-button>
        <nuxt-link
          v-if="isMyProfile"
          to="/settings"
          class="btn btn-sm btn-outline-secondary action-btn"
        >
          <i class="ion-gear-a" /> Edit Profile Settings
        </nuxt-link>

        <a
          v-if="isLogin && !isMyProfile"
          class="btn btn-sm btn-outline-secondary action-btn"
          @click.prevent="fetchToggleFollowUser"
        >
          <template v-if="isFollowing">
            <i class="ion-minus-round" />
            {{ `Unfollow ${profile.username}` }}
          </template>

          <template v-else>
            <i class="ion-plus-round" />
            {{ `Follow ${profile.username}` }}
          </template>
        </a>
      </template>
    </profile-banner>
    <div class="container">
      <div class="row">
        <div class="col-xs-12 col-md-10 offset-md-1">
          <tab-navigation
            :tab-type="postType"
            :tab-items="tabItems"
            @on-click-tab="onChangeTab"
          />
          <nuxt-child :key="$route.params.userName" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import TabNavigation from '@/components/articleList/TabNavigation.vue'
import ProfileBanner from '@/components/banner/ProfileBanner.vue'
import { postTypes } from '@/constants'

export default {
  name: 'ProfilePage',
  components: {
    TabNavigation,
    ProfileBanner,
  },
  async asyncData({ $repository, params, query }) {
    console.log('[ process.server ] >', process.server)
    const { profile } = await $repository.profile.getProfile(params.userName)
    return { profile }
  },
  data() {
    return {
      postType: 'AUTHOR',
      tabItems: Object.freeze(postTypes),
    }
  },
  computed: {
    ...mapState('user', ['user', 'isLogin']),
    isMyProfile() {
      return this.user.username === this.profile.username
    },
    isFollowing() {
      return this.isLogin && !this.isMyProfile && this.profile.following
    },
  },
  methods: {
    onChangeTab(type) {
      const urlBy = {
        AUTHOR: (userName) => '/profile/' + userName,
        FAVORITED: (userName) => `/profile/${userName}/favorites`,
      }
      this.postType = type
      const newURL = urlBy[this.postType](this.$route.params.userName)
      this.$router.replace(newURL)
    },
    async fetchToggleFollowUser() {
      const username = this.profile.username
      this.profile = this.isFollowing
        ? (await this.$repository.profile.unFollowUser(username)).profile
        : (await this.$repository.profile.followUser(username)).profile
    },
  },
}
</script>
