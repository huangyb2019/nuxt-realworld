export const state = () => {
  return {
    isLogin: process.client && window.localStorage.getItem('token'),
    user: {
      bio: '',
      email: '',
      image: '',
      token: '',
      username: '',
    }
  }
}

export const mutations = {
  setLogin(state, { axios, user }) {
    state.isLogin = true
    state.user = user
    axios.setToken(user.token, 'Token')
    window.localStorage.setItem('token', user.token)
  },
  loginOut(state, axios) {
    state.isLogin = false
    state.user = {
      bio: '',
      email: '',
      image: '',
      token: '',
      username: '',
    }
    axios.setToken(false)
    window.localStorage.removeItem('token')
  }
}
