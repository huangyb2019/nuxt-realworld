<template>
  <FormContainer :errors="errors" @on-submit="handleRegister">
    <template #title>Sign Up</template>
    <template #link>
      <nuxt-link to="/login"> Have an account?</nuxt-link>
    </template>
    <template #form-group>
      <fieldset class="form-group">
        <input
          v-model="userName"
          type="text"
          class="form-control form-control-lg"
          placeholder="Username"
        />
      </fieldset>
      <fieldset class="form-group">
        <input
          v-model="email"
          type="email"
          class="form-control form-control-lg"
          placeholder="Email"
        />
      </fieldset>
      <fieldset class="form-group">
        <input
          v-model="password"
          type="password"
          class="form-control form-control-lg"
          placeholder="Password"
        />
      </fieldset>
    </template>
    <template #submit-button>Sign Up</template>
  </FormContainer>
</template>

<script>
// import { useError, useUser } from '@/compositions'
import FormContainer from '../components/common/FormContainer.vue'
export default {
  name: 'RegisterPage',
  components: {
    FormContainer
  },
  data() {
    return {
      userName: '',
      email:'',
      password: '',
      errors: undefined
    }
  },
  methods: {
   async handleRegister() {
        if(!this.userName || !this.email) {
          return
        };
        const response = await this.$repository.user.authRegister({
            username:this.userName,
            email:this.email,
            password:this.password,
        })
        if('user' in response) {
          this.$store.commit('user/setLogin',{
            axios:this.$axios,
            user:response.user
          })
          this.$router.push('/')
        }else {
          console.log('[ ccc ] >', 'ccc')
        }
    }
  }
}
</script>
