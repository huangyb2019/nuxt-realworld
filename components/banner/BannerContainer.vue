<template>
  <div :class="name">
    <div class="container">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    name: {
      type: String ,
      default: 'banner'
    }
  }
}
</script>
