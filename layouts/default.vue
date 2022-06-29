<template>
  <div>
    <app-header></app-header>
    <Nuxt />
    <app-footer></app-footer>
  </div>
</template>
<script>
import AppFooter from './appFooter.vue';
import AppHeader from './appHeader.vue';
export default {
  name: 'DefaultVue',
components:{
  AppHeader,
  AppFooter
},
async mounted() {
  const token = window.localStorage.getItem('token')
  if(token) {
    const response = await this.$repository.user.getCurrentUser(token)
    if('user' in response) {
      this.$store.commit('user/setLogin',{
            axios:this.$axios,
            user:response.user
        })
    }

  }
}
}
</script>
