<template>
  <img :src="url || 'https://api.realworld.io/images/smiley-cyrus.jpeg'" :alt="alt" :class="className" @error="imageUrlAlt" />
</template>

<script>
export default {
  name: 'ProfileImage',
  props: {
     url: {
      type: String,
      required: false,
      default: 'https://api.realworld.io/images/smiley-cyrus.jpeg'
    },
    alt: {
      type: String,
      required: true,
    },
    className: {
      type: String,
      required: false,
      default: '',
    },
  },
  methods: {
    imageUrlAlt() {

    }
  }
}
</script>
