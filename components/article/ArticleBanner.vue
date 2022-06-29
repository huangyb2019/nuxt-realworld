<template>
  <BannerContainer>
    <h1>
      <slot name="title" />
    </h1>

    <slot name="article-meta" />
  </BannerContainer>
</template>

<script>

import BannerContainer from '@/components/banner/BannerContainer.vue'

export default {
  name: 'ArticleBanner',
  components: {
    BannerContainer,
  },
}
</script>
