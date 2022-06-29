export const userRepository = (axios) => ({
  authLogin(payload) {
    return axios.$post('/users/login', { user: payload })
  },
  authRegister(payload) {
    return axios.$post(`/users`, { user: payload })
  },
  getCurrentUser(token) {
    return axios.$get('/user', {
      headers: {
        authorization: 'Token ' + token,
      },
    })
  },
  updateUser(payload) {
    return axios.$put('/user', { user: payload })
  },
})
