<template>
  <FormContainer
    name="settings-page"
    :errors="errors"
    @on-submit="handleUpdate"
  >
    <template #title>Your Settings</template>
    <template #form-group>
      <fieldset class="form-group">
        <input
          v-model="image"
          type="text"
          class="form-control"
          placeholder="URL of profile picture"
        />
      </fieldset>
      <fieldset class="form-group">
        <input
          v-model="userName"
          type="text"
          class="form-control form-control-lg"
          placeholder="Username"
        />
      </fieldset>
      <fieldset class="form-group">
        <textarea
          v-model="bio"
          class="form-control form-control-lg"
          rows="8"
          placeholder="Short bio about you"
        />
      </fieldset>
      <fieldset class="form-group">
        <input
          v-model="email"
          type="email"
          class="form-control form-control-lg"
          placeholder="Email "
        />
      </fieldset>
      <fieldset class="form-group">
        <input
          v-model="password"
          type="password"
          class="form-control form-control-lg"
          placeholder="New Password"
        />
      </fieldset>
    </template>
    <template #submit-button>Update Settings</template>
    <template #sub-contents>
      <hr />
      <button class="btn btn-outline-danger" @click="onLogout">
        Or click here to logout.
      </button>
    </template>
  </FormContainer>
</template>

<script>
import FormContainer from '../components/common/FormContainer.vue'
export default {
  name: 'SettingsPage',
  components: {
    FormContainer,
  },
  data() {
    return {
      userName: this.$store.state.user.user.username,
      email: this.$store.state.user.user.email,
      password: '',
      bio: this.$store.state.user.user.bio,
      image: this.$store.state.user.user.image,
      errors: {},
    }
  },
  methods: {
    onLogout() {
      this.$store.commit('user/loginOut', this.$axios)
      this.$router.replace('/')
    },
    async handleUpdate() {
      const response = await this.$repository.user.updateUser({
        username: this.userName,
        image: this.image,
        email: this.email,
      })
      if ('user' in response) {
        this.$store.commit('user/setLogin', {
          axios: this.$axios,
          user: response.user,
        })
        this.$router.replace('/')
      }
    },
  },
}
</script>
