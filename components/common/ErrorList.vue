<template>
  <ul class="error-messages">
    <li v-for="(values, name, index) in errors" :key="index">
      {{ name }} <template v-for="err in values">{{ err }} </template>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'ErrorList',
  props: {
    errors: {
      type: Object,
      required: true,
    },
  },
}
</script>
