<template>
  <BannerContainer name="user-info">
    <div class="row">
      <div class="col-xs-12 col-md-10 offset-md-1">
        <ProfileImage
          :url="profile.image"
          :class-name="'user-img'"
          :alt="'user profile image'"
        />
        <h4>{{ profile.username }}</h4>
        <p v-if="profile.bio">{{ profile.bio }}</p>

        <slot name="edit-button" />
      </div>
    </div>
  </BannerContainer>
</template>

<script>
import BannerContainer from '@/components/banner/BannerContainer.vue'
import ProfileImage from '@/components/common/ProfileImage.vue'

export default {
  name: 'ProfileBanner',
  components: {
    BannerContainer,
    ProfileImage,
  },
  props: {
    profile: {
      type: Object,
      required: true,
    },
  },
}
</script>
